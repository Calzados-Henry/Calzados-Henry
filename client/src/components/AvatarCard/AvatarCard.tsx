import Avatar from '@mui/material/Avatar';
// https://i.pravatar.cc/100

export interface SizeI {
  width: number;
  height: number;
}
export default function AvatarCard({ width, height }: SizeI) {
  return <Avatar sx={{ width: { width }, height: { height } }}></Avatar>;
}
