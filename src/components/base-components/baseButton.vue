<template>
     <b-button 
        @click="$emit('click', $event)"
        :variant="variant"
        >
         <slot></slot>
     </b-button>
</template>

<script>
export default {
    name: 'baseButton',
    props: {
        variant: {
            type: String,
            required: true
        }
    }
}
</script>