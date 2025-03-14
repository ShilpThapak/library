import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useAuthorStore from "@/store/authorStore";


const GET_AUTHOR_QUERY = gql`
    query Author($authorId: ID!) {
        author(id: $authorId) {
            name
            biography
            born_date
        }
    }
`

const EDIT_AUTHOR_MUTATION = gql`
    mutation EditAuthor($editAuthorId: ID!, $edits: EditAuthorInput) {
        editAuthor(id: $editAuthorId, edits: $edits) {
            id
            name
        }
    }
`;

export default function EditAuthorForm({ authorInfo:authorData, handleClose }) {
    const { updateAuthorInCache } = useAuthorStore();
    const router = useRouter()
    const authorID = router.query.slug

    const [editAuthor, 
        { data: editAuthorData, loading: editAuthorLoading, error: editAuthorError }
    ] = useMutation(
        EDIT_AUTHOR_MUTATION, 
        {
            onCompleted: (data) => {
                updateAuthorInCache(authorID, data.editAuthor);
                handleClose()
            }
        }
    );
    
    const [name, setName] = useState(authorData.name)
    const [bio, setBio] = useState(authorData.biography)
    const [bornDate, setBornDate] = useState(dayjs(authorData.born_date))
    const [submitStatus, setSubmitStatus] = useState(false)

    useEffect(() => {
        if (name != "" && bio != "" && bornDate != null){
            setSubmitStatus(true)
        }
        else {
            setSubmitStatus(false)
        }
    },[name, bio, bornDate])

    useEffect(() => {
        if (authorData?.author) {
            setName(authorData.author.name);
            setBio(authorData.author.biography);
            const formattedBornDate = dayjs(authorData.author.born_date);
            setBornDate(formattedBornDate.isValid() ? formattedBornDate : null);
        }
    }, [authorData]);

    const editAuthorHandler = (e) => {
        e.preventDefault()
        editAuthor({
            variables: {
                "editAuthorId": authorID,
                "edits": {
                    "name": name,
                    "biography": bio,
                    "born_date": bornDate
                }  
            }
        })
        if (editAuthorError) {
            console.log(editAuthorError)
        }
    }

    return <form onSubmit={editAuthorHandler}>
        <Typography variant="h6" >
            Edit/Delete this Author:
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
            label="Bio"
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
                    label="Born Date"
                    value={bornDate}
                    onChange={(e) => setBornDate(e)}
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