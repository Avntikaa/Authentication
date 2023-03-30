import { Link } from 'react-router-dom';
import { useStateContext } from '../../store/StateContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const cxt=useStateContext();
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!cxt.isLogin &&<Link to='/auth'>Login</Link>}
          </li>
          <li>
            {cxt.isLogin && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {cxt.isLogin && <button onClick={()=>{
              cxt.setToken(null);
              cxt.setIsLogin(false);
              cxt.setLoginPage(true);
            }}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
