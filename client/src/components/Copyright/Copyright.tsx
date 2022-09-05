import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link to={'/home'}>Go to home</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
