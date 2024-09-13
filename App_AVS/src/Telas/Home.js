import React, { useState, useContext, useEffect } from "react";
import {Text, View, KeyboardAvoidingView, StatusBar, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Styles_Index'
import HomeStyles from './Styles.home'
import firebase from '../services/firebaseConnection'
import { AuthContext } from '../context/auth'


// PÁGINA COM DASHBOARD

export default ({navigation}) => {
    const [ciclo, setCiclo] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {

        async function consultaCiclo(){
            firebase.database().ref('ciclos').orderByChild('usuario').equalTo(user.uid).on('value', snapshot => {
                if(snapshot.exists()){
                    snapshot.forEach((value)=>{
                        const valor = value.val()
                        setCiclo(valor)
                        console.log(valor)
                    })

                }else{
                    setCiclo(false)
                }
            }, (error) => {
                console.error('Erro ao buscar ciclos:', error);
            })
        }
        // Fim da função consultaCiclo
        consultaCiclo()
    },[])


    return (
        <KeyboardAvoidingView style={styles.background}>
            <StatusBar backgroundColor={'#13386E'}/>
            {/* Dashboard */}    

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
                        <Text style={HomeStyles.Titulo_dados}>{temperatura}°C</Text>
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
                        <Text style={HomeStyles.Titulo_dados}>{umidade}%</Text>
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
            <Button title="Criar ciclo" onPress={()=>navigation.navigate('cadastro_ciclo')}/>
        </KeyboardAvoidingView>
    );
}