import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native'
import React, { useState, useContext } from 'react';
import {Ionicons} from '@expo/vector-icons';
import styles from './Styles_Index'
import firebase from '../services/firebaseConnection';
import { AuthContext } from "../context/auth"

// PÁGINA DE LOGIN
export default ({navigation}) => {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    // Ao clicar no botão "Entrar" essa função é chamada
    function handleLogin(){
        login(email, senha)
    }

    return(    
        <KeyboardAvoidingView style={styles.background}>
            <StatusBar backgroundColor={'#13386E'}/>
            <View style={styles.Logo}>
                <Image style={styles.Image_Logo}
                    source={require('../Images/AVS.png')}
                />
            </View>

            <View style={styles.Container}>
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>E-mail</Text>
                </View>
                <TextInput onChangeText={texto => setEmail(texto)} style={styles.Input_email}
                    placeholder='Digite seu e-mail'
                />
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Senha</Text>
                </View>
                <TextInput onChangeText={texto => setSenha(texto)} style={styles.Input_senha}
                    placeholder='Digite sua senha'
                    secureTextEntry={true} // Ativa a máscara de senha
                />


                <View style={styles.Text_senha}> 
                    <Text style={styles.esqueci_Senha}>Esqueci minha senha</Text>
                </View>

                {/* Botão de login: */}
                <TouchableOpacity style={styles.Botao_entrar} title='página login' onPress={handleLogin}>
                    <Text style={styles.Texto_entrar}>Entrar</Text>
                </TouchableOpacity>

                <View>
                    <Text onPress={() => navigation.navigate('cadastro') } style={styles.esqueci_Senha}>Não tem uma conta? Registre-se</Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}


