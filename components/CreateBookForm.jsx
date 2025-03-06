import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState} from 'react'
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
      query Authors {
        authors {
            id
            name
        }
    }
    `;

export default function CreateBookForm() {
    const { data, loading, error } = useQuery(QUERY);


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [Author, setAuthor] = useState("")
    const [publishDate, setPublishDate] = useState("")

    const createBook = (e) => {
        e.preventDefault()
        console.log(title, description, Author, publishDate, data)
    }

    if (loading) {
        return <h2>Loading...</h2>;     
    }

    if (error) {
        console.error(error);
        return <h2>An unexpected error occurred</h2>;
    }

    return <form onSubmit={createBook}>
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
                value={Author}
                label="Author"
                onChange={
                    (e) => setAuthor(e.target.value)
                }
            >
                {data ? data.authors.map((i) => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>):<></>}
                {/* <MenuItem value={1}>JK Rowling</MenuItem>
                <MenuItem value={2}>Jane Austine</MenuItem>
                <MenuItem value={3}>RR Martin 1</MenuItem>
                <MenuItem value={4}>RR Martin 2</MenuItem>
                <MenuItem value={5}>RR Martin 3</MenuItem> */}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>

        <FormControl fullWidth>
            <TextField
            id="outlined-helperText"
            label="Publish Date - DD/MM/YYYY"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>

        <Button type="submit" variant="contained" >Create</Button>
    </form>
    
}