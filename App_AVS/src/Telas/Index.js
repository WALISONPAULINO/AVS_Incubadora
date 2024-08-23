import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Button, Alert} from 'react-native'

import styles from './Styles_Index'

export function Index ({navigation}){
    return(    
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.Logo}>
                <Image style={styles.Image_Logo}
                    source={require('../Images/AVS.png')}
                />
            </View>

            <View style={styles.Container}>
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>E-mail</Text>
                </View>
                <TextInput style={styles.Input_email}
                    placeholder='Digite seu e-mail'
                />

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Senha</Text>
                </View>
                <TextInput  style={styles.Input_senha}
                    placeholder='Digite sua senha'
                />
                <View style={styles.Text_senha}> 
                    <Text style={styles.esqueci_Senha}>Esqueci minha senha</Text>
                </View>
                
                <TouchableOpacity style={styles.Botao_entrar}
                    title='página sobre'
                    onPress={()=> 
                        navigation.navigate('Sobre')
                    }>
                    <Text style={styles.Texto_entrar}>Entrar</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.esqueci_Senha}>Não tem uma conta? Registre-se</Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}


