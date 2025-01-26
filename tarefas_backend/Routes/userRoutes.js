const express = require("express")
const router = express.Router()
const {showTasks, createTask, deleteTask, updateTask} = require("../controllers/tasksController")
const validateTask = require("../middlewares/validateTask")
const validateId = require("../middlewares/validateID")

//para ver as tasks
router.get('/tarefas', showTasks)

//rota para criar uma nova task
router.post("/tarefas", validateTask, createTask)

//rota para atualizar informações da task com base no id
router.patch("/tarefas/:id", validateId, updateTask )

//rota para deletar task pelo id
router.delete('/tarefas/:id', validateId, deleteTask)


module.exports = router