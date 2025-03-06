import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'

const GET_AUTHORS_QUERY = gql`
      query Authors {
        authors {
            id
            name
        }
    }
`;

const GET_BOOK_QUERY = gql`
    query Book($bookId: ID!) {
        book(id: $bookId) {
            id
            title
            description
            author {
                id
                name
            }
            published_date
        }
    }
`

const EDIT_BOOK_MUTATION = gql`
    mutation EditBook($editBookId: ID!, $edits: EditBookInput) {
        editBook(id: $editBookId, edits: $edits) {
            title
        }
    }
`;

export default function EditBookForm() {

    const { data: authorsData, loading: authorsLoading, error: authorsError } = useQuery(GET_AUTHORS_QUERY);
    const [editBook, 
        { data: editBookData, loading: editBookLoading, error: editBookError }
    ] = useMutation(EDIT_BOOK_MUTATION, {onCompleted: () => {window.location.reload()}});
    

    const router = useRouter()
    const bookID = router.query.slug
    const { data: bookData, loading: bookLoading, error: bookError } = useQuery(GET_BOOK_QUERY, {variables: {"bookId": bookID}});

    // if (bookLoading) {
    //     return <h2>Loading...</h2>;     
    // }

    // if (bookError) {
    //     console.error(error);
    //     return <h2>An unexpected error occurred. {bookError}</h2>;
    // }

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [publishDate, setPublishDate] = useState("")

    useEffect(() => {
        if (bookData?.book) {
            setTitle(bookData.book.title);
            setDescription(bookData.book.description);
            setAuthor(bookData.book.author.id);
            setPublishDate(bookData.book.published_date);
        }
    }, [bookData]);

    const editBookHandler = (e) => {
        e.preventDefault()
        editBook({
            variables: {
                "editBookId": bookID,
                "edits": {
                    "author_id": parseInt(author),
                    "description": description,
                    "published_date": publishDate,
                    "title": title
                }  
            }
        })
        if (editBookError) {
            console.log(editBookError)
        }
    }

    if (authorsLoading) {
        return <h2>Loading...</h2>;     
    }

    if (authorsError) {
        console.log(error);
        return <h2>An unexpected error occurred. {error}</h2>;
    }

    return <form onSubmit={editBookHandler}>
        <Typography variant="h6" >
            Edit/Delete this Book:
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
                {authorsData ? authorsData.authors.map((i) => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>):<MenuItem value={0}>Null</MenuItem>}
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

        <Button type="submit" variant="contained">Edit</Button>
    </form>
    
}