import  firebase  from "firebase"

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
            docData: []            
        }
    },
    computed: {
        getPages () {
            return Math.ceil(this.products.length / this.perPage)
        }
    },
    mounted () {
        this.getProducts()
    },
    methods: {
        getProducts () {
            this.isLoaded = true
            firebase.firestore().collection("productList").orderBy('title').get().then(querySnapshot => {
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
        }
    }
}

export default userActions