import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const userCart = {
    data: () => {
        return {
            cartItems: []
        }
    },
    methods: {
        getCartItems () {
            const db = firebase.firestore()
            const auth = firebase.auth()
            auth.onAuthStateChanged(user => {
                if(user) {
                    db.collection('cartCollections').where("itemId", "==", user.uid)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log('Cart ', doc.data())
                            this.cartItems.push(doc.data())
                        })
                    })
                }
            })
        }
    },
    created () {
        this.getCartItems()
    }    
}

export default userCart
