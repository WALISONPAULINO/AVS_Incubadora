import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Index} from './src/Telas/Index'
const stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <stack.Navigator initialRouteName="Index">
        <stack.Screen name='Index' component={Index}></stack.Screen>
      </stack.Navigator>
   </NavigationContainer>
  );
}