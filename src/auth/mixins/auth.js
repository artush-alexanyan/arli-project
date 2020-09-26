import * as firebase from 'firebase/app'
import 'firebase/auth'

const user = {
    data: () => {
        return {
            userData: {
                email: null,
                password: null,
                userProduct: ['Hello', 'Hello again'],
                userCartItem: null
            },
            error: [],
            currentUserName: 'sign in'
        }
    },
    methods: {
        register () {
            firebase
            .auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password)
                .then(response => {
                    console.log(response)
                    console.log('User Id', response.user.uid)
                // Add a new user document in collection "usersCollection"
                firebase.firestore().collection('usersCollection').doc(response.user.uid).set({
                    userId: response.user.uid,
                    userEmail: response.user.email,
                    userProduct: this.userData.userProduct,
                })
                .then(() => {
                    this.$router.push({ name: 'userDashboard' })
                    console.log("Document successfully written!");
                    console.log('IDiiii ', response.user.uid)
                })                 
                })
                .catch(error => {
                    console.log('Eroor ', error.message)
                    this.error = error.message
                })
        },
        login () {
            firebase
            .auth().signInWithEmailAndPassword(this.userData.email, this.userData.password)
                .then(response => {
                    console.log('Logged in as:', response.user.email)
                    this.$router.push({ name: 'userDashboard' })
                })
                .catch(error => {
                    this.error = error.message
                })
        },
        signout () {
            firebase
            .auth().signOut().then(() => {
                alert('Signed out!')
                this.$router.push({ name: 'Login' })
            })
        }
    }
}

export default user