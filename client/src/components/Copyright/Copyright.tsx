import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../routes/routes';

export default function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link to={PublicRoutes.home}>Sehos</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
