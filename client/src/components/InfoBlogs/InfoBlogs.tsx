import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { dataBlog } from './data';
import { Button, Typography } from '@mui/material';

export interface LandingBlog {
  title: string;
  description: string;
  image: string;
  link: string;
  columns: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#482307' : '#fff',
  height: 300,
  padding: 20,
  textAlign: 'left',
  color: '#f8f8f8',
  display: 'grid',
  alignContent: 'end',
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        mb={3}
        variant='h4'
        gutterBottom
        textAlign={'center'}
        sx={{ borderBottom: '2px dotted gray' }}>
        Visit Blog
      </Typography>
      <Grid container spacing={2}>
        {dataBlog.map((elem: LandingBlog, index: number) => {
          return (
            <Grid key={index} item xs={elem.columns}>
              <Item
                sx={{
                  backgroundImage: `url(${elem.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}>
                <h2 style={{ textShadow: '2px 2px 4px #000000' }}>{elem.title}</h2>
                <p style={{ textShadow: '2px 2px 2px #000000' }}>{elem.description}</p>
                <a target={'_blank'} href={elem.link} rel='noreferrer'>
                  <Button variant='contained' size='large' color='primary'>
                    Explore
                  </Button>
                </a>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
