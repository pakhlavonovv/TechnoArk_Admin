import { useContext } from 'react';
import { UserContext } from '../../context';
import { Loading } from '@components';
import AdminImage from '../../../assets/man.jpg'

const Settings = () => {
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    return <Loading/>;
  }

  const { user } = userContext;

  return (
    <div className='flex items-center gap-[50px]'>
        <img className='w-[25%]' src={AdminImage} alt="" />
    <div className='grid grid-cols-2 w-[500px] gap-[100px]'>
      <div className="form-group flex flex-col gap-5">
        <label className='font-bold text-2xl'>First Name</label>
        <p className='text-lg'>{user.first_name || 'Undefined'}</p>
      </div>

      <div className="form-group flex flex-col gap-2">
        <label className='font-bold text-2xl'>Last Name</label>
        <p className='text-lg'>{user.last_name || 'Undefined'}</p>
      </div>

      <div className="form-group flex flex-col gap-2">
        <label className='font-bold text-2xl'>Phone Number</label>
        <p className='text-lg'>{user.phone_number || 'Undefined'}</p>
      </div>

      <div className="form-group flex flex-col gap-2">
        <label className='font-bold text-2xl'>Email</label>
        <p className='text-lg'>{user.email || 'Undefined'}</p>
      </div>
    </div>
    </div>
  );
};

export default Settings;
