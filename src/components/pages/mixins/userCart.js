import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const userCart = {
    data: () => {
        return {
            cartItems: [],
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
    },
    addToCart (index) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const db = firebase.firestore()
                db.collection("usersCollection").where("userId", "==", user.uid)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(() => {
                        this.products.find((product, ind) => {
                            if(index === ind) {
                            this.cartItems = product
                            db.collection('cartCollections').doc().set({
                                itemId: user.uid,
                                item: this.cartItems
                            })  
                            console.log('Function refresh called! :', this.refresh())
                            }
                        })
                        // console.log('Function refresh called! :', this.refresh())
                    })
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                })
            }
        })
    },
    removeFromCart (index) {
        this.isLoaded = false
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const db = firebase.firestore()
                db.collection("usersCollection").where("userId", "==", user.uid)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(() => {
                        this.cartItems.find((cartItem, ind) => {
                            if (index == ind) {
                                db.collection("cartCollections").where("itemId", "==", user.uid)
                                .get()
                                .then(querySnapshot => {
                                    querySnapshot.forEach(doc => {
                                            if (doc.data().item.id == cartItem.item.id) {
                                                console.log(' Finally deleting docoment  ',(doc.data()))
                                                doc.ref.delete()
                                                this.isLoaded = true
                                                console.log('Function refresh called! :', this.refresh())
                                                this.isLoaded = false
                                            }
                                    })
                                })
                            }
                        })
                    })
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                })
            }
        })            
    },
    refresh () {
        this.cartItems = [],
        this.getCartItems()
    }    
  },
  created () {
    this.getCartItems()
}    
}

export default userCart
