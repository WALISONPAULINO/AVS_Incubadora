import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Index} from './src/Telas/Index'
import {Cadastro} from './src/Telas/cadastro'
import {Home} from "./src/Telas/Home";
import {Cadastro_Ciclo} from './src/Telas/Cadastro_Ciclo'

const stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <stack.Navigator initialRouteName="Index">
          <stack.Screen name='Index' options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }} component={Index}>
          </stack.Screen>

          <stack.Screen name='Cadastro' options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }} component={Cadastro}>
          </stack.Screen>

          <stack.Screen name='Home' options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }} component={Home}>
          </stack.Screen>

          <stack.Screen name='Cadastro_Ciclo' options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }} component={Cadastro_Ciclo}>
          </stack.Screen>

      </stack.Navigator>
   </NavigationContainer>
  );
}