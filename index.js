new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: []
  },
  methods: {
    submitTodo: function(){
      var text_todo = this.newTodo.trim()
      if (text_todo) {
        this.todos.push({ text: text_todo, done: false })
      }
      this.newTodo = ''
    },
    removeTodo: function(i){
      this.todos.splice(i, 1)
    },
    doneTodo: function(i) {
      this.todos[i].done = !this.todos[i].done
    }
  }
})
