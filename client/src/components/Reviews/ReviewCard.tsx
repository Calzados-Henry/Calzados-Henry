/* eslint-disable camelcase */
import { useDeleteReviewMutation } from '@/features/user/reviews/reviewsApiSlice';
import { useAuth } from '@/hooks/useAuth';
import { ReviewsI } from '@/sehostypes';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Rating, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import AvatarCard from '../AvatarCard/AvatarCard';

export default function ReviewCard({
  id_user,
  id_product,
  review,
  date,
  rate,
  User,
}: Partial<ReviewsI>) {
  const [delelteReview, result] = useDeleteReviewMutation();
  const auth = useAuth();

  const erase = () => {
    if (id_user && id_product)
      Swal.fire({
        title: 'Delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5d3a00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then(result => {
        if (result.isConfirmed) {
          delelteReview({ id_user, id_product })
            .then(() => {
              Swal.fire({
                title: 'Deleted',
                text: 'Your review has been deleted.',
                confirmButtonColor: '#5d3a00',
                icon: 'success',
              });
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#5d3a00',
              });
            });
        }
      });
  };

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
                {}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {auth.id === id_user ? (
          <Grid item display='flex' justifyContent='end'>
            <IconButton aria-label='delete' size='small' color='secondary'>
              <DeleteIcon onClick={erase} />
            </IconButton>
          </Grid>
        ) : (
          <></>
        )}
      </Paper>
    </>
  );
}
