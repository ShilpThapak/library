import * as React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function BasicCardBooks({ gridItem }) {
  return (
    <Link href={`/books/${gridItem.id}`} passHref style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781683834588/harry-potter-hogwarts-school-of-witchcraft-and-wizardry-tiny-book-9781683834588_hr.jpg"
            alt="Book Cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {gridItem.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2, // Limits text to 2 lines
                WebkitBoxOrient: 'vertical',
              }}
            >
              {gridItem.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}


