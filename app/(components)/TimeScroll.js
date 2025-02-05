import { StyleSheet, Text, TextInput, View,Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import AddTimer from './AddTimer';
import CreateTimer from './CreateTimer';
import List from './List';
import CountDown from './CountDownButton';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ModalView from './modal';
import { requestPermissions, schedulePushNotification } from '../hooks/notifications';
import {useFonts} from "expo-font";

const TimeScroll = () => {
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [selectedId,setSelectedId] = useState([]);
  const [visble,setVisible] =useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [ar, setAr] = useState([]);
  const [toggleLoop,setToggleLoop] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sequence,setSequence] = useState([]);
  const [notifications,setNotifications] = useState(0);
  const [fontsLoaded] = useFonts({
    'P2P': require('../../assets/fonts/JetBrainsMono-VariableFont_wght.ttf')
  });

  if(!fontsLoaded){
    console.log('Not found')
  }

  useEffect(() => {
    let interval = null;

    if (isRunning && (hour > 0 || minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (hour > 0) {
          setHour((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    } else if (hour === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval);
      setIsRunning(false);
      console.log('Timer OG')

    }
    return () => clearInterval(interval);
  }, [isRunning, hour, minutes, seconds]);

  // console.log(visble);

  useEffect(()=>{
    if (selectedId>''){
      // console.log('iT works',selectedId);
      setHour(selectedId.hour);
      setMinutes(selectedId.minutes);
      setSeconds(selectedId.seconds);
    }
    else if(selectedId===''){
      console.log('em[ty');
    }

  },[selectedId])

  useEffect(()=>{
    if(notifications === 1 && (hour === 0 && minutes === 0 && seconds === 1) ){
      schedulePushNotification()
      setNotifications(0);
      console.log("Trigerring")
    }else{
      console.log("Not yet Trigerring")
    }
  },[hour, minutes, seconds,notifications])
  
  const handleHourChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23) {
      setHour(numericValue);
    }
  };

  const handleMinutesChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue < 60) {
      setMinutes(numericValue);
    }
  };

  const handleSecondsChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue < 60) {
      setSeconds(numericValue);
    }
  };

  requestPermissions();

  return (
    <Animated.View 
    entering={FadeIn}
    exiting={FadeOut}
    style={styles.timerbody}>
      <View style={styles.timerssection}>
        <View style={styles.singlesection}>
          <TextInput
            placeholder="00"
            placeholderTextColor='#fff'
            value={String(hour)}
            onChangeText={handleHourChange}
            keyboardType="numeric"
            style={styles.inputField}
          />
          <Slider
            style={styles.sliderstyle}
            minimumValue={0}
            maximumValue={23}
            step={1}
            value={hour}
            onValueChange={setHour}
            thumbTintColor='#6A5CFF'
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles.singlesection}>
          <TextInput
            placeholder="00"
            placeholderTextColor='#fff'
            value={String(minutes)}
            onChangeText={handleMinutesChange}
            keyboardType="numeric"
            style={styles.inputField}
          />
          <Slider
            style={styles.sliderstyle}
            minimumValue={0}
            maximumValue={59} // Corrected to 59
            step={1}
            value={minutes}
            onValueChange={setMinutes}
            thumbTintColor='#6A5CFF'
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles.singlesection}>
          <TextInput
            placeholder="00"
            placeholderTextColor='#fff'
            value={String(seconds)}
            onChangeText={handleSecondsChange}
            keyboardType="numeric"
            style={styles.inputField}
          />
          <Slider
            style={styles.sliderstyle}
            minimumValue={0}
            maximumValue={59} // Corrected to 59
            step={1}
            thumbTintColor='#6A5CFF'
            value={seconds}
            onValueChange={setSeconds}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
      <View>
          <CountDown 
            isRunning={isRunning} 
            setIsRunning={setIsRunning} 
            setHours={setHour} 
            hour={hour}
            setMinutes={setMinutes}
            minutes={minutes} 
            setSeconds={setSeconds}
            seconds={seconds}
            selectedId={selectedId}
            toggleLoop={toggleLoop}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            setToggleLoop={setToggleLoop}
            ar={ar}
            setAr={setAr}
            setSequence={setSequence}
            setSelectedId={setSelectedId}
            setNotifications={setNotifications}
          />
        </View>
      {visble===true&&(
        <AddTimer
          hours={hour}
          setHours={setHour}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setVisible={setVisible}
        />
      )}
      {modalVisible && (
        <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible} setIsRunning={setIsRunning}/> 
      )}
      
      {visble===false &&(
        <View style={styles.container}>
          <List 
            isRunning={isRunning}  
            setHour={setHour}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            setVisible={setVisible}
            ar={ar}
            sequence={sequence}
            setSequence={setSequence}
            setAr={setAr}
            setSelectedId={setSelectedId}
            toggleLoop={toggleLoop}
          />
          <CreateTimer setVisible={setVisible}  isRunning={isRunning}
          setSelectedId={setSelectedId} setHours={setHour} setMinutes={setMinutes} setSeconds={setSeconds}/>
        </View>
      )}
    </Animated.View>
  );
};

export default TimeScroll;

const styles = StyleSheet.create({
  timerbody:{
    flex:1,
    padding:10,
  },
  timerssection: {
    flexDirection: 'row',
    gap: 20,
  },
  singlesection: {
    width: 100,
  },
  inputField: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    fontSize: 40,
    color:'#fff',
    height:150,
    fontFamily:'P2P',
    textAlign:'center'
  },
  sliderstyle: {
    width: 123,
    height: 40,
    marginTop: -20,
    marginLeft: -10,
  },
  container: {
    flex: 1, 
  },
  countdown_btn:{
    position:'absolute',
    top:420,
    left:270,
  }
});
