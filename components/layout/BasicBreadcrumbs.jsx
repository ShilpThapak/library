import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


export default function BasicBreadcrumbs({ parentPathName, parentPath, childPathName }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={parentPath}>
          {parentPathName}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{childPathName}</Typography>
      </Breadcrumbs>
    </div>
  );
}
