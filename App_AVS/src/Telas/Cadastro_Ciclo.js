import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import styles from './Styles_Index'
import style from './Styles_cadastro'

export function Cadastro_Ciclo ({navigation}){
    const [selectedAve, setSelectedAve] = useState("galinha");
    return(    
        <KeyboardAvoidingView style={styles.background}>
             <ScrollView style={{ width: '100%',}}>
                <View style={styles.Logo}>
                    <Image style={styles.Image_Logo}
                        source={require('../Images/AVS.png')}
                    />
                </View>

                <View style={style.titulo_ciclo}>
                    <Text style={style.Texto_ciclo}>Adicione um novo ciclo</Text>
                    <Text style={style.Texto_ciclo}>de incubação</Text>
                </View>

                <View style={style.container_picker}>
                    <Text style={style.label}>Espécie</Text>
                    <Picker
                        selectedValue={selectedAve}
                        style={style.picker}
                        onValueChange={(itemValue) => setSelectedAve(itemValue)}
                    >
                        <Picker.Item label="Galinha" value="galinha" />
                    </Picker>
                </View>

                <View style={style.Container_tipos}>
                    <View style={styles.Text_campo}> 
                            <Text style={styles.Texto}>Quantidade de ovos</Text>
                    </View>
                    <TextInput style={styles.Input_email}
                            placeholder='Digite a quantidade de ovos'
                    />

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
                        <Text style={styles.Texto}>Temperatura</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text style={styles.Texto}>37</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Umidade</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text style={styles.Texto}>60</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Frequência de rotação</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text style={styles.Texto}>A cada 4h</Text>
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
             </ScrollView>
            
        </KeyboardAvoidingView>
    );
}