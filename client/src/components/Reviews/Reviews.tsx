import Loader from '@/app/Loader';
import { useGetReviewsProductQuery } from '@/features/user/reviews/reviewsApiSlice';
import { CssBaseline, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

// eslint-disable-next-line camelcase
export default function Reviews() {
  const auth = useAuth();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { data, error, isSuccess, isLoading } = useGetReviewsProductQuery(id);

  useEffect(() => {
    auth.user ? setShowModal(true) : <></>;
  }, [auth]);

  useEffect(() => {
    Array.isArray(data) ? (
      data?.forEach(rev => {
        if (rev.id_user === auth.id) setShowModal(false);
      })
    ) : (
      <></>
    );
  }, [data]);

  let content;
  if (error) content = <h1>Upps</h1>;
  if (isLoading) content = <Loader size={60} />;
  if (isSuccess && data.length) {
    content = data?.map((item, i) => {
      return (
        <Grid key={i} item xs={12} sm={6} xl={6} wrap='wrap'>
          <ReviewCard
            id_user={item.id_user}
            id_product={item.id_product}
            review={item.review}
            date={item.date}
            rate={item.rate}
            User={item.User}
          />
        </Grid>
      );
    });
  }

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
          {showModal && <ReviewModal />}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </>
  );
}
