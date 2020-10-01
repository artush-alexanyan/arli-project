<template>
    <div class="cart">
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">E-COMMERCE CART</h1>
            </div>
        </section>

        <div class="container mb-4">
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"> </th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Available</th>
                                    <th scope="col" class="text-center">Quantity</th>
                                    <th scope="col" class="text-right">Price</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in cartItems"
                                    :key="item.id"
                                        >
                                    <td><img :src="item.item.image" /> </td>
                                    <td> {{ item.item.title }} </td>
                                    <td> {{ item.item.description }} </td>
                                    <td>
                                        <baseInput
                                            placeholder="0" 
                                            class="form-control" 
                                            type="number" 
                                            v-model="val" 
                                            style="width:"
                                        />
                                    </td>
                                    <td class="text-right"> $ {{ item.item.price }} </td>
                                    <td class="text-right"><button class="btn btn-sm btn-danger" @click="removeFromCart(index)"><i class="fa fa-trash"></i> </button> </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Total</strong></td>
                                    <td class="text-right"><strong>346,90 €</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col mb-2">
                    <div class="row">
                        <div class="col-sm-12  col-md-6">
                            <button class="btn btn-block btn-light"
                            >
                            Continue Shopping
                            </button>
                        </div>
                        <div class="col-sm-12 col-md-6 text-right">
                            <button 
                                class="btn btn-lg btn-block btn-success text-uppercase"
                            >
                            Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import baseInput from '../base-components/baseInput.vue'
import userActions from '../pages/mixins/userActions.js'
import userCart from '../pages/mixins/userCart.js'

export default {
    name: 'Cart',
    mixins: [ userActions, userCart ],
    components: { baseInput },

}
</script>

<style scoped>
/*
** Style Simple Ecommerce Theme for Bootstrap 4
** Created by T-PHP https://t-php.fr/43-theme-ecommerce-bootstrap-4.html
*/
.bloc_left_price {
    color: #c01508;
    text-align: center;
    font-weight: bold;
    font-size: 150%;
}
.category_block li:hover {
    background-color: #007bff;
}
.category_block li:hover a {
    color: #ffffff;
}
.category_block li a {
    color: #343a40;
}
.add_to_cart_block .price {
    color: #c01508;
    text-align: center;
    font-weight: bold;
    font-size: 200%;
    margin-bottom: 0;
}
.add_to_cart_block .price_discounted {
    color: #343a40;
    text-align: center;
    text-decoration: line-through;
    font-size: 140%;
}
.product_rassurance {
    padding: 10px;
    margin-top: 15px;
    background: #ffffff;
    border: 1px solid #6c757d;
    color: #6c757d;
}
.product_rassurance .list-inline {
    margin-bottom: 0;
    text-transform: uppercase;
    text-align: center;
}
.product_rassurance .list-inline li:hover {
    color: #343a40;
}
.reviews_product .fa-star {
    color: gold;
}
.pagination {
    margin-top: 20px;
}
footer {
    background: #343a40;
    padding: 40px;
}
footer a {
    color: #f8f9fa!important
}

</style>