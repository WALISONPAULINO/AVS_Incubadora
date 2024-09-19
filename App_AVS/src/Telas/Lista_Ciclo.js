import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StatusBar, SafeAreaView, ActivityIndicator } from "react-native"
import firebase from "../services/firebaseConnection"
import { AuthContext } from "../context/auth"

import style from './Styles_cadastro'
import { TouchableOpacity } from "react-native";

// PÁGINA INICIAL APÓS LOGIN

export default ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const [listaCiclos, setListaCiclos] = useState([])
    const [ciclo, setCiclo] = useState(false)


    // Consultando ciclos
    useEffect(() => {
        function consultaCiclo(){
            firebase.database().ref('ciclos').orderByChild('usuario').equalTo(user.uid).on('value', snapshot => {
                if(snapshot.exists()){

                    let lista = []

                    snapshot.forEach((value)=>{
                        const valor = value.val()

                        lista.push({
                            ciclo: valor,
                            key: value.key,
                            incubadora: valor.incubadora
                        })
                    })
                    setCiclo(true)
                    setListaCiclos(lista)

                    setLoading(false)

                }else{
                    setCiclo(false)
                    setListaCiclos([])
                    setLoading(false)
                }
            }, (error) => {
                console.error('Erro ao buscar ciclos:', error);
            })
        }
        // Fim da função consultaCiclo
        consultaCiclo()
    },[])



    if(loading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <Text style={{fontSize: 20}}>Carregando</Text>
                <ActivityIndicator size='large' color="#131313" />
            </View>
        )
    }
    return(
        <View style={{backgroundColor: '#fff', alignItems: 'center', flex:1, justifyContent:'center'}}>
            <StatusBar backgroundColor={'#13386E'}/>
            <View style={style.container_nome}>
                <Text style={{fontSize: 20}}>Olá, {user.nome}</Text>
            </View>
           

           <View style={style.container_ciclo_D}>
              {/* Renderizando lista com os ciclos do usuário */}
              {ciclo ?
            (
                <>
                    <View style={style.ciclo_andamento}>
                        <Text style={{fontSize:16}}>Ciclos em andamento:</Text>
                    </View>
                    <FlatList 
                        data={listaCiclos} 
                        keyExtractor={item => item.key} 
                        renderItem={ ({item, index}) => (
                            // View container com todos os itens da lista
                            <View style={style.container_andamento}>
                                <View style={style.Ciclos}>
                                    <View style={style.idCiclos}>
                                        <View>
                                            <Text style={style.nomeCiclo}>Ciclo {index+1}</Text>
                                            <Text style={style.nomeCiclo}>{item.incubadora ? item.incubadora.nome : 'Carregando'}</Text>
                                        </View>
                                    </View>
                                    
                                    <TouchableOpacity style={style.excluir}
                                        onPress={() => {
                                            navigation.navigate('dashboard', { key: item.key, ciclo: item.ciclo, incubadora: item.incubadora.uid })
                                        }}>
                                        <Text style={style.Nvisualizar}>Visualizar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        )}
                        /> 
                    </> 
                )
                
                : <Text style={style.sem_ciclo}>Você não possui nenhum ciclo em andamento</Text>} 
                {/* <Button title="Criar ciclo" onPress={() => navigation.navigate('cadastro_ciclo')} /> */}
           </View>

           <View style={style.container_ciclo}>
                <TouchableOpacity
                    style={style.botao_ciclo}
                    title="Criar ciclo" 
                    onPress={() => navigation.navigate('cadastro_ciclo')}
                >
                    <Text style={style.Mais}>+</Text>
                </TouchableOpacity>
            </View>
          
        </View>
    )
}