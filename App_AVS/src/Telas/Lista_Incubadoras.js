import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StatusBar } from "react-native"
import firebase from "../services/firebaseConnection"
import { AuthContext } from "../context/auth"
import { Button } from "react-native";


// PÁGINA INICIAL APÓS LOGIN

export default ({navigation}) => {
    const { user } = useContext(AuthContext)
    const [listaIncubadora, setlistaIncubadora] = useState([])
    const [incubadora, setIncubadora] = useState(false)


    // Consultando ciclos
    useEffect(() => {
        function consultaIncubadora(){
            firebase.database().ref(`usuarios/${user.uid}/incubadoras`).on('value', snapshot => {
                if(snapshot.exists()){

                    let lista = []

                    snapshot.forEach((value)=>{
                        const valor = value.val()

                        lista.push({
                            key: value.key,
                        })

                    })
                    setIncubadora(true)
                    setlistaIncubadora(lista)

                }else{
                    setIncubadora(false)
                    setlistaIncubadora([])
                }
            }, (error) => {
                console.error('Erro ao buscar ciclos:', error);
            })
        }

        consultaIncubadora()
    },[])


    async function excluiIncubadora(uid){
        await firebase.database().ref(`usuarios/${user.uid}/incubadoras`).child(uid).remove()
        .then((r)=>{
            setlistaIncubadora(prevState => prevState.filter(item => item.key !== uid))
        })
        .catch((e)=>{console.log(e)})
    }

    return(
        <View style={{backgroundColor: '#fff'}}>
            <StatusBar />
            <Text style={{fontSize: 20}}>Olá {user.nome}</Text>
            {/* Renderizando lista com as incubadoras sincronizadas */}
            {incubadora ?
            (
                <>
                    <Text>Ciclos em andamento:</Text>
                    <FlatList 
                        data={listaIncubadora} 
                        keyExtractor={item => item.key} 
                        renderItem={ ({item}) => (
                            // View container com todos os itens da lista
                            <View>
                                <View style={{flexDirection: 'row', gap: 10}}>
                                    <Text>ID: {item.key}</Text>
                                    <Button title="Excluir" onPress={() => excluiIncubadora(item.key) } />
                                </View>
                            </View>
                        )}
                        /> 
                    </> 
                )
                : <Text>Você não possui nenhuma incubadora sincronizada</Text>}         
                <Button title="Sincronizar incubadora" onPress={() => navigation.navigate('cadastro_ciclo')} />
        </View>
    )
}