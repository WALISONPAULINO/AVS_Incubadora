import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Index} from './src/Telas/Index'
import {Cadastro} from './src/Telas/cadastro'

const stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <stack.Navigator initialRouteName="Index">
        <stack.Screen name='Index' component={Index}></stack.Screen>
        <stack.Screen name='Cadastro' component={Cadastro}></stack.Screen>
      </stack.Navigator>
   </NavigationContainer>
  );
}