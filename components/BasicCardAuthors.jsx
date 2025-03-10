import * as React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function BasicCardAuthors({ gridItem }) {
  return (
    <Link href={`/authors/${gridItem.id}`} passHref style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://platform.polygon.com/wp-content/uploads/sites/2/2024/09/04-037.wizard-leomund.png"
            alt="Book Cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {gridItem.name}
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
              {gridItem.biography}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
