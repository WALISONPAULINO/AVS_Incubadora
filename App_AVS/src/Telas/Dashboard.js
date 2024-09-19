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
        if (route.params && route.params.key) {
            // Recebe ID da incubadora a partir dos parâmetros enviados da lista ciclo pelo navigation
            setuidIncubadora(route.params.incubadora)
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


    function calcularDiferencaDias(dataInicial, dataFinal) {
        // Converter as strings para o formato Date
        const [diaInicial, mesInicial, anoInicial] = dataInicial.split('/');
        const [diaFinal, mesFinal, anoFinal] = dataFinal.split('/');
    
        // Criar objetos Date usando o formato YYYY-MM-DD
        const dataInicio = new Date(`${anoInicial}-${mesInicial}-${diaInicial}`);
        const dataFim = new Date(`${anoFinal}-${mesFinal}-${diaFinal}`);
    
        // Calcular a diferença de tempo em milissegundos
        const diffTime = dataFim - dataInicio;
    
        // Converter de milissegundos para dias (1 dia = 24 * 60 * 60 * 1000 ms)
        const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        return diffDias;
    }


    
    if(loading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator size='large' color="#131313" />
            </View>
        )
    }

    // PRECISO REMOVER DADOS DE USUÁRIO, CICLOS E INCUBADORAS
    async function excluiCiclo(){
        await firebase.database().ref('ciclos').child(route.params.key).remove()
        await firebase.database().ref(`usuarios/${user.uid}/incubadoras`).orderByChild('uid').equalTo(uidIncubadora).once('value', snapshot => {
            if(snapshot.exists()){
                snapshot.forEach(value => {
                    value.ref.child('ciclo').remove()
                })
            }
        })
        await firebase.database().ref(`incubadoras/${uidIncubadora}/ciclo`).remove()
        navigation.goBack()
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
                        <Text style={HomeStyles.Campos}>Data inicial: {ciclo ? ciclo.dtInicio : 'Carregando'}</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <MaterialCommunityIcons name="egg" size={25} color="#fff" />
                        <Text style={HomeStyles.Campos}>Quantidade de ovos: {ciclo ? ciclo.qtdOvos : 'Carregando'}</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <Text style={HomeStyles.campo_dias}>Faltam {ciclo ? calcularDiferencaDias(ciclo.dtInicio, ciclo.dtFim) : ''} dias para a eclosão dos ovos</Text>
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
                            { fontSize:18, color: incubadora && incubadora.temperatura >= 36 && incubadora.temperatura <= 38 
                                ? '#15A64F'  // Verde para "Ideal"
                                : incubadora && incubadora.temperatura > 38
                                    ? 'red'    // Vermelho para "Acima"
                                    : 'blue'   // Azul para "Abaixo" 
                            }}>
                        {
                        incubadora 
                        ? (
                            incubadora.temperatura >= 36 & incubadora.temperatura <= 38
                            ? "Ideal" 
                            : incubadora.temperatura > 36 ? "Alta" : "Baixa"
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
                            : incubadora.umidade > 55 ? "Alta" : "Baixa"
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
                        <Text style={HomeStyles.Subtitulo_sensor}>Desligada</Text>
                    </View>

                    <View style={HomeStyles.Container_dados}>
                        <Text style={HomeStyles.Titulo_dados_rotacao}>--</Text>
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
                onPress={() => excluiCiclo()}>
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