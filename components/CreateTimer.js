import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const CreateTimer = ({setVisible,setSelectedId,setHours,setMinutes,setSeconds}) => {
  const handlePress = () => {
    setVisible(true);
    setSelectedId([]); // This toggles between true and false
    setHours('');
    setMinutes('');
    setSeconds('');
  };
  return (
    <View>
      <TouchableOpacity style={styles.createContainer}  onPress={handlePress}>
        <Entypo name="plus" size={24} color="#fff"/>
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateTimer

const styles = StyleSheet.create({
    createContainer:{
        borderWidth:1,
        borderRadius:20,
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical:5,
        marginVertical:10,
        backgroundColor:'#664EFF',
        borderColor:'#664EFF',
        shadowColor: "#664EFF",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    createText:{
        fontSize:20,
        fontWeight:'500',
        color:'#fff'
    }
})