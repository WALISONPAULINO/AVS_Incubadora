import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Lista_Ciclo from "../Telas/Lista_Ciclo";
import Cadastro_Ciclo from "../Telas/Cadastro_Ciclo";
import Lista_Incubadoras from "../Telas/Lista_Incubadoras";
import 'react-native-gesture-handler';

// Criação dos navegadores
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppStack(){
  return (
    <Stack.Navigator initialRouteName="lista_incubadoras">
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
        name="lista_incubadoras" 
        component={Lista_Incubadoras}
        options={{ headerShown: false }} // Oculta o header para esta tela
      />
    </Stack.Navigator>
  );
};

// Define o Drawer principal
export default function AppRoutes() {
  return (
    <Drawer.Navigator 
      initialRouteName="CicloStack" // Define o Stack como tela inicial
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff', // Customize o fundo do Drawer se necessário
        },
        drawerPosition: 'left',
        drawerType: 'front', // Define a posição do Drawer (pode ser 'front' ou 'back')
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={AppStack} 
        options={{ 
          drawerLabel: 'Home', // Nome exibido no menu do Drawer
          headerTitle: '' // Define o título do cabeçalho do Drawer (se aplicável)
        }} 
      />

      {/* Adicione outras telas aqui, se necessário */}
    </Drawer.Navigator>
  );
}
