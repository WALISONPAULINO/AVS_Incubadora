import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/auth";
import firebase from "../services/firebaseConnection";
import styles from './Styles_Index';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ({navigation}) => {
    const [listaIncubadoras, setListaIncubadoras] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function consultaIncubadoras() {
            firebase.database().ref(`usuarios/${user.uid}/incubadoras`).on('value', snapshot => {
                if (snapshot.exists()) {
                    let lista = [];
                    snapshot.forEach(value => {
                        // console.log(value.val()[noIncubadora]);
                        lista.push({
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
                            <Text style={{ fontSize: 20, color: 'black' }}>ID da Incubadora: {item.key}</Text>
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
                <Text style={styles.Texto_entrar}>Escanear incubadora</Text>
                <MaterialCommunityIcons name="qrcode-scan" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
