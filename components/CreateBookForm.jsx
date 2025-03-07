import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState} from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";

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
    const [publishDate, setPublishDate] = useState("")

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