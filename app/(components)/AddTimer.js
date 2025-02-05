import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import { useDatabase, createTable, insertTimer,updateTimer } from '@/app/hooks/database';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const AddTimer = ({ hours, setHours, minutes, setMinutes, seconds, setSeconds,selectedId,setSelectedId,setVisible}) => {
  const [name, setName] = useState('');
  const db = useDatabase(); // Hook to open the database connection

  const handlePress = () => {
    setVisible(false); // This toggles between true and false
  };

  useEffect(() => {
    const init = async () => {
      if (db) {
        await createTable(db); // Ensure the table exists when db is ready
      }
    };
    init();
  }, [db]); // Only run this effect when db is initialized

  console.log(selectedId)
  useEffect(()=>{
    if (selectedId>''){
      console.log('iT works',selectedId);
      setName(selectedId.name)
    }
    else if(selectedId===''){
      console.log('em[ty');
    }
  },[])

  const handleUpdate = async () => {
    const id = selectedId.id
    console.log('ID',id)
    if(id){
      try {
        // Call insert function with db and values
        await updateTimer(db, name.trim(), hours, minutes, seconds,id);
        console.log('Timer updated successfully');
        // Clear fields after insertion
        setName('');
        setHours('');
        setMinutes('');
        setSeconds('');
        setSelectedId([]);
        handlePress();
      } catch (error) {
        console.error('Error inserting timer:', error);
      }
    }
  }

  const handleInsert = async () => {
    if (!name.trim()) {
      console.log('Please enter a timer name.');
      return;
    }
    if (!hours || !minutes || !seconds) {
      console.log('Please fill in all timer fields.');
      return;
    }

    try {
      // Call insert function with db and values
      await insertTimer(db, name.trim(), hours, minutes, seconds);
      console.log('Timer added successfully');
      setSelectedId('');
      handlePress();
    } catch (error) {
      console.error('Error inserting timer:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.exit} onPress={handlePress}>
        <Feather name="x" size={24} color="#fff" />
      </TouchableOpacity>
      <TextInput
        placeholder="Timer Name"
        placeholderTextColor='#a6a6a6'
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {selectedId.length === 0 ? (
        <Pressable onPress={handleInsert}>
          <LinearGradient
            colors={['#6A5CFF', '#D946EF']}
            style={styles.createTimer}
          >
            <Text style={styles.addTimer}>ADD TIMER</Text>
          </LinearGradient>
        </Pressable>
      ):(
        <Pressable onPress={handleUpdate}>
          <LinearGradient
            colors={['#6A5CFF', '#D946EF']}
            style={styles.createTimer}
          >
          <Text style={styles.addTimer}>UPDATE</Text>
        </LinearGradient>  
        </Pressable>
      )}
    </View>
  );
};

export default AddTimer;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    padding: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',  
    borderRadius: 16,
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 4 },  
    shadowOpacity: 0.1,
    shadowRadius: 30,  
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  input: {
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    color:'#FFF',
    borderRadius: 5,
    backgroundColor:'rgba(52, 52, 52, 0.8)',
    fontFamily:'P2P',
  },
createText:{
    fontSize:20,
    fontWeight:'500',
},
createTimer:{
  paddingVertical:12,
  paddingTop:20,
  marginVertical:10,
  shadowColor: "#6C4EB3",
  shadowOffset: {
    width: 0,
    height: 3,
    },
  shadowOpacity:  0.17,
  shadowRadius: 3.05,
  elevation: 4
},
addTimer:{
  fontSize:20,
  fontWeight:'500',
  color:'#fff',
  fontFamily:'P2P',
  textAlign:'center',
},
exit:{
  position:'absolute',
  left:'127%',
  top:10
}
});
