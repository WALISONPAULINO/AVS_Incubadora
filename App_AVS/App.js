import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/index"
import AuthProvider from "./src/context/auth"

export default function App() {
  return (
   <NavigationContainer>
    <AuthProvider>
      <StatusBar />
      <Routes />
    </AuthProvider>
   </NavigationContainer>
  );
}