import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import {  useStateContext } from './store/StateContext';

function App() {
  const cxt=useStateContext();
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
          {cxt.isLogin && <Redirect to='/profile'/>}
        </Route>
        <Route path='/profile' exact>
         {cxt.isLogin && <UserProfile />}
         {!cxt.isLogin && <Redirect to='/auth'/>}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
