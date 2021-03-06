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
        // Send a POST request
        axios({
          method: 'POST',
          url: 'api/index.php',
          data: {
            text: text_todo,
            done: 0
          }
        }).then(response => {
          var _this = this
          _this.todos.push(response.data)
        });
        // localStorage.setItem('todos', JSON.stringify(this.todos))
      }
      this.newTodo = ''
    },
    removeTodo: function(i, id){
      axios({
        method:'DELETE',
        url:'api/index.php?id=' + id
      })
        .then((response) => {
           this.todos.splice(i, 1)
        });
      // localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    doneTodo: function(i, todo) {
      todo.done = !todo.done
      
      axios({
        method:'PATCH',
        url:'api/index.php?id=' + todo.id + '&done=' + todo.done
      })
      // localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  },
  mounted: function() {
    axios({
      method:'GET',
      url:'api/index.php'
    })
      .then((response) => {
        response.data.forEach((v, i) => {
          response.data[i].done = parseInt(response.data[i].done)
        })
         this.todos = response.data
      });
    // this.todos = JSON.parse(localStorage.getItem('todos'))
  }
})
