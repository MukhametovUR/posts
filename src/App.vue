<template>
    <div class="app">
       <div class="btns">
           <custom-button 
            @click="showDialog"
            v-if="this.posts.length > 0"
       >Создать пост
       </custom-button>
        <custom-button 
            v-show="!this.posts.length > 0"
            @click="fetchPosts"
            class="download"
       >Загрузить
       </custom-button>
       <custom-select
            v-if="this.posts.length > 0"
            v-model="selectedSort"
            :options="sortOptions"
       ></custom-select>
       </div>
       <custom-dialog 
            v-model:show="dialogVisible">
           <PostForm @create="createPost" />
       </custom-dialog>
       <PostList 
        :posts="posts"
        @remove="removePost"
        />
            <div class="pagination" v-show="this.posts.length > 0">
                <div class="pagination-item"
                    @click="begin">
                        <img src="/double__left.png" alt="double__left">
                    </div>
                <div class="pagination-item"
                    @click="prev"> 
                        <img src="/left.png" alt="left">
                </div>
                <div class="pagination-item"
                    > {{ page }} </div>
                <div class="pagination-item"
                    @click="next">
                        <img src="/right.png" alt="right">
                </div>  
                <div class="pagination-item"
                     @click="end">
                        <img src="/double_right.png" alt="double_right">
                </div>         
    </div>
    </div>
    
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

import axios from 'axios';
export default {
    components:{
        PostList,
        PostForm
    },
  data(){
      return {
            posts: [],
            dialogVisible:false,
            selectedSort:'',
            sortOptions: [
                {value:'title', name:'По названию'},
                {value:'body', name:'По описанию'}
            ],
            page:1,
            limit:10,
            totalPages: 0
      }
  },
  methods: {
      createPost(post) {
          this.posts.push(post);
          this.dialogVisible = false;
      },
      removePost(post) {
          if(confirm('Подтверждение удаление поста')){
               this.posts = this.posts.filter(item => item.id != post.id)

          }
      },
      showDialog() {
          this.dialogVisible  = true;
      },
      changePage(pageNumber) {
          this.page = pageNumber;
          this.fetchPosts()
      },
      next() {
          if(this.page < this.limit){
           this.page++
           this.fetchPosts()
          }
      },
      prev() {
          if(this.page > 1){
           this.page--
           this.fetchPosts()
          }
      },
      begin() {
           this.page = 1
           this.fetchPosts()
      },
        end() {
           this.page = this.limit
           this.fetchPosts()
      },
      async fetchPosts() {
          try {
              const response = await axios.get
              ('https://jsonplaceholder.typicode.com/posts',{
              params: {
                  _page: this.page,
                  _limit: this.limit
                }
              });
              this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
              this.posts = response.data
          }catch(e){
              alert('Ошибка')
          }
      }
  },
  watch: {
      selectedSort(newValue) {
          this.posts.sort((post1, post2) => {
              return post1[newValue]?.localeCompare(post2[newValue])
          })
      },
  }
}
</script>
<style>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    padding: 20px;
    margin: 0 30%;
    display: flex;
}
.btns {
    display: flex;
    margin:15px 0;
    justify-content: space-between;
    align-items: center;
}


.page {
    border:1px solid;
    padding: 10px;
}
.current-page {
    border:2px solid red;
}
.pagination {
    display: flex;
    margin-top: 15px;
    justify-content: center;
}
.pagination-item {
    margin-right: 10px;
}
.pagination-item img {
    height: 20px;
}
</style>