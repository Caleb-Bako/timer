import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import CreateTimer from './CreateTimer';

const TimeScroll = () => {
  const [hour,setHour] = useState('');
  const [minutes,setMinutes] = useState('');
  const [seconds,setSeconds] = useState('');

  const handleHourChange = (value) => {
    const numericValue = parseInt(value, 10); // Parse the input as a number
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23) {
      setHour(numericValue); // Set hour within valid range
    }
  };
  const handleMinutesChange = (value) => {
    const numericValue = parseInt(value, 10); // Parse the input as a number
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 60) {
      setMinutes(numericValue); // Set hour within valid range
    }
  };
  const handleSecondsChange = (value) => {
    const numericValue = parseInt(value, 10); // Parse the input as a number
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 60) {
      setSeconds(numericValue); // Set hour within valid range
    }
  };
  return (
    <View>
    <View style={styles.timerssection} >
      <View style={styles.singlesection}>
      <TextInput
        placeholder="00"
        value={String(hour)} // Convert number to string for TextInput
        onChangeText={handleHourChange} // Update state based on TextInput
        keyboardType="numeric" // Set keyboard to numeric for number inputs
        style={styles.inputField}
      />
      <Slider
        style={styles.sliderstyle}
        minimumValue={0}
        maximumValue={23} // Restrict hour to 0-5 in this example
        step={1} // Ensure the slider moves in whole numbers
        value={hour}
        onValueChange={setHour} // Update state when slider moves
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      </View>
      <View style={styles.singlesection}>
        <TextInput
          placeholder="00"
          value={String(minutes)} // Convert number to string for TextInput
          onChangeText={handleMinutesChange} // Update state based on TextInput
          keyboardType="numeric" // Set keyboard to numeric for number inputs
          style={styles.inputField}
        />
        <Slider
          style={styles.sliderstyle}
          minimumValue={0}
          maximumValue={60} // Restrict hour to 0-5 in this example
          step={1} // Ensure the slider moves in whole numbers
          value={minutes}
          onValueChange={setMinutes} // Update state when slider moves
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.singlesection}>
        <TextInput
        placeholder="00"
        value={String(seconds)} // Convert number to string for TextInput
        onChangeText={handleSecondsChange} // Update state based on TextInput
        keyboardType="numeric" // Set keyboard to numeric for number inputs
        style={styles.inputField}
      />
      <Slider
        style={styles.sliderstyle}
        minimumValue={0}
        maximumValue={60} // Restrict hour to 0-5 in this example
        step={1} // Ensure the slider moves in whole numbers
        value={seconds}
        onValueChange={setSeconds} // Update state when slider moves
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      </View>
    </View>
    <CreateTimer/>
    </View>
  )
} 

export default TimeScroll

const styles = StyleSheet.create({
  timerssection:{
    flexDirection:'row',
    gap:20,
  },
  singlesection:{
    width:105
  },
  inputField:{
    borderWidth:1,
    borderBottomWidth:0,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    padding: 8,
    fontSize:80
  },
  sliderstyle:{
    width: 130, 
    height: 40,
    marginTop:-20,
    marginLeft:-10,
  }
  
})