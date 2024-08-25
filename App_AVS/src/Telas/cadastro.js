import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Button, Alert} from 'react-native'

import styles from './Styles_Index'
import style from './Styles_cadastro'

export function Cadastro ({navigation}){
    return(    
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.Logo}>
                <Image style={styles.Image_Logo}
                    source={require('../Images/AVS.png')}
                />
            </View>

            <View style={styles.Container}>
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Nome</Text>
                </View>
                <TextInput style={styles.Input_email}
                    placeholder='Digite seu nome'
                />

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>E-mail</Text>
                </View>
                <TextInput  style={style.Input_senha}
                    placeholder='Digite seu e-mail'
                />

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Senha</Text>
                </View>
                <TextInput style={styles.Input_email}
                    placeholder='Digite sua senha'
                />

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Confirme sua senha</Text>
                </View>
                <TextInput  style={styles.Input_senha}
                    placeholder='Digite sua senha'
                />
                
                <TouchableOpacity style={styles.Botao_entrar}
                    title='página sobre'
                    onPress={()=> 
                        navigation.navigate('Sobre')
                    }>
                    <Text style={styles.Texto_entrar}>Cadastrar</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.esqueci_Senha}>Já tem uma conta? Faça login</Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}


