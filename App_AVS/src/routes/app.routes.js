import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../Telas/Home" // Tela inicial após login
import Cadastro_Ciclo from "../Telas/Cadastro_Ciclo";

const AppStack = createNativeStackNavigator()

export default () => {
    return(
        <AppStack.Navigator initialRouteName="home">
            <AppStack.Screen name="cadastro_ciclo" component={Cadastro_Ciclo} options={{headerShown:false}} />
            <AppStack.Screen name="home" component={Home} options={{headerShown:false}} />
        </AppStack.Navigator>
    )
}