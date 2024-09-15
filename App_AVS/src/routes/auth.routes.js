import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from "../Telas/cadastro";
import Login from "../Telas/Index"; // Login = Index

const AuthStack = createNativeStackNavigator()

export default () => {
    return(
        <AuthStack.Navigator initialRouteName="login">
            <AuthStack.Screen name="login" component={Login} options={{headerShown:false}} />
            <AuthStack.Screen name="cadastro" component={Cadastro} options={{headerTitle: 'Cadastre-se', headerShadowVisible:false}} />
        </AuthStack.Navigator>
    )
}