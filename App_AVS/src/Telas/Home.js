import React, { useState, useContext } from "react";
import {Text, View, KeyboardAvoidingView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Styles_Index'
import HomeStyles from './Styles.home'
import firebase from '../services/firebaseConnection'
import { AuthContext } from '../context/auth'

export default ({navigation}) => {
    const { user } = useContext(AuthContext)
    async function consultaCiclo(){
        await firebase.database().ref('ciclos').child(user.uid).get()
    }
    const [ciclo, setCiclo] = useState(false)

    return (
        <KeyboardAvoidingView style={styles.background}>
            <StatusBar backgroundColor={'#13386E'}/>
            {/* Dashboard */}
            {
             !ciclo ? <Text>Nenhum ciclo cadastrado</Text> :
            (
            <>
            <View style={HomeStyles.View_info}>
                <View style={HomeStyles.container_titulo}>
                    <Text style={HomeStyles.Titulo}>Ciclo</Text>
                </View>

                <View style={HomeStyles.Infos}>
                    <View style={HomeStyles.container_ciclos}>
                        <Text style={HomeStyles.Campos}>Espécie: Galinha preta</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <Text style={HomeStyles.Campos}>Data inicial:01/08/2003</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <Text style={HomeStyles.Campos}>Quantidade de ovos: 15</Text>
                    </View>

                    <View style={HomeStyles.container_ciclos}>
                        <Text style={HomeStyles.Campos}>Faltam 10 dias para a eclosão dos ovos</Text>
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
                        <Text style={HomeStyles.Subtitulo_sensor}>Ideal</Text>
                    </View>

                    <View style={HomeStyles.Container_dados}>
                        <Text style={HomeStyles.Titulo_dados}>38°C</Text>
                    </View>
                </View>

                {/* Umidade */}
                <View style={HomeStyles.Campo_sensor}>
                    <View style={HomeStyles.container_icon}>
                        <View style={HomeStyles.campo_icon}>
                             <Icon name="thermostat" size={30} color="#FFF" />
                        </View>
                    </View>

                    <View style={HomeStyles.Container_tipo}>
                        <Text style={HomeStyles.Titulo_sensor}>Umidade</Text>
                        <Text style={HomeStyles.Subtitulo_sensor}>Ideal</Text>
                    </View>

                    <View style={HomeStyles.Container_dados}>
                        <Text style={HomeStyles.Titulo_dados}>60%</Text>
                    </View>
                </View>

                {/* Rotação */}
                <View style={HomeStyles.Campo_sensor}>
                    <View style={HomeStyles.container_icon}>
                        <View style={HomeStyles.campo_icon}>
                             <Icon name="thermostat" size={30} color="#FFF" />
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

            </View>
            </>
            )}
        </KeyboardAvoidingView>
    );
}