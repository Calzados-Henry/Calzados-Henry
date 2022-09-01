import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div>
      <h1>Whoops!</h1>
      <h2>404 Page Not Found</h2>
      <p>
        Try our <Link to={'/'}>homepage</Link> or <Link to={'/home'}>products</Link> instead.
      </p>
    </div>
  );
}
