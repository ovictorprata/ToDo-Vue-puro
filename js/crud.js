const vm = new Vue({
  el: "#app",
  data: {
    tasks: null,
    creatingTask: {
      nome: null,
      modelo: null,
    }
  },
  methods: {
    getTasks(){
      fetch('http://localhost:3000/ativos')
      .then(r => r.json())
      .then(r => this.tasks = r)
    },
    deleteTask(id){
      fetch(`http://localhost:3000/ativos/${id}`, { method: 'DELETE'})
      .then( () => this.getTasks())
      this.status = 'Deleted!'
    },
    createTask(){
      console.log(this.creatingTask)
      fetch(`http://localhost:3000/ativos/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.creatingTask),
      })
      .then(() => this.getTasks())
    },
    updateTask(id){
      fetch(`http://localhost:3000/ativos/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.creatingTask)
      }).then(this.getTasks())
    }
  },
  created(){
    this.getTasks()
  }
})