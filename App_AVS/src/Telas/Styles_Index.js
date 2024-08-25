import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    background:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
    },

    Logo:{
      flex:1,
      justifyContent:'center',
      marginTop: 40
    },

    Container:{
      flex:3,
      alignItems:'center',
      justifyContent:'center',
      width: '90%'
    },

    Input_email:{
      backgroundColor:'#FFF',
      width: '90%',
      marginBottom: 15,
      color: '#222',
      fontSize: 17,
      borderRadius: 8,
      padding: 12,
      elevation: 10
    },

    Input_senha:{
      backgroundColor:'#FFF',
      width: '90%',
      marginBottom: 5,
      color: '#222',
      fontSize: 17,
      borderRadius: 8,
      padding: 12,
      elevation: 10
    },

    Text_campo:{
      alignItems: 'flex-start',
      width: '90%',
      marginBottom: 5,
      
    },
    Texto:{
      fontSize: 16,
    },

    Image_Logo:{
      width: 200,   
      height: 200,  
    },

    Text_senha:{
      width:'90%',
      alignItems: 'flex-end',
    },
    
    esqueci_Senha:{
       textDecorationLine: 'underline'
    },

    Botao_entrar:{
      backgroundColor:'#13386E',
      width:'90%',
      height: 52,
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 8,
      marginTop: 20,
      marginBottom: 8,
    },

    Texto_entrar:{
      color: '#FFF',
      fontSize: 16,
    }
  });
  