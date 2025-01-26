import { Stack, Typography, Button, Box, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useState } from "react";

export default function Task({ tasks }) {
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setcurrentTask] = useState(null);

  function startEdit(task) {
    setcurrentTask(task);
    setEditMode(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setcurrentTask({ ...currentTask, [name]: value });
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:5000/tarefas/${id}`);

  }

  function handleData(createdAt) {
    const data = new Date(createdAt);
    const formatedData = data.toLocaleString('pt-BR', {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    return formatedData;
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/tarefas/${currentTask._id}`, currentTask);
      setEditMode(false);
      setcurrentTask(null);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleEditSubmit}>
          <TextField
            label="Título"
            name="title"
            value={currentTask.title}
            onChange={handleChange}
            variant="outlined"
            size="small"
            margin="dense"
          />
          <TextField
            label="Descrição"
            name="description"
            value={currentTask.description}
            onChange={handleChange}
            variant="outlined"
            size="small"
            margin="dense"
          />
          <Button
            variant="contained"
            type="submit"
            size="small"
            disableElevation
            sx={{ m: 1 }}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setEditMode(false)}
            disableElevation
            sx={{ m: 1 }}
          >
            Cancelar
          </Button>
        </form>
      ) : (
        tasks.map((task) => (
          <Stack key={task._id} direction={"column"} padding={"1rem"} margin={"1rem"}>
            <Box
              sx={{
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9'
              }}>
              <Typography variant="h6" gutterBottom fontWeight={"bold"}>{task.title}</Typography>
              <Typography variant="body1">{task.description}</Typography>
              <Typography variant="body2" fontSize={12}>Criação: {handleData(task.createdAt)}</Typography>
            </Box>

            <Stack direction={"row"} spacing={'1rem'}>
              <Button
                variant="contained"
                size="small"
                color="warning"
                endIcon={<EditIcon />}
                disableElevation
                onClick={() => startEdit(task)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                endIcon={<DeleteIcon />}
                disableElevation
                onClick={() => deleteTask(task._id)}
              >
                Excluir
              </Button>
            </Stack>
          </Stack>
        ))
      )}
    </div>
  );
}
