import { Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'
import React, { useState, useContext, useEffect } from 'react'
import styles from './Styles_Index'
import style from './Styles_cadastro'
import firebase from '../services/firebaseConnection'
import { AuthContext } from '../context/auth'

export default ({navigation}) => {
    const horaRotacao = new Date({})
    const { user } = useContext(AuthContext)
    const [selectedAve, setSelectedAve] = useState("galinha");
    const [qtdOvos, setqtdOvos] = useState(0)
    const [incubadora, setIncubadora] = useState(null)
    const route = useRoute();

    useEffect(() => {
        // Consultando incubadora para vincular ao ciclo quando ele for salvo
        // NÃO POSSO PERMITIR QUE UMA INCUBADORA TENHA MAIS DE UM CICLO
        function consultaIncubadora(){
            firebase.database().ref('usuarios').child(user.uid).child('incubadora').once('value', snapshot => {
                if(snapshot.exists()){
                    // console.log(snapshot.val())
                    setIncubadora(snapshot.val())
                } else {
                    console.log("Usuário não possui incubadora.");
                }
            }, error => {
                console.error("Erro ao acessar incubadora:", error);
            });
        }
        consultaIncubadora()
    }, []);


    async function criaCiclo(){
        try{
            const uid = firebase.database().ref('ciclos').push().key
            await firebase.database().ref('ciclos').child(uid).set({
                especie: selectedAve,
                qtdOvos: Number(qtdOvos),
                rotacao: 'Obj Date',
                dtInicio: 'Obj Date',
                dtFim: 'Obj Date',
                incubadora: incubadora,
                usuario: user.uid
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
                        <Picker.Item label="Galinha" value="galinha" />
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
                        onChangeText={ (texto) => setqtdOvos(texto) }
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