import { StyleSheet } from "react-native";

export default style = StyleSheet.create({
    Input_senha:{
        backgroundColor:'#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 8,
        padding: 12,
        elevation: 10
      },

    container_picker: {
        justifyContent: 'center',
        width:'90%',
        marginLeft:20,
    },

    label: {
        fontSize: 17,
        marginBottom: 8,
    },
    picker: {
        backgroundColor:'#FFF',
        width: '100%',
        color: '#222',
        fontSize: 17,
        padding: 12,
        elevation: 10,
        marginBottom:15
    },
       
    Container_tipos:{
        flex:1,
        alignItems:'center',
        width: '100%',
    },

    titulo_ciclo:{
        alignItems:'center',
        marginBottom: 15,
      
    },

    Texto_ciclo:{
          fontSize:16
    },

    container_nome:{
        marginTop: 150,
        marginBottom: 50,
        width: '90%',
        flex:1,
        alignItems: 'center'
    }, 

    sem_ciclo:{
        fontSize:14,
        marginTop: 30
    },

    container_ciclo_D:{
        flex:2,
        width:'90%',
        alignItems:'center',
    },

    
    container_ciclo:{
        width:'90%',
        justifyContent:'space-between',
        alignItems:'flex-end',
        flex:1
    },

    botao_ciclo:{
        width:'20%',
        height: '50%',
        backgroundColor:'#14386d',
        borderRadius:50,
        marginBottom:50,
        alignItems:'center',
        justifyContent:'center'
    },

    Mais:{
        color:'white',
        fontSize:40
    },

    ciclo_andamento:{
        width:'95%',
        marginBottom:20
    },

    container_andamento:{
        backgroundColor:'#A3ACB9',
        width:370,
        height: 70,
        borderRadius: 8,
    },

    Ciclos:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:2,
        flexDirection:'row',
    },

    idCiclos:{
        width:'50',
        flexDirection:'row'
    },

    excluir:{
        backgroundColor:'#13386E',
        width:'30%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginLeft: 10
    },

    Nvisualizar:{
        color: 'white',
    },

    nomeCiclo:{
        fontSize:15
    }
  });