import { useEffect, useState } from "react";
import axios from "axios";
import Inputs from "./Inputs"
import { Container, Typography } from "@mui/material"
import Task from "./Task"

export default function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTask = async () => {
        try {
        const response = await axios.get('http://localhost:5000/tarefas');
        setTasks(response.data.tasks);

        setLoading(false);
        } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
        }
    };

    useEffect(() => {
        getTask();
    });

    if (loading) {
        return <Typography variant="h6">Carregando...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Erro: {error}</Typography>;
    }

    return (    
        <Container>
            <Typography variant="h4"> Lista de tarefas</Typography>
            <Inputs/>
            <Task tasks= {tasks}/>
        </Container>
    )
}