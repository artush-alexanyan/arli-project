<template>
    <div class="main-navbar">
        <div>
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand>NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link 
                    tag="b-nav-item" 
                    to="/"
                >
                    Home
                </router-link>
                <router-link 
                    tag="b-nav-item" 
                    to="/user-dashboard"
                >
                    Dashboard
                </router-link>
                <router-link 
                    tag="b-nav-item" 
                    to="/cart"
                >
                <a class="btn btn-success btn-sm ml-3" v-if="cartItems.length > 0">
                    <i class="fa fa-shopping-cart"></i> 
                        Cart
                    <span class="badge badge-light"> 
                        {{ cartItems.length }} 
                    </span>
                </a>                
                </router-link>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            <router-link 
                    class="btn btn-success" 
                    tag="button" 
                    to="/login"
                    v-if="!isLogged"
                >
                Login
            </router-link>                
                <b-nav-item-dropdown right v-if="isLogged">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em> {{ userName }} </em>
                </template> 
                <b-dropdown-item 
                    style="color: blue;"
                    @click="signout"
                    >
                    Sign Out
                </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>        
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/auth'
import auth from '../auth/mixins/auth.js'
import userActions from '../components/pages/mixins/userActions.js'
import userCart from '../components/pages/mixins/userCart.js'

export default {
    name: 'MainNavbar',
    mixins: [ auth, userActions, userCart ],
    data: () => {
        return {
            userName: 'signin',
            isLogged: false
        }
    },
    created () {
        firebase.auth().onAuthStateChanged(user => {
            this.isLogged = !!user
            if(user) {
                this.userName = user.email
            }else{
                this.userName
            }
        })
    }
}
</script>