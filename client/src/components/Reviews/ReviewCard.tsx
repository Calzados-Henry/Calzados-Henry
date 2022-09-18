import { ReviewsI } from '@/sehostypes';
import { Grid, Rating, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import AvatarCard from '../AvatarCard/AvatarCard';

export default function ReviewCard({ review, date, rate, User }: Partial<ReviewsI>) {
  return (
    <>
      <Paper
        sx={{
          p: 2,
          maxWidth: 500,
          minHeight: 200,
          flexGrow: 1,
        }}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item>
            <AvatarCard width={100} height={100} />
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1' component='div'>
                  {User?.first_name} {User?.last_name}
                </Typography>
                <Typography gutterBottom variant='body2' component='div'>
                  @{User?.username}
                </Typography>
                <Rating name='read-only' value={parseInt(rate)} readOnly />
                <Typography variant='body2' gutterBottom>
                  {review}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {date}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
