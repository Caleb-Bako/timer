import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDatabase, createTable, fetchTimers, updateProtocol,deleteTimer } from '@/hooks/database';
import Entypo from '@expo/vector-icons/Entypo';

const List = ({setHour,setMinutes,setSeconds,setSelectedId,setVisible,ar,setAr,toggleLoop,isRunning}) => {
  const [timers, setTimers] = useState([]);
  const [visble,setVisble] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(null);
 
  const db = useDatabase(); // Hook for managing database connection

  const toggleItem = (item) => {
    if (ar.includes(item.id)) {
      // If the item is already in the array, remove it (uncheck)
      setAr((prevAr) => prevAr.filter((i) => i !== item.id));
    } else {
      // If the item is not in the array, add it (check)
      setAr((prevAr) => [...prevAr, item.id]);
    }
  };
  useEffect(() => {
    const init = async () => {
      if (db) {
        await createTable(db); // Ensure table exists
        await fetchTimers(db, setTimers); // Fetch timers from DB
      }
    };
    init();
  }, [db]); 

  const handleDelete = async(id) =>{
    await deleteTimer(db,id)
  }
 
  const editSelectedTimer = async(id) => {
    if(selectedTimer === id){
      setSelectedTimer(null);
      setHour('');
      setMinutes('');
      setSeconds('');
    }else{
      await updateProtocol(db,id,setSelectedId);
      setSelectedTimer(id);
    }
  }

  const handlePress = () => {
    setVisble(!visble); // This toggles between true and false
  };

  const renderTimerItem = ({ item }) => (
    <View style={styles.timerBody}>
      {toggleLoop === true && (
        <TouchableOpacity
        onPress={() => toggleItem(item)}
        style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          borderWidth:2,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          {ar.includes(item.id) && (
            <Entypo name="check" size={15} color="#6C4EB3" />
          )}
        </TouchableOpacity>
      )}
      <Pressable 
        delayLongPress={1000} 
        onPress={() =>editSelectedTimer(item.id)} 
        onLongPress={handlePress} 
        disabled={isRunning}
        style={[styles.timerItem,selectedTimer === item.id && {borderWidth: 2,borderColor: '#664EFF',},{ opacity: isRunning ? 0.5 : 1}]}
      >
        <MaterialCommunityIcons name="timer-sand" size={24} color="#fff" />
        <View style={[styles.timerstrt,toggleLoop === true && {gap:50}]}>
          <View style={styles.timerName}>
            <Text style={styles.timerText} numberOfLines={1} ellipsizeMode="tail">
              {item.name}:
            </Text>
          </View>
          <Text style={styles.timerText}>{item.hour}h</Text>
          <Text style={styles.timerText}>{item.minutes}m</Text>
          <Text style={styles.timerText}>{item.seconds}s</Text>
          {selectedTimer === item.id && visble === true &&(
            <View style={styles.editOverlay}>
              <Pressable onPress={()=>setVisible(true)}>
                <AntDesign name="edit" size={24} color="#fff" />
              </Pressable>
              <Pressable onPress={()=>handleDelete(item.id)}>
                <AntDesign name="delete" size={24} color="#fff" />
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={{flex:1}}>
      <FlatList
        data={timers}
        renderItem={renderTimerItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.timerList}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  timerBody:{
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    width: 400
  },
  timerItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  timerText: {
    fontSize: 12,
    color:'#fff'
  },
  timerName:{
    width:50,
    height:20,
    overflow: 'hidden'
  },
  timerList: {
    marginTop: 20,
  },
  timerstrt: {
    flexDirection: 'row',
    gap: 60,
  },
  editOverlay:{
    backgroundColor:'rgba(52, 52, 52, 0.8)',
    position:'absolute',
    borderRadius: 50,
    paddingHorizontal:50,
    paddingVertical:10,
    left:-33,
    right:-8.5,
    bottom:-11.5,
    flexDirection:'row',
    paddingLeft:108,
    gap:50
  }
});
