import React, { useContext } from "react";
import { Text, View, Button, Touchable, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-community/async-storage";
import HomeStyles from './Styles.home'
import firebase from "../services/firebaseConnection"

export default () => {
    const { user, setUser } = useContext(AuthContext)
    
    async function desautenticar() {
        try {
            await firebase.auth().signOut(); // Deslogar do Firebase
            await AsyncStorage.removeItem('Auth_user'); // Remover do AsyncStorage
            setUser(null); // Resetar o estado do usuário no contexto
        } catch (e) {
            console.error("Erro ao deslogar: ", e);
        }
    }

    return(
        <View style={{fontSize: 20, justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#fff'}}>
            {/* Nessa página o usuário poderá alterar suas informações */}
            <View style={HomeStyles.Container_Nome}>
                <Text style={{fontSize:18}}>Nome</Text>
                <View style={HomeStyles.Name}>
                     <Text style={{fontSize:16, marginLeft:16}}>{user.nome}</Text>
                </View>
            </View>
           
            <View style={HomeStyles.Container_Nome}>
                <Text style={{fontSize:18}}>E-mail</Text>
                <View style={HomeStyles.Name}>
                     <Text style={{fontSize:16, marginLeft:16}}>{user.email}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: '#BB4B4B',
                    width: '90%',
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 20,
                }}
                onPress={() => desautenticar()}>
                <Text style={{fontSize:20, color:'white'}}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}