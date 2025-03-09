import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState, useEffect} from 'react'
import { gql, useMutation } from "@apollo/client";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ADD_AUTHOR_MUTATION = gql`
    mutation AddAuthor($author: AddAuthorInput!) {
        addAuthor(author: $author) {
            name
        }
    }
`;

export default function CreateAuthorForm() {
    const [addAuthor, { loading, error }] = useMutation(ADD_AUTHOR_MUTATION, {onCompleted: () => {window.location.reload()}});

    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [bornDate, setBornDate] = useState(null)
    const [submitStatus, setSubmitStatus] = useState(false)

    useEffect(() => {
        if (name != "" && bio != "" && bornDate != null){
            setSubmitStatus(true)
        }
        else {
            setSubmitStatus(false)
        }
    },[name, bio, bornDate])

    function createAuthor(e){
        e.preventDefault();
        try {
            addAuthor({
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Born Date - DD/MM/YYYY"
                    value={bornDate}
                    onChange={(e) => setBornDate(e)}
                />
            </LocalizationProvider>
        </FormControl>
        

        <br></br>
        <br></br>
        {
            submitStatus? <Button type="submit" variant="contained">Create</Button>
            :
            <Button type="submit" variant="contained" disabled>Create</Button>
        }
    </form>
}