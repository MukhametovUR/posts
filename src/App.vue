<template>
    <div class="app">
       <div class="btns">
           <custom-button 
            @click="showDialog"
       >Создать пост
       </custom-button>
        <custom-button 
            @click="fetchPosts"
       >Загрузить
       </custom-button>
       <custom-select
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
        <div class="page__wrapper">
        <div 
            v-for="pageNumber in totalPages" 
            :key="pageNumber" 
            class="page"
            :class="{
                'current-page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
            >{{pageNumber}}</div>
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
          this.posts = this.posts.filter(item => item.id != post.id)
      },
      showDialog() {
          this.dialogVisible  = true;
      },
      changePage(pageNumber) {
          this.page = pageNumber;
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
}
.btns {
    display: flex;
    margin:15px 0;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border:1px solid;
    padding: 10px;
}
.current-page {
    border:2px solid red;
}
</style>