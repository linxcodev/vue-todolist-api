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
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
      this.newTodo = ''
    },
    removeTodo: function(i){
      this.todos.splice(i, 1)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    doneTodo: function(i) {
      this.todos[i].done = !this.todos[i].done
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  },
  mounted: function() {
    this.todos = JSON.parse(localStorage.getItem('todos'))
  }
})
