
const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv')
const moment = require('moment')
// Required for side-effects
require("firebase/firestore");
const { getFirestore, collection, addDoc, getDocs, doc, setDoc} = require("firebase/firestore");

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

async function initFirebase() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db
}

async function getUsersData(callback) {
    // Getting firestore connection
    const db = await initFirebase();

    const col = collection(db, 'users')
    const weatherSnapshot = await getDocs(col)
    const userList = weatherSnapshot.docs.map(doc => doc.data());
    console.log(userList)
    callback(userList);

}
async function storeWeatherData(weatherData, callback){ 
    const db = await initFirebase();
    await setDoc(doc(db, "weather", moment().format("YYYY-MM-DD")), weatherData)
    .then(() => {
        callback(true)
    })
    .catch((err) => {
        callback(false, err)
    })
    // await addDoc(collection(db, 'weather'), weatherData)
    // .then(() => {
    //     callback(true)
    // })
    // .catch((err) => {
    //     callback(false, err)
    // })
}




module.exports = {getUsersData, storeWeatherData};




