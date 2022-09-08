import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../routes/routes';

export default function Error404() {
  return (
    <div>
      <h1>Whoops!</h1>
      <h2>404 Page Not Found</h2>
      <p>
        Try our <Link to={PublicRoutes.start}>homepage</Link> or{' '}
        <Link to={PublicRoutes.home}>products</Link> instead.
      </p>
    </div>
  );
}
