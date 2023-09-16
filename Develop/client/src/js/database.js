import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
  console.log('put into database');

  //create connection to database
  const db = await openDB('jate', 1);
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

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  console.log('get from database');

  //create connection to database
  const db = await openDB('jate', 1);
  //create transaction
  const tx = db.transaction('jate', 'readonly');
  //create object store
  const store = tx.objectStore('jate');
  //get method to store and pass in content
  const request = store.getAll();
  //wait for transaction to complete
  const result = await request;
  //log result
  console.log(result.value, result);
  return result;


};
initdb();
