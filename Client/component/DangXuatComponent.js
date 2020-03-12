import React,{useState} from 'react';
import {Text,View,StyleSheet,TextInput, Button,Image,TouchableOpacity, Alert, Dimensions} from 'react-native';

export default function DangXuatComponent(){
    return(
        <View style={styles.item}>
                            <TouchableOpacity style={styles.item2}>
                            <Image style={styles.icon} source={require('../assets/logout.png')}></Image>
                            <Text style={styles.text3}>Đăng xuất</Text>
                            </TouchableOpacity>                            
                        </View>
    );
}
const {heigt,width} = Dimensions.get('window');
const styles = StyleSheet.create({
    item:{
        width: '50%',
        height:112,
        justifyContent:'center',
        alignItems:'center',
        marginTop:16
    },
    icon:{
        width:64,
        height:64,
    },
    text3:{
        paddingTop:10,
        fontWeight:'bold'
    },
    item2:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
});