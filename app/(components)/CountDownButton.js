import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { updateProtocol, useDatabase } from '@/app/hooks/database';
import Entypo from '@expo/vector-icons/Entypo';

const CountDown = ({
  isRunning,setIsRunning,hour,setHours,minutes,setMinutes,seconds,setSeconds,
  selectedId,setSelectedId,ar,toggleLoop,setToggleLoop,setModalVisible,setAr,
 setSequence
}) => {
  const db = useDatabase();
  const[arrId,setArrId] = useState(0);
  

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const setLoop = () => {
    setToggleLoop(!toggleLoop)
    setAr([])
    setArrId(0)
    setSequence([])
    setHours('');
    setMinutes('');
    setSeconds('');
  }
  const stopTimer = () => {
    setIsRunning(false);
    console.log('Timer Stopped')
  };
  const resetTimer = () => {
    setIsRunning(false);
    setHours(selectedId.hour);
    setMinutes(selectedId.minutes);
    setSeconds(selectedId.seconds);
    console.log('Timer Reset')
  };
  const longReset = () => {
    setIsRunning(false);
    setHours('');
    setMinutes('');
    setSeconds('');
    console.log('Timer Long Reset')
  };

  // const loopTimer = async () => {
  //   if (ar.length > 0 && (hour === '' && minutes === '' && seconds === '') ||(hour === 0 && minutes === 0 && seconds === 0)){
  //     const id = ar[arrId];
  //     await updateProtocol(db,id,setSelectedId);
  //     setIsRunning(true);
  //     console.log("It is ",isRunning)
  //   }
  //   if (arrId < ar.length - 1){
  //     setArrId((prevId) => prevId + 1);
  //   }else{
  //     console.log('Reached the end of the array, no more items to process.');
  //     setArrId(0);
  //   }
  // };
 
  const loop =  () => {
    const id = ar[arrId];
    updateProtocol(db,id,setSelectedId);
    setArrId((prevId) => prevId + 1);
    setIsRunning(true);
    console.log('Re.',id);
  }

  useEffect(()=>{
      if(arrId < ar.length && (hour === 0 && minutes === 0 && seconds === 0) ){
        loop()
        setModalVisible(true);
      }else if(ar.length-1 < arrId){
        console.log('Reached the end')
        setAr([])
        setArrId(0)
        setSequence([])
      }
      else{
        console.log('not yet')
        setIsRunning(true);
      }
  },[hour,minutes,seconds]);
  console.log('Value', arrId,'Running state',isRunning, 'Array',ar , 'Hour',hour)
  return (
    <View style={styles.countdown_btn}>
      <TouchableOpacity style={styles.button_body} onPress={resetTimer} onLongPress={longReset}>
        <Ionicons name="reload" size={18} color="#fff" />
      </TouchableOpacity>
      {isRunning === true && ar && (ar.length === 0 ||ar.length > 0 ) ? (
          // First condition: Show the stop button when running and array is empty
          <TouchableOpacity style={styles.playButton} onPress={stopTimer}>
            <FontAwesome5 name="stop" size={20} color="white" />
          </TouchableOpacity>
        ) : isRunning === false && ar && ar.length > 0 && ((hour === 0 && minutes === 0 && seconds === 0) || (hour === '' && minutes === '' && seconds === '')) ? (
          // Second condition: Show a reset button (or any other button) when not running and array has items
          <TouchableOpacity style={styles.playButton} onPress={loop}>
            <MaterialIcons name="loop" size={20} color="white" />
        </TouchableOpacity>
        ) : isRunning === false && ar && (ar.length === 0 || hour > 0 && minutes > 0 && seconds > 0 ) && (
          // Third condition: Default play button
          <View>
            <TouchableOpacity style={styles.playButton} onPress={startTimer}>
              <FontAwesome5 name="play" size={20} color="white" />
            </TouchableOpacity>
          </View>
      )}
      <Pressable
          onPress={setLoop}
          style={styles.loopBtn}
          disabled={isRunning}
          >
        {toggleLoop === true && (
          <Entypo name="check" size={10} color="#6C4EB3" />
        )}
      </Pressable>
    </View>
  )
}

export default CountDown

const styles = StyleSheet.create({
  button_body:{
    alignItems:'center',
  },
  playButton:{
    paddingHorizontal:24,
    paddingVertical:22,
    borderRadius:70,
    backgroundColor:'#664EFF',
    alignItems:'center',
    shadowColor: "#664EFF",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity:  0.25,
    shadowRadius: 20.00,
    elevation: 24
  },
  stopandreset:{
    flexDirection:'column',
    gap:10
  },
  countdown_btn:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:50,
  },
  loopBtn:{
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth:2,
    borderColor:'#664EFF',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
})