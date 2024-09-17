import { Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StatusBar, ScrollView, } from "react-native";
import React, { useState, useContext } from "react";
import styles from "./Styles_Index";
import style from "./Styles_cadastro";
import { AuthContext } from "../context/auth";

// PÁGINA DE CADASTRO
export default ({ navigation }) => {
  const { cadastro } = useContext(AuthContext)
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleCadastro(){
    cadastro(nome, email, senha)
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <ScrollView style={{flex:1, width: '100%'}}>
        <StatusBar backgroundColor={"#13386E"} />
        <View style={styles.Logo}>
          <Image
            style={styles.Image_Logo}
            source={require("../Images/AVS.png")}
          />
        </View>

        <View style={styles.Container}>
          {/* Campo de nome */}
          <View style={styles.Text_campo}>
            <Text style={styles.Texto}>Nome</Text>
          </View>
          <TextInput
            onChangeText={(texto) => setNome(texto)}
            style={styles.Input_email}
            placeholder="Digite seu nome"
          />

          {/* Campo de email */}
          <View style={styles.Text_campo}>
            <Text style={styles.Texto}>E-mail</Text>
          </View>
          <TextInput
            onChangeText={(texto) => setEmail(texto)}
            style={style.Input_senha}
            placeholder="Digite seu e-mail"
          />

          {/* Campo de senha */}
          <View style={styles.Text_campo}>
            <Text style={styles.Texto}>Senha</Text>
          </View>
          <TextInput
            onChangeText={(texto) => setSenha(texto)}
            style={styles.Input_email}
            secureTextEntry={true}
            placeholder="Digite sua senha"
          />

          {/* Campo para confirmar senha */}
          <View style={styles.Text_campo}>
            <Text style={styles.Texto}>Confirme sua senha</Text>
          </View>
          <TextInput
            onChangeText={(texto) => setConfirmarSenha(texto)}
            style={styles.Input_senha}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />

          {/* Vou precisar criar um aviso aqui para dizer que as senhas precisam ser iguais */}

          <TouchableOpacity
            style={styles.Botao_entrar}
            title="página sobre"
            onPress={handleCadastro}
          >
            <Text style={styles.Texto_entrar}>Cadastrar</Text>
          </TouchableOpacity>

          <View>
            <Text onPress={() => navigation.navigate("login")} style={styles.esqueci_Senha}>
              Já tem uma conta? Faça login
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
