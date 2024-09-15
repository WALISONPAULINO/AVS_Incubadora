import { Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'
import React, { useState, useContext, useEffect } from 'react'
import styles from './Styles_Index'
import style from './Styles_cadastro'
import firebase from '../services/firebaseConnection'
import { AuthContext } from '../context/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default ({navigation}) => {
    const { user } = useContext(AuthContext)
    const route = useRoute()
    const dataAtual = new Date({})
    const [selectedAve, setSelectedAve] = useState("Galinha");
    const [qtdOvos, setqtdOvos] = useState(0)
    const [incubadora, setIncubadora] = useState(null)
    
    useEffect(() => {
        if(route.params){
            setIncubadora(route.params.data)
        }
    }, [route.params])

    


    async function criaCiclo(){
        // Fazer validação de campos

        // Testando se incubadora já possui um ciclo
        firebase.database().ref('incubadoras').child(incubadora).once('value', snapshot => {
            if(snapshot.exists()){
                if(snapshot.val().ciclo){
                    setIncubadora(null)
                }
            }
        })
        try{
            // Cria UID
            const uid = firebase.database().ref('ciclos').push().key
            // Cria ciclo com o uid
            await firebase.database().ref('ciclos').child(uid).set({
                especie: selectedAve,
                qtdOvos: Number(qtdOvos),
                rotacao: 'Obj Date',
                dtInicio: 'Obj Date',
                dtFim: 'Obj Date',
                incubadora: incubadora,
                usuario: user.uid
            })
            
            // Atribuindo o ciclo criado a incubadora escaneada
            firebase.database().ref('incubadoras').child(incubadora).update({
                ciclo: uid
            })
            navigation.navigate('lista_ciclo')
        }
        catch(e){
            alert(e)
        }

    }
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
                        <Picker.Item label="Galinha" value="Galinha" />
                    </Picker>
                </View>

                <View style={style.Container_tipos}>
                    <View style={styles.Text_campo}> 
                            <Text style={styles.Texto}>Quantidade de ovos</Text>
                    </View>
                    <TextInput 
                        style={styles.Input_email}
                        value={qtdOvos}
                        placeholder='Digite a quantidade de ovos'
                        keyboardType='numeric'
                        secureTextEntry={false}
                        onChangeText={ (texto) => setqtdOvos(texto) }
                    />

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Data Inicial</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text>20/08/22</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Data prevista de término</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text>20/08/22</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Temperatura ideal</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text style={styles.Texto}>37</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Umidade ideal</Text>
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

                {  
                    incubadora /* Se nenhuma incubadora tiver sido escaneada mostra o botão */
                    ?
                    <View style={{
                                backgroundColor:'#3CB371', 
                                width:'90%', 
                                height: 52, 
                                alignItems: 'center', 
                                justifyContent:'center', 
                                borderRadius: 8, 
                                marginTop: 25, 
                                marginBottom: 4,
                                flexDirection: 'row',
                                gap: 5,
                            }}>
                        <Text style={styles.Texto_entrar}>Incubadora escaneada</Text>
                        <MaterialCommunityIcons name="check-circle" size={25} color="#fff" />
                    </View>
                    : 
                    (<>
                        <TouchableOpacity 
                            style={{backgroundColor:'#666666',
                                width:'90%',
                                height: 52,
                                alignItems: 'center',
                                justifyContent:'center',
                                borderRadius: 8,
                                flexDirection: 'row',
                                gap: 10,
                                marginTop: 25,
                                marginBottom: 4,}}
                            onPress={() => navigation.navigate('scanner') }>
                            <Text style={styles.Texto_entrar}>Vincular incubadora</Text>
                            <MaterialCommunityIcons name="qrcode-scan" size={25} color="#fff" />
                        </TouchableOpacity>
                        <Text>É necessário vincular uma incubadora ao seu ciclo</Text>
                    </>)
                }

                    <TouchableOpacity 
                        style={styles.Botao_entrar}
                        onPress={criaCiclo}>
                        <Text style={styles.Texto_entrar}>Criar ciclo</Text>
                    </TouchableOpacity>
                </View>
             </ScrollView>
            
        </KeyboardAvoidingView>
    );
}