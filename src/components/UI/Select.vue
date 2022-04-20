<template>
    <select v-model="modelValue" @change="changeOption">
        <option disabled value="">Сортировка</option>
        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
            >{{option.name}}</option>
    </select>
</template>
<script>
export default {
    name:'custom-select',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
             this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>
<style scoped>
select {
    height: 30px;
    margin: auto 0;
    margin: 20px;
}
</style>