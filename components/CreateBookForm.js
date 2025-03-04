import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState} from 'react'

export default function CreateBookForm() {
    const age = 20
    const handleChange = () => {}
    const [title, setTitle] = useState("Title")
    const [description, setDescription] = useState("Description")
    const [AuthorID, setAuthorID] = useState()
    const [publishDate, setPublishDate] = useState("DD/MM/YYYY")


    return <form>
        <Typography variant="h6" >
            Create a new Book:
        </Typography>

        <br></br>

        <FormControl fullWidth>
            <TextField
                id="outlined-helperText"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>
        
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Author</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Author"
                onChange={handleChange}
            >
                <MenuItem value={10}>JK Rowling</MenuItem>
                <MenuItem value={20}>Jane Austine</MenuItem>
                <MenuItem value={30}>RR Martin</MenuItem>
            </Select>
        </FormControl>

        <br></br>
        <br></br>

        <FormControl fullWidth>
            <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue="Description"
            />
        </FormControl>

        <br></br>
        <br></br>

        <FormControl fullWidth>
            <TextField
            id="outlined-helperText"
            label="Publish Date"
            defaultValue="DD/MM/YYYY"
            // helperText="Title"
            />
        </FormControl>

        <br></br>
        <br></br>

        <Button type="submit" variant="contained">Create</Button>
    </form>
    
}