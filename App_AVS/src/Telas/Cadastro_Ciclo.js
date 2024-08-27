import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Button, Alert} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import styles from './Styles_Index'

export function Cadastro_Ciclo ({navigation}){
    return(    
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.Logo}>
                <Image style={styles.Image_Logo}
                    source={require('../Images/AVS.png')}
                />
            </View>

            <View style={styles.Container}>
                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Data Inicial</Text>
                </View>
                <TextInput style={styles.Input_email}
                    // placeholder='Digite seu e-mail'
                />

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Data prevista de término</Text>
                </View>
                
                <View style={styles.Input_False}> 
                    <Text>20/08/22</Text>
                </View>

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Quantidade de ovos</Text>
                </View>
                <TextInput style={styles.Input_email}
                     placeholder='Digite a quantidade de ovos'
                />

                <View style={styles.Text_campo}> 
                    <Text style={styles.Texto}>Espécie</Text>
                </View>
                

                {/* botão Entrar */}
                <TouchableOpacity style={styles.Botao_entrar}
                    title='página sobre'
                    onPress={()=> 
                        navigation.navigate('Sobre')
                    }>
                    <Text style={styles.Texto_entrar}>Cadastrar Ciclo</Text>
                </TouchableOpacity>


            </View>
        </KeyboardAvoidingView>
    );
}