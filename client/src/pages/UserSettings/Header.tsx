import { useAuth } from '@/hooks/useAuth';
import { Box, Divider, Typography } from '@mui/material';

export interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const user = useAuth();
  return (
    <>
      <Box display={'flex'} flexDirection='row'>
        <Typography variant='h5'>{props.title}&nbsp;&nbsp;</Typography>
        <Typography variant='h5' fontWeight={100}>
          {user.user}
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box mb={2}></Box>
    </>
  );
}
