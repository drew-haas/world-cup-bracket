import firebase from 'firebase'
// import 'firebase/auth'
// import 'firebase/firestore'

// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyBxOybl1InZOVq0Pzg6SRVpj8kjxfLRvns",
    authDomain: "world-cup-bracket-35f1b.firebaseapp.com",
    projectId: "world-cup-bracket-35f1b",
    storageBucket: "world-cup-bracket-35f1b.appspot.com",
    messagingSenderId: "180181053728",
    appId: "1:180181053728:web:4937cb83780a4a1f21e745",
    measurementId: "G-G61BKFH8R9"
}

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database()
const auth = firebase.auth()

// collection references
// const usersCollection = db.collection('users')
// const groupsCollection = db.collection('groups')

// export utils/refs
export {
  db,
  auth,
//   usersCollection
//   groupsCollection
}