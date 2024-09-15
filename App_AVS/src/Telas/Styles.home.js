import { StyleSheet } from "react-native";

export default HomeStyles = StyleSheet.create({
    View_info:{
        backgroundColor:'#13386E',
        width:'90%',
        flex:2,
        marginTop: 80,
        marginBottom: 50,
        alignItems:'center',
        borderRadius:8,
    },

    Infos:{
        width:'90%',
        backgroundColor:'#3A6199',
        marginTop:15,
        height:'70%',
        borderRadius:8,
        alignItems:'center',
        padding: 16
    },

    container_sensor:{
        flex:3,
        width: '90%',
    }, 

    container_titulo:{
        width: '90%',
        flexDirection:'row'
    },

    Titulo:{
        fontSize: 24,
        marginTop:10,
        color: '#fff'
    },

    container_ciclos:{
        marginTop: 10,
        width:'90%',
        flexDirection:'row'
    },

    Campos:{
        fontSize: 20,
        color:'#FFF',
        marginLeft:10
    },

    Campo_sensor:{
        backgroundColor:'#E0E0E0',
        width:'100%',
        height: 74,
        borderRadius: 8,
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        elevation: 10,
        marginBottom:22
    },

    container_icon:{
        marginLeft:8,
        marginBottom:8,
        marginTop:8,
        marginRight: 20,
        width:'16%',
    },

    campo_icon:{
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#13386E',
        borderRadius: 50
    },

    Container_tipo:{
        width:'40%',
        margin:8
    },

    Titulo_sensor:{
        fontSize: 24
    },

    Subtitulo_sensor:{
        fontSize:18,
        color: '#15A64F'
    },

    Container_dados:{
        alignItems:'center',
        justifyContent:'center',
        width:'30%'
    }, 

    Titulo_dados:{
        fontSize:32
    },

    campo_dias:{
        fontSize:16,
        color: 'white',
        marginTop:10
    },

    Container_Nome:{
        width:'90%'
    },

    Name:{
        backgroundColor:'#E0E0E0',
        height:60,
        justifyContent:'center',
        borderRadius: 8,
        marginTop:8,
        marginBottom:20,
        elevation:20
    },

    button_sair:{
        backgroundColor:'#BB4B4B',
        width:'90%',
        height: 55,
        borderRadius:8,
        marginTop:50,
        elevation:20,
        alignItems:'center',
        justifyContent:'center'
    }
  });
  