import { useRef } from "react"
import { Button, TextField} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Task from "./Task";

export default function Inputs (){
   
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    const handleSubmit = async()=>{
        const title = titleRef.current.value
        const description = descriptionRef.current.value

        try {
            const response = await axios.post("http://localhost:5000/tarefas", {title, description})

            titleRef.current.value = ''
            descriptionRef.current.value = ''
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="inputs-containers">

            <TextField 
            inputRef={titleRef} 
            label="Título" 
            variant="outlined" 
            size="small"
            helperText="Crie um título curto"
            margin="dense"
            name="title"/>

            <TextField
            inputRef={descriptionRef}
            label="Descrição" 
            variant="outlined"  
            size="small"
            helperText="Faça uma boa descrição"
            margin="dense"
            name="description"
            sx={{m: 1}}/>

            <Button 
            variant="contained"
            size="large"
            sx={{m:1}}
            endIcon={<SendIcon/>}
            disableElevation
            onClick={handleSubmit}>Enviar</Button>
        </div>
    )
}