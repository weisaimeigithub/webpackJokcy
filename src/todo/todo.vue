<template>
    <section class="real-app">
        <input type="text" class="add-input"
             autofocus="autofocus"
             placeholder="接下去要做什么？"
             @keyup="addTodo"
        >
        <item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" />
        <tabs  :filter="filter"   :todos = 'todos' @toggle="toggleFilter"  @clearAllCompleted = "clearAllCompleted"></tabs>
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id=0
export default {
    data(){
        return{
            todos:[
               {
                id:0,
                content:'this is todo',
                completed:false,
               }
            ],

            filter:'all'
        }
    },
    components:{
        Item,
        Tabs
    },

    computed:{
        filteredTodos(){
            if(this.filter === 'all'){
                return this.todos
            }

            const completed = this.filter === 'completed'
            return  this.todos.filter(todos => completed === todo.completed)
        }
    },
    methods:{
        addTodo(e){
            this.todos.unshift({
                id:id++,
                content:e.target.value.trim(),
                completed:false
            })
            e.target.value = ''
        },
            
        // javascript的函数式写法
        deteleTodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id))
        },

        toggleFilter(state){
            this.filter = state;
        },
        
        clearAllCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
  
    }
}
</script>