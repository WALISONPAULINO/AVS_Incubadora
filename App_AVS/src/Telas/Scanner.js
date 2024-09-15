import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, Button, Alert, StyleSheet } from "react-native";
import { Camera, useCameraPermissions, CameraView } from "expo-camera";
import firebase from "../services/firebaseConnection"

export default ({navigation}) => {
  const [permissao, setPermissao] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  
  // Pedir permissão:
  useEffect(()=>{
    async function chamaTela(){
      const {status} = await Camera.requestCameraPermissionsAsync()
  
      if(status !== 'granted'){
        alert('Desculpe, precisamos da permissão da câmera')
      }
    }
    chamaTela()
  }, [])


  function handledBarCodeScanned({ type, data }){

    // Precisa testar se o dado recebido é um QR Code válido
    const regex = /[.#$\[\]]/g;
    if(regex.test(data)){
      Alert.alert(
        'Erro de sincronização',
        'QR Code inválido',
        [
          {
            text: 'OK',
            style: 'destructive',
          },
        ],
        {
          cancelable: false,
        },
      );
      navigation.goBack()
      return;
    }
    firebase.database().ref('incubadoras').child(data).once('value', async (snapshot) => {
        if(snapshot.exists()){

          // Eu preciso saber se essa incubadora já está vinculada a um ciclo
          if(snapshot.val().ciclo){
            Alert.alert(
              'Aviso!',
              'Esta incubadora já possui um ciclo em andamento!',
              [
                {
                  text: 'OK',
                  style: 'destructive',
                },
              ],
              {
                cancelable: false,
              },
            );
            navigation.goBack()
            return;
          }

          alert('Incubadora escaneada')
          navigation.navigate('cadastro_ciclo', {data: data})
        }else{
          Alert.alert(
            'Incubadora não encontrada!',
            'Este QR Code não pertence a nenhuma incubadora.',
            [
              {
                text: 'OK',
                style: 'destructive',
              },
            ],
            {
              cancelable: false,
            },
          );
          navigation.goBack()
          return;
        }
    })
    setScanned(true)
    // Alert.alert(
    //   `Código: ${type} escaneado`,
    //   `Dados: ${data}`,
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => setScanned(false)
    //     }
    //   ], 
    //   { cancelable: false }
    // )
  }



  if(!permissao?.granted){
    return(
      <View style={styles.container}>
        <Text style={styles.permissionText}>Permissão de câmera não concedida</Text>
        <Button title="Solicitar permissão" onPress={setPermissao}/>
      </View>
    )
  }

  return(
    <View style={{ flex: 1 }}>
        <StatusBar />
        <CameraView style={{ flex: 1 }} onBarcodeScanned={scanned ? undefined : handledBarCodeScanned}>
        <View style={styles.layerContainer}>
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </View>
        </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  layerContainer: {
    flex: 1,
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});