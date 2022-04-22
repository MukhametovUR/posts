<template>
    <div class="post">
            <div class="post-item">
               <div class="post-item__content">
                    <div><strong>Статья:</strong>{{post.id}}</div>
                    <div><strong>Заголовок:</strong>{{post.title}}</div>
                    <div v-show="showBody"><strong>Текст:</strong>{{post.body}}</div>

               </div>
               <div class="post__btns">
                <a  class="btn-del" 
                    @click="$emit('remove',post)">
                    <img src="/delete.svg" alt="2" class="delete">
                </a>
            </div>
            </div>            
             <custom-button class="show-text"
                    v-show="!showBody" 
                    @click="showText">
                Полный текст</custom-button>
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
    flex-direction: column;
-webkit-box-shadow: 7px -1px 45px -19px rgba(0, 0, 0, 0.18);
-moz-box-shadow: 7px -1px 45px -19px rgba(0, 0, 0, 0.18);
box-shadow: 7px -1px 45px -19px rgba(0, 0, 0, 0.18);
}
.post-item {
    display: flex;
    justify-content: space-between;
}
.post-item__content {
    flex-direction: column;
}
.post__btns {
    align-items: center;
}
.delete {
    height: 20px;
}
.show-text {
    display: flex;
    justify-content: center;
}
</style>