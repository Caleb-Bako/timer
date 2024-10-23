import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

// Custom hook for opening and initializing database
export const useDatabase = () => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const openDatabase = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('timerdb');
        setDb(database);
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    openDatabase();
  }, []); // Only runs once on component mount

  return db;
};

// Function to create a table
export const createTable = async (db) => {
  if (!db) return;

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS timers (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        hour INTEGER NOT NULL,
        minutes INTEGER NOT NULL,
        seconds INTEGER NOT NULL
      );
    `);
    console.log('Timers table created');
  } catch (error) {
    console.error('Error creating timers table:', error);
  }
};

// Function to insert a timer
export const insertTimer = async (db, name, hour, minutes, seconds) => {
  if (!db) return;

  try {
    const hourNum = parseInt(hour, 10);
    const minutesNum = parseInt(minutes, 10);
    const secondsNum = parseInt(seconds, 10);

    await db.runAsync(`
      INSERT INTO timers (name, hour, minutes, seconds)
      VALUES (?, ?, ?, ?);
    `, [name, hourNum, minutesNum, secondsNum]);
    console.log('Timer inserted');
  } catch (error) {
    console.error('Error inserting timer:', error);
  }
};

export const updateTimer = async (db, name, hour, minutes, seconds,id) =>{
  try {
    const hourNum = parseInt(hour, 10);
    const minutesNum = parseInt(minutes, 10);
    const secondsNum = parseInt(seconds, 10);
    await db.runAsync(
      'UPDATE timers SET name = ?, hour = ?, minutes = ?, seconds = ? WHERE id = ?',
      [name, hourNum, minutesNum, secondsNum, id]
    );
    console.log('Update Successfully');
  }catch (error) {
    console.error('Error updating timer:', error);
  }
}

// Function to fetch timers
export const fetchTimers = async (db, setTimers) => {
  if (!db) return;

  try {
    const result = await db.getAllAsync('SELECT * FROM timers;');
    setTimers(result);
    // console.log(result.id, result.name)
  } catch (error) {
    console.error('Error fetching timers:', error);
  }
};

//Protocol
export const updateProtocol = async (db,id,setSelectedId) => {
  if (!db) return;
  try{
    const result =  await db.getAllAsync('SELECT * FROM timers WHERE id = ?',id);
    if(result){
      const timer = result[0]; // Access the first item in the array
      console.log('protocol', timer.id, timer.name);
      setSelectedId(timer);
    }
  }catch (error) {
    console.error('Error editing timers:', error);
  }
}

export const deleteTimer = async (db,id)=>{
  if (!db) return;
  try{
    await db.runAsync('DELETE FROM timers WHERE id = ?',id);
    console.log('Deleted');
  }catch(error){
    console.error('Error deleting timers:', error);
  }
}
