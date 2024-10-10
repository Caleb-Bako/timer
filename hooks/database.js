import * as SQLite from 'expo-sqlite';

// Open or create the database
const db = SQLite.openDatabaseAsync('timers.db');

// Create table if it doesn't exist
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS timers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, duration INTEGER, isActive INTEGER);',
      [],
      () => {
        console.log('Table created successfully');
      },
      (tx, error) => {
        console.log('Error creating table:', error);
      }
    );
  });
};

// Add a new timer
export const addTimer = (name, duration) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO timers (name, duration, isActive) VALUES (?, ?, ?)',
        [name, duration, 0], // isActive set to 0 by default
        (tx, resultSet) => {
          console.log('Timer added successfully');
          resolve(resultSet.insertId);
        },
        (tx, error) => {
          console.log('Error adding timer:', error);
          reject(error);
        }
      );
    });
  });
};

// Retrieve all timers
export const getTimers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM timers',
        [],
        (tx, { rows: { _array } }) => {
          resolve(_array);
        },
        (tx, error) => {
          console.log('Error retrieving timers:', error);
          reject(error);
        }
      );
    });
  });
};

// Update a timer
export const updateTimer = (id, name, duration) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE timers SET name = ?, duration = ? WHERE id = ?',
        [name, duration, id],
        (tx, resultSet) => {
          console.log('Timer updated successfully');
          resolve(resultSet);
        },
        (tx, error) => {
          console.log('Error updating timer:', error);
          reject(error);
        }
      );
    });
  });
};

// Delete a timer
export const deleteTimer = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM timers WHERE id = ?',
        [id],
        (tx, resultSet) => {
          console.log('Timer deleted successfully');
          resolve(resultSet);
        },
        (tx, error) => {
          console.log('Error deleting timer:', error);
          reject(error);
        }
      );
    });
  });
};
