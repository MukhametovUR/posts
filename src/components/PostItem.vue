<template>
    <div class="post">
            <div>
                <div><strong>Статья:</strong>{{post.id}}</div>
                <div><strong>Заголовок:</strong>{{post.title}}</div>
                <div v-show="showBody"><strong>Текст:</strong>{{post.body}}</div>
                <custom-button
                    v-show="!showBody" 
                    @click="showText">
                Полный текст</custom-button>
            </div>
            <div class="post__btns">
                <a  class="btn-del" 
                    @click="$emit('remove',post)">
                    <img src="/delete.svg" alt="2" class="delete">
                </a>
            </div>
    </div>
</template>  
<script>

export default {
    props:{
        post: {
            type: Object,
            required:true
        }
    },
    data(){
        return{
            showBody:false
        }
    },
    methods: {
        showText() {
            this.showBody = true 
        }
    }
    
}
</script>
<style scoped>
.post {
    padding: 10px;
    margin-top: 10px;
    display: flex;
    align-self: center;
    justify-content: space-between;
}
.delete {
    height: 20px;
}
</style>