import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'


export default function BasicCardBooks({gridItem}) {
  const path = `/books/${gridItem.id}`
  return (
    <Link href={path}>
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Book
        </Typography>
        <Typography variant="h5" component="div">
          {gridItem.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>By {gridItem.author.name}</Typography>
        <Typography variant="body2">
          {gridItem.description}
          <br />
          {/* {bookItem.published_date} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Link>
  );
}
