import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from './Reviews.module.css';
import AvatarCard from '../AvatarCard/AvatarCard';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';

const date = new Date(2022, 1, 17);

export default function Reviews() {
  return (
    <>
      <Typography variant='h3' width={'100%'} className={styles.title}>
        Reviews
      </Typography>
      <Box className={styles.container}>
        <Box className={styles.review}>
          <Box>
            <AvatarCard></AvatarCard>
          </Box>
          <Box className={styles.name}>
            <Typography variant='h6'>Bart Simpson</Typography>
            {/*   <Typography component='legend'>Read only</Typography> */}
            <Rating name='read-only' value={4} readOnly />
          </Box>
          <Box className={styles.comment}>
            <Typography variant='body1' gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
              cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </Box>
          <Box className={styles.date}>{date.toDateString()}</Box>
        </Box>

        <Box className={styles.review}>
          <Box>
            <AvatarCard></AvatarCard>
          </Box>
          <Box className={styles.name}>
            <Typography variant='h6'>Jhon Smith</Typography>
            {/*   <Typography component='legend'>Read only</Typography> */}
            <Rating name='read-only' value={4} readOnly />
          </Box>
          <Box className={styles.comment}>
            <Typography variant='body1' gutterBottom>
              tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
              cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem
              quibusdam.tenetur unde suscipit, quam beatae rerum inventore consectetur, neque
              doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem
              quibusdam.
            </Typography>
          </Box>
          <Box className={styles.date}>{date.toDateString()}</Box>
        </Box>
      </Box>
    </>
  );
}
