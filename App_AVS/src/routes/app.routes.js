import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Lista_Ciclo from "../Telas/Lista_Ciclo";
import Dashboard from "../Telas/Dashboard";
import Scanner from "../Telas/Scanner";
import Cadastro_Ciclo from "../Telas/Cadastro_Ciclo";
import 'react-native-gesture-handler';
import Perfil from "../Telas/Perfil";

// Criação dos navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator para tela de detalhes
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="lista_ciclo">
      <Stack.Screen 
        name="lista_ciclo" 
        component={Lista_Ciclo}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="scanner" 
        component={Scanner}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="dashboard" 
        component={Dashboard}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="cadastro_ciclo"
        component={Cadastro_Ciclo}
        options={{ headerTitle: 'Criar ciclo', headerShadowVisible: false }}
      />

    </Stack.Navigator>
  );
}


function Profile(){
  return(
    <Stack.Navigator initialRouteName="perfil">
      <Stack.Screen 
        name="perfil"
        component={Perfil}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Ciclos" 
        component={StackNavigator}
        options={{ headerShown: false, tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="egg" color={color} size={size} />, }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={Profile}
        options={{ headerShown: false, tabBarIcon: ({color,size}) => <Feather name="user" color={color} size={size} />, }} 
      />

    </Tab.Navigator>
  );
}

// App
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
    </NavigationContainer>
  );
}
