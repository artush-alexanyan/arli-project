<template>
    <div class="add">
        <div class="container">
            <h4 class="text-center text-primary mt-3">
                Add new product
            </h4>
        <b-row>
            <b-col>
            <b-form>
                <label>Product id</label><br>
                <baseInput 
                    class="mt-2"
                    placeholder="id"
                    label='Product id'
                    type="number"
                    v-model="product.id"
                /><br>
                <label class="mt-3">Product title</label><br>
                <baseInput 
                    class="mt-2"
                    placeholder="title"
                    label='Product title'
                    type="text"
                    v-model="product.title"
                /><br>
                <label class="mt-3">Product price</label><br>
                <baseInput 
                    class="mt-2"
                    placeholder="price"
                    label='Product price'
                    type="number"
                    v-model="product.price"
                /><br>
                <label class="mt-3">Product description</label><br>
                <baseInput 
                    class="mt-2"
                    placeholder="description"
                    label='Product description'
                    type="text"
                    v-model="product.description"
                /><br>
                <label class="mt-3">Product image</label><br>
                <baseInput 
                    class="mt-2"
                    placeholder="image"
                    label='Product image'
                    type="text"
                    v-model="product.image"
                />                                                                  
            </b-form> 
            <b-row class="mt-5">
                <b-col>
                    <baseButton
                         @click="reset"
                         variant="success"
                         class="mr-5"
                        >
                        Reset
                    </baseButton>   
                    <baseButton
                         @click="add"
                         variant="primary"
                        >
                        Save
                    </baseButton>                                    
                </b-col>
            </b-row>               
            </b-col>
        </b-row>
        </div>
        <h1 class="text-center"> {{ product.count }} </h1>
    </div>
</template>

<script>
import baseInput from '../components/base-components/baseInput.vue'
import baseButton from '../components/base-components/baseButton.vue'
import firebase from 'firebase'

export default {
    name: 'addProduct',
    components: { baseInput, baseButton },
    data: () => {
        return {
            product: {
                count: 0,
                id: '',
                title: '',
                price: '',
                description: '',
                image: '',
                isAdded: false
            }
        }
    },
    methods: {
        reset () {
            this.product.id = ''
            this.product.title = ''
            this.product.price = ''
            this.product.description = ''
            this.product.image = ''
        },
        add () {
            this.product.count++
            firebase.firestore().collection('productList').doc().set({
                id: this.product.id,
                title: this.product.title,
                price: this.product.price,
                description: this.product.description,
                image: this.product.image,
                isAdded: false
            })
            .then(() => {
                console.log('Product added successfuly!')
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
}
</script>