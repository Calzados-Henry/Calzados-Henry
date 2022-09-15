import { Divider } from '@mui/material';
import AccountInfo from './AccountInfo';
import PersonalInfo from './PersonalInfo';
import Header from '../Header';

export default function Profile() {
  return (
    <>
      <Header title='Profile' />
      <PersonalInfo />
      <Divider sx={{ my: 1 }} />
      <AccountInfo />
    </>
  );
}
