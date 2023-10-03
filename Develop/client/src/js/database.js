import { openDB } from 'idb';

const initdb = async () =>{
  return openDB('jate', 2, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    }
  });
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  //create connection to database
  const db = await initdb();
  //create transaction
  const tx = db.transaction('jate', 'readwrite');
  //create object store
  const store = tx.objectStore('jate');
  //put method to store and pass in content
  const request = store.put({ id: 1, value: content });
  //wait for transaction to complete
  const result = await tx.complete;
  //log result
  console.log('data successfully added to database!', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {

  //create connection to database
  const db = await initdb();
  //create transaction
  const tx = db.transaction('jate', 'readonly');
  //create object store
  const store = tx.objectStore('jate');
  //wait for transaction to complete
  const result = await store.getAll();
  //log result
  console.log(result);
  return result;


};
initdb();
