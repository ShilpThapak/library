import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import BasicCardBooks from './BasicCardBooks';
import BasicCardAuthors from './BasicCardAuthors';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ResponsiveGrid({gridArray, itemType}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {gridArray.map((gridItem, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            {itemType == 'book'? 
              <BasicCardBooks gridItem={gridItem}/>
              : 
              <BasicCardAuthors gridItem={gridItem}/>
            }
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
