import UserProfile from '../components/profile/user-profile';
import { useStateContext } from '../store/StateContext';

const ProfilePage = () => {
  const cxt=useStateContext();
  return (
    <>
     {cxt.token &&
    <UserProfile />}
    </>
  )
 
};

export default ProfilePage;
