<template>
    <div class="product-list">
            
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">
                    Wellcome
                <h6>
                    <strong>
                        {{ userName }}
                    </strong>                     
                </h6>
                </h1>
                <p class="lead text-muted mb-0">
                    Le Lorem Ipsum est simplement du 
                    faux texte employé dans la composition et la mise en 
                    page avant impression. Le Lorem Ipsum est le faux texte
                    standard de l'imprimerie depuis les années 1500, quand un peintre 
                    anonyme assembla ensemble des morceaux de texte pour réaliser un 
                    livre spécimen de polices de texte...
                </p>
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
                             v-for="(product, index) in pagination" 
                             :key="product.id"
                             >
                            <div class="card">
                                <img class="card-img-top" 
                                     :src="product.image" 
                                     alt="Card image cap">
                                <div class="card-body">
                                    <h6 class="card-title">
                                        <strong> {{ product.title }} </strong>
                                    </h6>
                                    <p class="card-text"> {{ product.price }} </p>
                                    <div class="row">
                                        <!-- <div class="col">
                                            <p class="btn btn-danger btn-block">
                                                $ {{ product.id }} 
                                            </p>
                                        </div> -->
                                        <div class="col">
                                            <button class="btn btn-primary btn-block"
                                                    @click="addToCart(index)" 
                                                    v-if="!product.isAdded"   
                                                > 
                                                Add 
                                            </button>
                                            <button class="btn btn-success btn-block"
                                                    v-if="product.isAdded"                                                   
                                                > 
                                                <i class="fa fa-shopping-cart"></i>   
                                            </button>    
                                            <!-- <h1> {{ product.isAdded }} </h1>                                         -->
                                        </div>
                                        <div class="col">
                                            <router-link to="/" 
                                                         tag="button" 
                                                         class="btn btn-success"
                                                        >
                                                        View
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
        <MainFooter />
       <router-view></router-view>
    </div>    
</template>

<script>
import MainFooter from '../../app-view/MainFooter.vue'
import baseLoader from '../base-components/baseLoader.vue'
import userActions from './mixins/userActions.js'
import userCart from './mixins/userCart.js'
import firebase from 'firebase'
import 'firebase/auth'

export default {
    name: 'productList',
    mixins: [ userActions, userCart ],
    components: { MainFooter, baseLoader },
    data: () => {
        return {
            userName: ''
        }
    },
    created () {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.userName = user.email
            }
        })
    }
}
</script>

<style scoped>
.breadcrumb-item{
    cursor: pointer;
}
</style>