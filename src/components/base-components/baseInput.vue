<template>
    <input 
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :label='label'
        @input="$emit('input', $event.target.value)"
    >
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        label: String,
        value: {
            type: String,
            requred: true
        }
    }
}
</script>