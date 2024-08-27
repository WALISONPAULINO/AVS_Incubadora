import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native'
import React, { useState } from 'react';
import styles from './Styles_Index'
import style from './Styles_cadastro'
import firebase from '../firebaseConnection';

export function Cadastro ({navigation}){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')



    function cadastrar(){
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(r => {
            firebase.database().ref('usuarios').child(r.user.uid).set({
                nome: nome,
            })
            alert('Usuário criado com sucesso!')
            setNome('')
            setEmail('')
            setSenha('')
            navigation.navigate('Index')
        })
        .catch(error => {
            alert(`Houve um erro no seu cadastro ${error}`)
        })
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

                {/* Campo de nome */}
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Nome</Text>
                </View>
                <TextInput onChangeText={texto => setNome(texto)} style={styles.Input_email}
                    placeholder='Digite seu nome'
                />

                {/* Campo de email */}
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>E-mail</Text>
                </View>
                <TextInput onChangeText={texto => setEmail(texto)} style={style.Input_senha}
                    placeholder='Digite seu e-mail'
                />

                {/* Campo de senha */}
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Senha</Text>
                </View>
                <TextInput onChangeText={texto => setSenha(texto) } style={styles.Input_email}
                    placeholder='Digite sua senha'
                />

                {/* Campo para confirmar senha */}
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Confirme sua senha</Text>
                </View>
                <TextInput onChangeText={texto => setConfirmarSenha(texto)}  style={styles.Input_senha}
                    placeholder='Digite sua senha'
                />

                {/* Vou precisar criar um aviso aqui para dizer que as senhas precisam ser iguais */}
                
                <TouchableOpacity style={styles.Botao_entrar}
                    title='página sobre'
                    onPress={cadastrar}>
                    <Text style={styles.Texto_entrar}>Cadastrar</Text>
                </TouchableOpacity>

                <View>
                    <Text onPress={()=> 
                        navigation.navigate('Index')
                    } style={styles.esqueci_Senha}>Já tem uma conta? Faça login</Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}