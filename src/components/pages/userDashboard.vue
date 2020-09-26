<template>
    <div class="product-list">
            
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">Wellcome to user page</h1>
                <p class="lead text-muted mb-0">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte...</p>
            </div>
        </section>
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <router-link 
                                to="/" 
                                tag="li" 
                                class="breadcrumb-item"
                            >Home
                            </router-link>
                            <router-link 
                                to="/" 
                                tag="li" 
                                class="breadcrumb-item"
                            >About
                            </router-link>
                            <router-link 
                                to="/" 
                                tag="li" 
                                class="breadcrumb-item"
                            >About Home
                            </router-link>                                                        
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-3">
                    <div class="card bg-light mb-3">
                        <div class="card-header bg-primary text-white text-uppercase"><i class="fa fa-list"></i> Categories</div>
                        <ul class="list-group category_block">
                            <li class="list-group-item"><a href="category.html">Cras justo odio</a></li>
                            <li class="list-group-item"><a href="category.html">Dapibus ac facilisis in</a></li>
                            <li class="list-group-item"><a href="category.html">Morbi leo risus</a></li>
                            <li class="list-group-item"><a href="category.html">Porta ac consectetur ac</a></li>
                            <li class="list-group-item"><a href="category.html">Vestibulum at eros</a></li>
                        </ul>
                    </div>
                    <div class="card bg-light mb-3">
                        <div class="card-header bg-success text-white text-uppercase">Last product</div>
                        <div class="card-body">
                            <img class="img-fluid" src="https://dummyimage.com/600x400/55595c/fff" />
                            <h5 class="card-title">Product title</h5>
                            <p class="card-text">
                                    Some quick example text to build on the card 
                                    title and make up the bulk of the card's content.
                            </p>
                            <p class="bloc_left_price">99$</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex justify-content-center mt-5" v-if="isLoaded">
                       <h6 class="mr-3">Loading products...</h6> 
                       <baseLoader />
                    </div>                    
                    <div class="row" v-if="!isLoaded">
                        <div class="col-12 col-md-6 col-lg-4" 
                             v-for="product in pagination" 
                             :key="product.id"
                             >
                            <div class="card">
                                <img class="card-img-top" 
                                     :src="product.thumbnailUrl" 
                                     alt="Card image cap">
                                <div class="card-body">
                                    <h6 class="card-title">
                                        <strong> {{ product.title }} </strong>
                                    </h6>
                                    <p class="card-text"> {{ product.id }} </p>
                                    <div class="row">
                                        <!-- <div class="col">
                                            <p class="btn btn-danger btn-block">
                                                $ {{ product.id }} 
                                            </p>
                                        </div> -->
                                        <div class="col">
                                            <a class="btn btn-primary btn-block"> 
                                                Add 
                                            </a>
                                        </div>
                                        <div class="col">
                                            <router-link to="/" 
                                                         tag="button" 
                                                         class="btn btn-success"
                                                        >View
                                            </router-link>                                        
                                        </div>      
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <li class="page-item mt-3 mr-1"
                                       :class="[page > 0 ? 'active' : '']"
                                        >
                                        <button class="page-link"
                                                @click="onPrevious"
                                        >
                                        Previous
                                         </button>
                                    </li>                                     
                                    <li class="page-item mt-3 mr-1"
                                        :class="[page === index? 'active' : '']"  
                                        v-for="(n, index) in getPages" 
                                        :key="n.id"
                                        >
                                        <button class="page-link"
                                                @click="changePage(index)"
                                        >
                                         {{ index + 1 }} 
                                         </button>
                                    </li>
                                    <li class="page-item mt-3 mr-1"
                                        :class="[page < getPages - 1 ? 'active' : '']"                                    
                                        >
                                        <button class="page-link"
                                                @click="onNext()"
                                        >
                                        Next
                                         </button>
                                    </li>                                    
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Footer -->
        <MainFooter />
       <router-view></router-view>
    </div>    
</template>

<script>
// import axios from 'axios'
import MainFooter from '../../app-view/MainFooter.vue'
import baseLoader from '../base-components/baseLoader.vue'

export default {
    name: 'productList',
    components: { MainFooter, baseLoader },
    data: () => {
        return {
            products: [],
            pagination: [],
            page: 0,
            perPage: 3,
            isLoaded: false
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
            fetch('https://jsonplaceholder.typicode.com/photos?_limit=12')
                .then(response => response.json())
                .then(json => {
                    this.products = json;
                    this.isLoaded = false
                    this.changePage()
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
</script>

<style scoped>
.breadcrumb-item{
    cursor: pointer;
}
</style>