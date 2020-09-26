<template>
    <input 
        :value="value"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
    >
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        value: {
            type: String,
            requred: true
        }
    }
}
</script>