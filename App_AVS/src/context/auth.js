import React, { createContext, useState, useEffect } from "react";
import firebase from "../services/firebaseConnection"
import AsyncStorage from "@react-native-community/async-storage";

export const AuthContext = createContext({})
export default ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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
        console.log('Logando')
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
            storageUser(data)
            setUser(data)
        }catch(e){
            alert(e)
        }
    }


    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, login, cadastro }}>
            {children}
        </AuthContext.Provider>
    )
}
