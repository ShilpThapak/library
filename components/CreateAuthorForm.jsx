import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState} from 'react'
import { gql, useMutation } from "@apollo/client";

const ADD_AUTHOR_MUTATION = gql`
    mutation AddAuthor($author: AddAuthorInput!) {
        addAuthor(author: $author) {
            name
        }
    }
`;

export default function CreateBookForm() {
    const [addTodo, { data, loading, error }] = useMutation(ADD_AUTHOR_MUTATION);

    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [bornDate, setBornDate] = useState("")

    function createAuthor(e){
        e.preventDefault();
        try {
            addTodo({
                variables: {
                    author : {"name": name, "biography": bio, "born_date": bornDate}
                }
            })
        }
        catch(error) {
            console.log(error, loading, data)
        }
    }

    if (loading) {
        return <h2>Submitting...</h2>;     
    }

    if (error) {
        console.error(error);
        return <h2>Submission error: {error}</h2>;
    }

    return <form onSubmit={createAuthor}>
        <Typography variant="h6" >
            Create a new Author:
        </Typography>

        <br></br>

        <FormControl fullWidth>
            <TextField
                id="outlined-helperText"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>

        <FormControl fullWidth>
            <TextField
            id="outlined-multiline-static"
            label="Biograpghy"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>

        <FormControl fullWidth>
            <TextField
            id="outlined-helperText"
            label="Publish Date - DD/MM/YYYY"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>

        <Button type="submit" variant="contained" >Create</Button>
    </form>
}