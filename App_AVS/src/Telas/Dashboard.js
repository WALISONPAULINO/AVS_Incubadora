import React, { useState, useContext, useEffect } from "react";
import {Text, View, KeyboardAvoidingView, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import styles from './Styles_Index'
import HomeStyles from './Styles.home'
import firebase from '../services/firebaseConnection'
import { AuthContext } from '../context/auth'
import { MaterialCommunityIcons } from "@expo/vector-icons"


// PÁGINA COM DASHBOARD

export default ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const [ciclo, setCiclo] = useState(false)
    const [incubadora, setIncubadora] = useState(null)
    const [uidIncubadora, setuidIncubadora] = useState('') // Pego UID da incubadora presente em ciclo e consulto a tabela incubadoras
    const { user } = useContext(AuthContext)
    const route = useRoute();

    useEffect(() => {
        if (route.params && route.params.item) {
            // Recebe ID da incubadora a partir dos parâmetros enviados da lista ciclo pelo navigation
            setuidIncubadora(route.params.ciclo.incubadora)
            // Recebe informações do ciclo passados por parâmetros
            setCiclo(route.params.ciclo)
            setLoading(false)
        }
    }, [route.params]);


    
    
    
    // CONSULTAR INCUBADORA
    useEffect(() => {
        if(uidIncubadora){
        function consultaIncubadora(){
            firebase.database().ref('incubadoras').child(uidIncubadora).on('value', snapshot => {
                setIncubadora(null)
                if(snapshot.exists()){
                    setIncubadora(snapshot.val())
                }
                setLoading(false)
            })
        }
        consultaIncubadora()
      }
    }, [uidIncubadora])
    
    if(loading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator size='large' color="#131313" />
            </View>
        )
    }

    async function excluiCiclo(uid){
        await firebase.database().ref('ciclos').child(uid).remove()
        .then((r)=>{
            setListaCiclos(prevState => prevState.filter(item => item.key !== uid))
        })
        .catch((e)=>{console.log(e)})
    }

    return (

        <KeyboardAvoidingView style={styles.background}>
            <StatusBar backgroundColor={'#13386E'}/>
            {/* Dashboard */}    
            <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }}>
            <View style={HomeStyles.View_info}>
                <View style={HomeStyles.container_titulo}>
                    <MaterialCommunityIcons name="layers-triple" size={25} color="#fff" style={{marginTop:10, marginRight:5}} />
                    <Text style={HomeStyles.Titulo}>Dashboard</Text>
                </View>

                <View style={HomeStyles.Infos}>
                    <View style={HomeStyles.container_ciclos}>
                        <MaterialCommunityIcons name="feather" size={25} color="#fff" />
                        <Text style={HomeStyles.Campos}> Espécie: {ciclo ? ciclo.especie : 'Carregando'}</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <MaterialCommunityIcons name="calendar-month" size={25} color="#fff" />
                        <Text style={HomeStyles.Campos}>Data inicial:01/08/2003</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <MaterialCommunityIcons name="egg" size={25} color="#fff" />
                        <Text style={HomeStyles.Campos}>Quantidade de ovos: {ciclo ? ciclo.qtdOvos : 'Carregando'}</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <Text style={HomeStyles.campo_dias}>Faltam 10 dias para a eclosão dos ovos</Text>
                    </View>
                </View>
            </View>

            {/* Dados IoT */}
            <View style={HomeStyles.container_sensor}>
                {/* Temperatura */}
                <View style={HomeStyles.Campo_sensor}>
                    <View style={HomeStyles.container_icon}>
                        <View style={HomeStyles.campo_icon}>
                             <Icon name="thermostat" size={30} color="#FFF" />
                        </View>
                    </View>

                    <View style={HomeStyles.Container_tipo}>
                        <Text style={HomeStyles.Titulo_sensor}>Temperatura</Text>
                        {/*  */}
                        <Text style={
                            { fontSize:18, color: incubadora && incubadora.temperatura >= 36 && incubadora.temperatura <= 37 
                                ? '#15A64F'  // Verde para "Ideal"
                                : incubadora && incubadora.temperatura > 37
                                    ? 'red'    // Vermelho para "Acima"
                                    : 'blue'   // Azul para "Abaixo" 
                            }}>
                        {
                        incubadora 
                        ? (
                            incubadora.temperatura >= 36 & incubadora.temperatura <= 37
                            ? "Ideal" 
                            : incubadora.temperatura > 36 ? "Acima" : "Abaixo"
                        ) : ''
                        }</Text>
                    </View>

                    <View style={HomeStyles.Container_dados}>
                        <Text style={HomeStyles.Titulo_dados}>{incubadora ? incubadora.temperatura : 0}°C</Text>
                    </View>
                </View>

                {/* Umidade */}
                <View style={HomeStyles.Campo_sensor}>
                    <View style={HomeStyles.container_icon}>
                        <View style={HomeStyles.campo_icon}>
                            <MaterialCommunityIcons name="water" size={25} color="#fff" />
                        </View>
                    </View>

                    <View style={HomeStyles.Container_tipo}>
                        <Text style={HomeStyles.Titulo_sensor}>Umidade</Text>
                        <Text style={
                            { fontSize:18, color: incubadora && incubadora.umidade >= 55 && incubadora.umidade <= 65 
                                ? '#15A64F'  // Verde para "Ideal"
                                : incubadora && incubadora.umidade > 55 
                                    ? 'red'    // Vermelho para "Acima"
                                    : 'blue'   // Azul para "Abaixo" 
                            }}>
                        {
                        incubadora 
                        ? (
                            incubadora.umidade >= 55 & incubadora.umidade <= 65
                            ? "Ideal" 
                            : incubadora.umidade > 55 ? "Acima" : "Abaixo"
                        ) : ''
                        }</Text>
                    </View>

                    <View style={HomeStyles.Container_dados}>
                        <Text style={HomeStyles.Titulo_dados}>{incubadora ? incubadora.umidade : 0}%</Text>
                    </View>
                </View>

                {/* Rotação */}
                <View style={HomeStyles.Campo_sensor}>
                    <View style={HomeStyles.container_icon}>
                        <View style={HomeStyles.campo_icon}>
                            <MaterialCommunityIcons name="atom-variant" size={25} color="#fff" />
                        </View>
                    </View>

                    <View style={HomeStyles.Container_tipo}>
                        <Text style={HomeStyles.Titulo_sensor}>Rotação</Text>
                        <Text style={HomeStyles.Subtitulo_sensor}>Ligada</Text>
                    </View>

                    <View style={HomeStyles.Container_dados}>
                        <Text style={HomeStyles.Titulo_dados_rotacao}>Próxima a 2h</Text>
                    </View>

                </View>
                
                <View style={{         
                    width:'100%',
                    height: 74,
                    borderRadius: 8,
                    flexDirection: 'row', 
                    justifyContent: 'flex-start',
                    marginBottom:22 
                }}>
                <TouchableOpacity
                style={{
                    backgroundColor: '#a52a2a',
                    width: '100%',
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 20,
                }}
                onPress={() => navigation.navigate('scanner')}>
                <Text style={styles.Texto_entrar}>Encerrar ciclo</Text>
                <MaterialCommunityIcons name="close" size={25} color="#fff" />
            </TouchableOpacity>
                </View>

            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const style = StyleSheet.create({
    sensorState: {
        fontSize:18,
        color: '#15A64F'
    }
})