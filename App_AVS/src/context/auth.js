import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import firebase from "../services/firebaseConnection"
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from '@react-navigation/native'; // Importar o hook

export const AuthContext = createContext({})
export default ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(()=>{
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user')
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage()
    },[])


    // Função para Login
    async function login(email, senha){
        try{
            let usuario = await firebase.auth().signInWithEmailAndPassword(email, senha)
            let uid = usuario.user.uid
            firebase.database().ref('usuarios').child(uid).once('value', snapshot => {
                if(snapshot.exists()){
                    let data = { uid: uid, nome: snapshot.val().nome, email: usuario.user.email }
                    storageUser(data)
                    setUser(data)
                }
            })
        }catch(e){
            alert(e)
        }
    }

    // Função para Cadastro
    async function cadastro(nome, email, senha){
        try{
            let usuario = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            let uid = usuario.user.uid
            firebase.database().ref('usuarios').child(uid).set({
                nome: nome,
            })
            let data = { uid: uid, nome: nome, email: usuario.user.email }
            Alert.alert(
                'Cadastro realizado com sucesso!',
                'Faça login',
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
            navigation.navigate('login')
        }catch(e){
            alert(e)
        }
    }
    


    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, login, cadastro, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
