<template>
    <div>
        <form @submit.prevent>
            <h4>Новый пост</h4>
            <custom-input
                v-model="post.title"
                type="text" 
                placeholder="Название"
            />
            <custom-input
                v-model="post.body"
                type="text" 
                placeholder="Описание"
            />
            <custom-button
                class="btn__form"
                @click="createPost"
            >
            Создать</custom-button>
        </form>
    </div>
</template>
<script>
export default {

    data(){
        return {
            post: {
                title:'',
                body:''
            }
        }
    },
    methods: {
        createPost() {        
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post= {
                title: '',
                body: '',
                }
          }      
    },
}
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
}
.btn__form {
    align-self:flex-end
}
</style>