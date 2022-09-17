export function setUserInfo(user: any) {
  const userAuth = {
    id: user.id,
    user: user.email,
    rol: user.type_user,
    token: user.token,
  };
  const userInfo = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    last_name: user.last_name,
    birth_date: user.birth_date,
    phone: user.phone,
    identification: user.identification,
  };

  return { userAuth, userInfo };
}

export const initial = {
  username: '',
  password: '',
  email: '',
  name: '',
  last_name: '',
  phone: '',
  identification: '',
  birth_date: '',
  type_user: 'Google',
};

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

export const clientId = '483531712034-g2pbnlg7iu6qakfguv6pdhobsksqnvc9.apps.googleusercontent.com';

export const setLocalStorage = (userInfo: any) =>
  window.localStorage.setItem('userInfo', JSON.stringify(userInfo));

// secret google
