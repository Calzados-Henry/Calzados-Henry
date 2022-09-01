import StoreIconComponent from '../StoreIconComponent/StoreIconComponent';
import SearchComponent from '../Search/SearchComponent';
import SideBarComponent from '../SideBarComponent/SideBarComponent';
import User from '../User/User';

import { AppBar, Box, Toolbar } from '@mui/material';

export default function PrimarySearchAppBar() {
  return (
    <AppBar position='absolute' color='primary'>
      <Toolbar>
        <SideBarComponent />

        <StoreIconComponent />

        <Box sx={{ flexGrow: 1.5 }} />

        <SearchComponent name={'search'} />

        <Box sx={{ flexGrow: 1 }} />

        <User />
      </Toolbar>
    </AppBar>
  );
}
