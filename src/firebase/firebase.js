import firebase from 'firebase'
import  'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBbBW4SATJLCQWpnRyfncHlPMtHUTPxBdI",
    authDomain: "arli-project.firebaseapp.com",
    databaseURL: "https://arli-project.firebaseio.com",
    projectId: "arli-project",
    storageBucket: "arli-project.appspot.com",
    messagingSenderId: "773157600644",
    appId: "1:773157600644:web:fad52f2a478cdff56071d1"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  //Utils
  const db = firebase().firestore()
  const auth = firebase.auth()

  //Collections
  const userCollection = db.collection('users')
  const productCollection = db.collection('products')
  const commentCollection = db.collection('comments')
  const likeCollection = db.collection('likes')

  export default {
    db,
    auth,
    userCollection,
    productCollection,
    commentCollection,
    likeCollection
  }