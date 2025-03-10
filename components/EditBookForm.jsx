import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useAuthorStore from "@/store/authorStore";


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

export default function EditBookForm({ handleClose }) {
    const { authors:authorsData } = useAuthorStore();
    const [editBook, 
        { data: editBookData, loading: editBookLoading, error: editBookError }
    ] = useMutation(EDIT_BOOK_MUTATION, {onCompleted: () => {handleClose()}});
    

    const router = useRouter()
    const bookID = router.query.slug
    const { data: bookData, loading: bookLoading, error: bookError } = useQuery(GET_BOOK_QUERY, {variables: {"bookId": bookID}});

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

    useEffect(() => {
        if (bookData?.book) {
            setTitle(bookData.book.title);
            setDescription(bookData.book.description);
            setAuthor(bookData.book.author.id);
            // setPublishDate(bookData.book.published_date);
            const formattedPublishDate = dayjs(bookData.book.published_date);
            setPublishDate(formattedPublishDate.isValid() ? formattedPublishDate : null);
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

    // if (authorsLoading) {
    //     return <h2>Loading...</h2>;     
    // }

    // if (authorsError) {
    //     console.log(error);
    //     return <h2>An unexpected error occurred. {error}</h2>;
    // }

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
                {authorsData ? authorsData.map((i) => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>):<MenuItem value={0}>Null</MenuItem>}
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
            submitStatus? <Button type="submit" variant="contained">Edit</Button>
            :
            <Button type="submit" variant="contained" disabled>Edit</Button>
        }
    </form>
    
}