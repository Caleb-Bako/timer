import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDatabase, createTable, fetchTimers, updateProtocol,deleteTimer } from '@/app/hooks/database';

const List = ({setHour,setMinutes,setSeconds,setSelectedId,setVisible,ar,setAr,toggleLoop,isRunning,sequence,setSequence}) => {
  const [timers, setTimers] = useState([]);
  const [visble,setVisble] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(null);
  const db = useDatabase();

  const toggleItem = (item) => {
    if (ar.includes(item.id)) {
      setAr((prevAr) => prevAr.filter((i) => i !== item.id));

    } else {
      setAr((prevAr) => [...prevAr, item.id]);
    }
  };

  const toggleSequence = (item) => {
    if (sequence.some((seq) => seq.id === item.id) && ar.includes(item.id)) {
      setAr((prevAr) => prevAr.filter((i) => i !== item.id));
      setSequence((prevAr) => prevAr.filter((i) => i.id !== item.id));
    } else {
      setAr((prevAr) => [...prevAr, item.id]);
      setSequence((prevAr) => [...prevAr, { id: item.id }]);
    }
  };
  
  useEffect(() => {
    const init = async () => {
      if (db) {
        await createTable(db);
        await fetchTimers(db, setTimers);
      }
    };
    init();
  }, [db]); 

  useEffect(()=>{
    if(toggleLoop===true){
      setSelectedTimer(null);
    }
  },[toggleLoop])

  const handleDelete = async(id) =>{
    await deleteTimer(db,id)
  }
 
  const editSelectedTimer = (id) => {
      if(selectedTimer === id){
        setSelectedTimer(null);
        setHour('');
        setMinutes('');
        setSeconds('');
      }else{
        updateProtocol(db,id,setSelectedId);
        setSelectedTimer(id);
      }
  }

  const handlePress = () => {
    setVisble(!visble); 
  };

  console.log("Seq: ",sequence)
  const renderTimerItem = ({ item }) => (
    <View style={styles.timerBody}>
      {toggleLoop === true && (
        <Pressable 
          onPress={() => toggleSequence(item)} 
          disabled={isRunning}
          style={styles.indexNumber}
        >
          {sequence.map((seq, index) => (
            seq.id === item.id && ( // Ensure only matching id elements are rendered
              <View key={seq.id}>
                <Text style={{ color: 'black', fontSize: 10, fontWeight: '800' }}>
                  {index}
                </Text>
              </View>
            )
          ))}
        </Pressable>
      )}
      {toggleLoop === true ? (
        <Pressable 
        delayLongPress={1000} 
        onPress={() =>toggleItem(item)} 
        disabled={isRunning}
        style={[styles.timerItem,ar.includes(item.id) && {borderWidth: 2,borderColor: '#6A5CFF',} ,toggleLoop ===true && {width: "90%"} ,{ opacity: isRunning ? 0.5 : 1}]}
      >
        <MaterialCommunityIcons name="timer-sand" size={24} color="#fff" />
        <View style={[styles.timerstrt]}>
          <View style={styles.timerName}>
            <Text style={styles.timerText} numberOfLines={1} ellipsizeMode="tail">
              {item.name}:
            </Text>
          </View>
          <Text style={styles.timerText}>{item.hour}h</Text>
          <Text style={styles.timerText}>{item.minutes}m</Text>
          <Text style={styles.timerText}>{item.seconds}s</Text>
        </View>
      </Pressable>
      ):(
      <Pressable 
        delayLongPress={1000} 
        onPress={() =>editSelectedTimer(item.id)} 
        onLongPress={handlePress} 
        disabled={isRunning}
        style={[styles.timerItem,selectedTimer === item.id && {borderWidth: 2,borderColor: '#6A5CFF',},{ opacity: isRunning ? 0.5 : 1}]}
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
                <AntDesign name="delete" size={24} color="red" />
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
      )}
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
    gap:5,
    alignItems:'center',
    // borderWidth: 1,
    // borderColor: '#000000',
    // borderRadius: 50,
    // marginBottom:5,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // // position:'relative',
    // shadowOpacity:  0.17,
    // shadowRadius: 3.05,
    // elevation:4,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    position: "relative",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    height: "80%",
    position:'relative',
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  indexNumber: {
    width: 25,  // Set a fixed size
    height: 25, 
    marginTop:10,
    borderWidth: 1,
    borderColor: '#6A5CFF',
    borderRadius: 15,  // Keep it circular
    backgroundColor: 'white',
    alignItems: 'center',  // Center content
    justifyContent: 'center', // Center content
  },
  timerText: {
    fontSize: 12,
    color:'#fff',
    fontFamily:'P2P',
  },
  timerName:{
    width:100,
    overflow: 'hidden',
  },
  timerList: {
    marginTop: 20,
  },
  timerstrt: {
    flexDirection: 'row',
    gap: 30,
    alignItems:'center',
    width:'90%'
  },
  editOverlay:{
    backgroundColor:'rgba(10, 10, 10, 0.9)',
    position:'absolute',
    borderRadius: 50,
    paddingVertical:10,
    left:-42,
    right:-15.5,
    bottom:-13.5,
    flexDirection:'row',
    paddingLeft:230,
    gap:30
  },
});
