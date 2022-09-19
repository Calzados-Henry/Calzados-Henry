import Loader from '@/app/Loader';
import { useGetReviewsProductQuery } from '@/features/user/reviews/reviewsApiSlice';
import { CssBaseline, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';

// eslint-disable-next-line camelcase
export default function Reviews() {
  const { id } = useParams();
  const { data, error, isSuccess, isLoading } = useGetReviewsProductQuery(id);
  let content;
  if (error) content = <h1>Upps</h1>;
  if (isLoading) content = <Loader size={60} />;
  if (isSuccess && data.length)
    content = data?.map((item, i) => {
      return (
        <Grid key={i} item xs={12} sm={6} xl={6} wrap='wrap'>
          <ReviewCard review={item.review} date={item.date} rate={item.rate} User={item.User} />
        </Grid>
      );
    });
  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} alignItems='center' mt={6} mb={6}>
        <Grid item xs={12} sm={'auto'} maxWidth={'fit-content'}>
          <Typography variant='h5' width={'100%'} gutterBottom>
            Reviews( {data?.length || 0})
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} textAlign='left'>
          <ReviewModal />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </>
  );
}
