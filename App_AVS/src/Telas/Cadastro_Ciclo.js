import { Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useState, useContext, useEffect } from 'react'
import styles from './Styles_Index'
import style from './Styles_cadastro'
import firebase from '../services/firebaseConnection'
import { AuthContext } from '../context/auth'
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default ({navigation}) => {
    const { user } = useContext(AuthContext)
    const dataAtual = new Date({})
    const [selectedAve, setSelectedAve] = useState("Galinha");
    const [qtdOvos, setqtdOvos] = useState(0)
    const [incubadora, setIncubadora] = useState(null)
    const [loading, setLoading] = useState(true)
    const [listaIncubadoras, setListaIncubadoras] = useState([])
    const [selectedIncubadora, setSelectedIncubadora] = useState('');

    useEffect(() => {
        function consultaIncubadoras() {
            firebase.database().ref(`usuarios/${user.uid}/incubadoras`).on('value', snapshot => {
                if(snapshot.exists()) {
                    let lista = [];
                    snapshot.forEach(value => {
                        if(!value.val().ciclo){
                            console.log('Passei aqui')
                            lista.push({
                                key: value.val().uid,
                                nome: value.val().nome
                            });
                            console.log('Não tem ciclo')
                        }
                        else{
                            setListaIncubadoras(false)
                            console.log('Tem ciclo')
                        }
                    });
                    setListaIncubadoras(lista);
                    setLoading(false);
                } else {
                    setListaIncubadoras([])
                    setLoading(false);
                }
            });
        }
        consultaIncubadoras();
    }, []);

    async function criaCiclo(){
        // Fazer validação de campos
        const regex = /[.#$\[\]]/g;
        if(regex.test(selectedIncubadora)){
            alert('Selecione uma incubadora para seu ciclo')
            return;
        }
        // Testando se incubadora já possui um ciclo
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
                incubadora: selectedIncubadora,
                usuario: user.uid
            })
            console.log('Cheguei aqui 1')
            console.log(selectedIncubadora)
            // Atribuindo o ciclo criado a incubadora escaneada
            firebase.database().ref('incubadoras').child(selectedIncubadora).update({
                ciclo: uid
            })

            // Atualizando incubadora na tabela do usuário
            console.log('Cheguei aqui 2')
            firebase.database().ref(`usuarios/${user.uid}/incubadoras`).orderByChild('uid').equalTo(selectedIncubadora).once('value', snapshot => {
                snapshot.forEach(value => {
                    const incubadoraKey = value.key

                    firebase.database().ref(`usuarios/${user.uid}/incubadoras/${incubadoraKey}`).update({
                        ciclo: uid
                    })
                })
            })

            navigation.navigate('lista_ciclo')
        }
        catch(e){
            alert(e)
        }

    }
    return(    
        <KeyboardAvoidingView style={styles.background}>
            <StatusBar backgroundColor={'#13386E'}/>
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
                        <Text style={styles.Texto}>36C° - 37C°</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Umidade ideal</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text style={styles.Texto}>55% - 65%</Text>
                    </View>

                    <View style={styles.Text_campo}> 
                        <Text style={styles.Texto}>Frequência de rotação</Text>
                    </View>
                    <View style={styles.Input_False}> 
                        <Text style={styles.Texto}>A cada 4h</Text>
                    </View>

                {  
                    listaIncubadoras.length > 0 
                    /* Se a lista de incubadoras não possui elementos significa que 
                    nenhuma incubadora pode ser selecionada para o ciclo */
                    ?
                    (<>

                        <Text>É necessário selecionar uma incubadora para seu ciclo</Text>
                        <View style={style.container_picker}>
                            <Picker
                                selectedValue={selectedIncubadora}
                                style={style.picker}
                                onValueChange={(itemValue) => setSelectedIncubadora(itemValue)} // Atualiza incubadora selecionada
                            >
                                {/* Mapeia a lista de incubadoras para o Picker */}
                                <Picker.Item key={1} label='Selecione uma incubadora' value='#$[]]g;' />
                                {listaIncubadoras.map((incubadora) => (
                                    <Picker.Item key={incubadora.key} label={incubadora.nome} value={incubadora.key} />
                                ))}
                            </Picker>
                        </View>
                    </>)
                    : <Text>Você não possui nenhuma incubadora disponível. Escaneie uma incubadora na seção Incubadoras!</Text>
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