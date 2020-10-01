import  firebase  from "firebase";

const userActions = {
    data: () => {
        return {
            products: [],
            pagination: [],
            page: 0,
            perPage: 3,
            isLoaded: false,
            cartItems: null,
            val: '',
            isAlerted: false            
        }
    },
    computed: {
        getPages () {
            return Math.ceil(this.products.length / this.perPage)
        }
    },
    mounted () {
        this.getProducts()
        this.addToCart()
    },
    methods: {
        getProducts () {
            this.isLoaded = true
            firebase.firestore().collection("productList").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.products.push(doc.data())
                    this.isLoaded = false
                    this.changePage()
                })
            })
        },
        changePage (index = 0) {
            this.isLoaded = true
            this.page = index
            let start = index * this.perPage
            this.pagination = this.products.slice(start,  start + this.perPage)
            this.isLoaded = false
        },
        onNext () {
            if (this.page >= 0 && this.page < this.getPages - 1) {
                this.page++
                let start = this.page * this.perPage
                this.pagination = this.products.slice(start ,  start + this.perPage)
            }
        },
        onPrevious () {
            if (this.page > 0) {
                this.page--
                let start = this.page * this.perPage
                this.pagination = this.products.slice(start ,  start + this.perPage)
            }
        },
        addToCart (index) {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    const db = firebase.firestore()
                    db.collection("usersCollection").where("userId", "==", user.uid)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log('Doc ', doc)
                            this.products.find((product, ind) => {
                                if(index === ind) {
                                console.log('Product ', product)
                                console.log('ind ', ind)
                                this.cartitem = product
                                db.collection('cartCollections').doc().set({
                                    id: ind,
                                    itemId: user.uid,
                                    item: this.cartitem
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
        removeFromCart (index) {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    const db = firebase.firestore()
                    db.collection("usersCollection").where("userId", "==", user.uid)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log('Doc ', doc)
                            this.products.find((product, ind) => {
                                if(index === ind) {
                                console.log('Product ', product)
                                console.log('ind ', ind)
                                this.cartitem = product
                                db.collection('cartCollections').doc().delete()
                                .then(() => {
                                    console.log('Deleted!')
                                })                         
                                }
                            })
                        })
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error)
                    })
                }
            })            
        }
    }
}
// db.collection("cities").doc("DC").delete().then(function() {
//     console.log("Document successfully deleted!")
// }).catch(function(error) {
//     console.error("Error removing document: ", error)
// })  
export default userActions