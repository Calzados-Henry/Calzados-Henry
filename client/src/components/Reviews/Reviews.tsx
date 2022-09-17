import { ProductI } from '@/features';
import { Grid, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AvatarCard from '../AvatarCard/AvatarCard';
import ReviewModal from './ReviewModal';

const date = new Date(2022, 1, 17);

// eslint-disable-next-line camelcase
export default function Reviews() {
  return (
    <>
      <Grid container spacing={2} alignItems='center' mt={5}>
        <Grid item xs={12} sm={'auto'} maxWidth={'fit-content'}>
          <Typography variant='h4' width={'100%'}>
            Reviews
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} textAlign='left'>
          <ReviewModal />
        </Grid>
      </Grid>
      <Box>
        <Box>
          <Box>
            <AvatarCard></AvatarCard>
          </Box>
          <Box>
            <Typography variant='h6'>Bart Simpson</Typography>
            {/*   <Typography component='legend'>Read only</Typography> */}
            <Rating name='read-only' value={4} readOnly />
          </Box>
          <Box>
            <Typography variant='body1' gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
              cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </Box>
          <Box>{date.toDateString()}</Box>
        </Box>
      </Box>
    </>
  );
}
