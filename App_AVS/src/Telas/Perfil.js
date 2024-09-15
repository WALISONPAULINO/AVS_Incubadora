import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import { AuthContext } from "../context/auth";

export default () => {
    const { user } = useContext(AuthContext)
    return(
        <View style={{fontSize: 20, justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {/* Nessa página o usuário poderá alterar suas informações */}
            <Text>{user.nome}</Text>
            <Text>{user.email}</Text>
            <Button title="Sair" />
        </View>
    )
}