import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthRoute = ({ isPrivate, ...rest }) => {

  const { signed } = useAuth();

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};
