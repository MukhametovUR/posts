<template>
    <div>
        <button class="btn">
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {
    name:'custom-button'
}
</script>
<style scoped>
.btn {
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color:blue;
    border: 1px solid blue;
    border-radius: 5px;
}     
</style>