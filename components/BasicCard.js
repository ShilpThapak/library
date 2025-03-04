import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard({bookItem}) {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Book
        </Typography>
        <Typography variant="h5" component="div">
          {bookItem.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>By {bookItem.author.name}</Typography>
        <Typography variant="body2">
          {bookItem.description}
          <br />
          {/* {bookItem.published_date} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
