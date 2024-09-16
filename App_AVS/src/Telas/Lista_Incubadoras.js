import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, Modal, TextInput, StyleSheet } from "react-native";
import { AuthContext } from "../context/auth";
import firebase from "../services/firebaseConnection";
import estilos from './Styles_Index';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ({navigation}) => {
    const [listaIncubadoras, setListaIncubadoras] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [incubadoraScan, setIncubadoraScan] = useState('')
    const route = useRoute();

    useEffect(() => {
        if(route.params && route.params.data){
            setIncubadoraScan(route.params.data)
            console.log('Passei aqui')
            setModalVisible(true);
        }
    }, [route.params])

    useEffect(() => {
        function consultaIncubadoras() {
            firebase.database().ref(`usuarios/${user.uid}/incubadoras`).on('value', snapshot => {
                if (snapshot.exists()) {
                    let lista = [];
                    snapshot.forEach(value => {
                        // console.log(value.val()[noIncubadora]);
                        lista.push({
                            nome: value.val().nome,
                            ciclo: value.val().ciclo || null,
                            key: value.val().uid
                        });
                    });
                    setListaIncubadoras(lista);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setListaIncubadoras([]);
                }
            });
        }
        consultaIncubadoras();
    }, []);

    function atribuiIncubadora(){
        const uidIncubadora = firebase.database().ref(`usuarios/${user.uid}/incubadoras`).push().key
        firebase.database().ref(`usuarios/${user.uid}/incubadoras`).child(uidIncubadora).set({
            nome: inputValue,
            uid: incubadoraScan,
        })
        navigation.setParams({ data: undefined });
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Carregando</Text>
                <ActivityIndicator size='large' color="#131313" />
            </View>
        );
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={'#13386E'} />
            <Text style={{ fontSize: 20 }}>Incubadoras escaneadas:</Text>
            {listaIncubadoras.length > 0 ? (
                <FlatList
                    data={listaIncubadoras}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ fontSize: 20, color: 'black' }}>Nome da Incubadora: {item.nome}</Text>
                            <Text style={{ fontSize: 16, color: item.ciclo ? 'red' : 'green' }}>{item.ciclo ? 'Ciclo em execução' : 'Livre'}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text>Você não possui nenhuma incubadora escaneada</Text>
            )}
            <TouchableOpacity
                style={{
                    backgroundColor: '#666666',
                    width: '90%',
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 25,
                    marginBottom: 4,
                }}
                onPress={() => navigation.navigate('scanner')}>
                <Text style={estilos.Texto_entrar}>Escanear incubadora</Text>
                <MaterialCommunityIcons name="qrcode-scan" size={25} color="#fff" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Incubadora Escaneada</Text>
                        
                        {/* Exibe o ID da incubadora escaneada */}
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Atribua um nome a sua incubadora</Text>

                        {/* Campo de entrada de texto */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nome da incubadora"
                            value={inputValue}
                            onChangeText={setInputValue}
                        />

                        {/* Botão para confirmar */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setInputValue('')
                                setModalVisible(false); // Fecha o modal após a ação
                                atribuiIncubadora()
                            }}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

        modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
        },
        modalView: {
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#13386E',
        },
        textInput: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            width: '100%',
            paddingHorizontal: 10,
            marginBottom: 20,
        },
        button: {
            backgroundColor: '#13386E',
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
            width: '100%',
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
        }
})