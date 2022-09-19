import Grid from '@mui/material/Grid';
import React from 'react';
import AddColor from './AddColor/AddColor';
import Addsize from './AddSize/AddSize';
export default function AddAttributes() {
  return (
    <>
    <Grid display='flex' flexDirection='row' container >
      <Grid xs={12} xl={4} lg={4}>
        <Addsize />
      </Grid>
      <Grid xs={12} xl={4} lg={4}>
        <AddColor />
      </Grid>
    </Grid>
    </>
  );
}
