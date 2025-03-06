import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material"
import {useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'


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
            name
        }
    }
`;

export default function EditAuthorForm() {

    const [editAuthor, 
        { data: editAuthorData, loading: editAuthorLoading, error: editAuthorError }
    ] = useMutation(EDIT_AUTHOR_MUTATION, {onCompleted: () => {window.location.reload()}});
    

    const router = useRouter()
    const authorID = router.query.slug
    const { data: authorData,
        loading: authorLoading,
        error: authorError } = useQuery(GET_AUTHOR_QUERY, {variables: {"authorId": authorID}});


    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [bornDate, setBornDate] = useState("")

    useEffect(() => {
        if (authorData?.author) {
            setName(authorData.author.name);
            setBio(authorData.author.biography);
            setBornDate(authorData.author.born_date);
        }
    }, [authorData]);

    const editAuthorHandler = (e) => {
        e.preventDefault()
        // console.log(title, description, author, publishDate, authorsData)
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

    if (authorLoading) {
        return <h2>Loading...</h2>;     
    }

    if (authorError) {
        console.log(error);
        return <h2>An unexpected error occurred. {error}</h2>;
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
            <TextField
            id="outlined-helperText"
            label="Born Date - DD/MM/YYYY"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
            />
        </FormControl>

        <br></br>
        <br></br>

        <Button type="submit" variant="contained">Edit</Button>
    </form>
    
}