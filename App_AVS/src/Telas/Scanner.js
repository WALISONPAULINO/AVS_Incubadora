import React, { useEffect, useState, useContext } from "react";
import { Text, View, StatusBar, Button, Alert, StyleSheet } from "react-native";
import { Camera, useCameraPermissions, CameraView } from "expo-camera";
import firebase from "../services/firebaseConnection"
import { AuthContext } from "../context/auth";

export default ({navigation}) => {
  const [permissao, setPermissao] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const { user } = useContext(AuthContext)
  
  // Pedir permissão:
  useEffect(()=>{
    async function chamaTela(){
      const {status} = await Camera.requestCameraPermissionsAsync()
  
      if(status !== 'granted'){
        alert('Desculpe, precisamos da permissão da câmera para fazer isso funcionar')
      }
    }
    chamaTela()
  }, [])


  function handledBarCodeScanned({ type, data }){

    // Precisa testar se o dado recebido é um QR Code válido

    firebase.database().ref('incubadoras').child(data).once('value', async (snapshot) => {
        if(snapshot.exists()){

          // Eu preciso saber se essa incubadora já está vinculada a um ciclo

            await firebase.database().ref('usuarios').child(user.uid).update({
              incubadora: data
            })
            alert('Incubadora escaneada')
            navigation.navigate('cadastro_ciclo')
        }else{
            alert('Incubadora não encontrada')
            navigation.navigate('cadastro_ciclo')
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