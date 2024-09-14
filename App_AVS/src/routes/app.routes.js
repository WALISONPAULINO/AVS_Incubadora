import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lista_Ciclo from "../Telas/Lista_Ciclo";
import Dashboard from "../Telas/Dashboard";
import Scanner from "../Telas/Scanner";
import Cadastro_Ciclo from "../Telas/Cadastro_Ciclo";
import 'react-native-gesture-handler';

// Criação dos navegadores
const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="lista_ciclo">
      <Stack.Screen 
        name="lista_ciclo" 
        component={Lista_Ciclo}
        options={{ headerShown: false }} // Oculta o header para esta tela
      />
      <Stack.Screen 
        name="cadastro_ciclo" 
        component={Cadastro_Ciclo}
        options={{ headerShown: false }} // Oculta o header para esta tela
      />
      <Stack.Screen 
        name="scanner" 
        component={Scanner}
        options={{ headerShown: false }} // Oculta o header para esta tela
      />
      <Stack.Screen 
        name="dashboard" 
        component={Dashboard}
        options={{ headerShown: false }} // Oculta o header para esta tela
      />
    </Stack.Navigator>
  );
};
