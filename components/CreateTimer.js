import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const CreateTimer = () => {
  return (
    <View>
      <TouchableOpacity style={styles.createContainer} >
        <Entypo name="plus" size={24} color="black"/>
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
        paddingVertical:5
    },
    createText:{
        fontSize:20,
        fontWeight:'500'
    }
})