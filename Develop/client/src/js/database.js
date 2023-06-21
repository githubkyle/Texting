import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    }
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async content => {
  const dbRequest = indexedDB.open("jate", 1);
  dbRequest.onerror = event => {
    console.error("Error opening the database:", event.target.error);
  };

  dbRequest.onupgradeneeded = event => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("jate", {
      keyPath: "id",
      autoIncrement: true
    });
  };

  dbRequest.onsuccess = event => {
    const db = event.target.result;

    const transaction = db.transaction("jate", "readwrite");
    const objectStore = transaction.objectStore("jate");

    const addRequest = objectStore.add(content);

    addRequest.onsuccess = () => {
      console.log("Content added to jate successfully!");
    };

    addRequest.onerror = event => {
      console.error("Error adding content to jate:", event.target.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  };
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("jate", 1);

    dbRequest.onerror = event => {
      reject(new Error("Error opening the database: " + event.target.error));
    };

    dbRequest.onsuccess = event => {
      const db = event.target.result;

      const transaction = db.transaction("jate", "readonly");
      const objectStore = transaction.objectStore("jate");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        const content = getAllRequest.result;
        resolve(content);
      };

      getAllRequest.onerror = event => {
        reject(
          new Error("Error retrieving content from jate: " + event.target.error)
        );
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

initdb();
