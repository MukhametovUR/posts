<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
       <transition-group name="list" tag="p">
        <PostItem 
            v-for="post in posts" 
            :key="post.id"
            :post="post"
            @remove="$emit('remove',post)"
            />
       </transition-group>
    </div>
    <div v-else>Список пуст</div>
</template>
<script>
import PostItem from '@/components/PostItem'
export default {
    components:{
        PostItem
    },
    props:{
        posts: {
            type:Array,
            required:true
        }
    },
}
</script>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>