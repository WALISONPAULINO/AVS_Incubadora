import React, { useContext } from "react";
import { Text, View, Button, Touchable, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/auth";
import HomeStyles from './Styles.home'

export default () => {
    const { user } = useContext(AuthContext)
    return(
        <View style={{fontSize: 20, justifyContent: 'center', alignItems: 'center', flex: 1}}>
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

            <View style={HomeStyles.button_sair}>
                <Text style={{fontSize:20, color:'white'}}>Sair</Text>
            </View>
        </View>
    )
}