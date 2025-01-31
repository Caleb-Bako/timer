import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';

const CreateTimer = ({isRunning, setVisible,setSelectedId,setHours,setMinutes,setSeconds}) => {
  const handlePress = () => {
    setVisible(true);
    setSelectedId([]); // This toggles between true and false
    setHours('');
    setMinutes('');
    setSeconds('');
  };
  return (
    <View>
      <Pressable disabled={isRunning} onPress={handlePress}>
        <LinearGradient
          colors={['#6A5CFF', '#D946EF']}
          style={styles.createContainer} 
        >
        <Entypo name="plus" size={30} color="#fff"/>
        <Text style={styles.createText}>Create</Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
}

export default CreateTimer

const styles = StyleSheet.create({
    createContainer:{
      borderWidth: 1,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginVertical: 10,
      borderColor: '#664EFF',
      shadowColor: "#664EFF",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity:  0.17,
      shadowRadius: 3.05,
      elevation: 4,
    },
    createText:{
        paddingTop:10,
        fontSize:18,
        fontWeight:'500',
        color:'#fff',
        fontFamily:'P2P',
    }
})