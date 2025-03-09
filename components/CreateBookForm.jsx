import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const GET_AUTHORS_QUERY = gql`
      query Authors {
        authors {
            authors {
                id
                name
            }
        }
    }
`;

const ADD_BOOK_MUTATION = gql`
    mutation Mutation($book: AddBookInput!) {
        addBook(book: $book) {
            title
        }
    }
`;

export default function CreateBookForm() {

    const { data: authorsData, loading: authorsLoading, error: authorsError } = useQuery(GET_AUTHORS_QUERY);
    const [addBook, 
        { data: addBookData, loading: addBookLoading, error: addBookError }
    ] = useMutation(ADD_BOOK_MUTATION, {onCompleted: () => {window.location.reload()}});


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [publishDate, setPublishDate] = useState(null)
    const [submitStatus, setSubmitStatus] = useState(false)
    
    useEffect(() => {
        if (title != "" && description != "" && publishDate != null && author != ""){
            setSubmitStatus(true)
        }
        else {
            setSubmitStatus(false)
        }
    },[title, description, publishDate, author])

    const createBook = (e) => {
        e.preventDefault()
        console.log(title, description, author, publishDate, authorsData)
        addBook({
            variables: {
                "book": {
                    "author_id": parseInt(author),
                    "description": description,
                    "published_date": publishDate,
                    "title": title
                }  
            }
        })
    }

    if (authorsLoading) {
        return <h2>Loading...</h2>;     
    }

    if (authorsError) {
        console.error(error);
        return <h2>An unexpected error occurred. {error}</h2>;
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
                value={author}
                label="Author"
                onChange={
                    (e) => setAuthor(e.target.value)
                }
            >
                {authorsData ? authorsData.authors.authors.map((i) => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>):<MenuItem value={0}>Null</MenuItem>}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Publish Date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e)}
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