import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../routes/routes';
import toast from 'react-hot-toast';

export const getUsersByAdmin = createAsyncThunk('get-users-by-admin', async () => {
  const { data: users } = await axios.get(`${Endpoint.getUsers}`);

  return users;
});

export const logicDeleteUser = createAsyncThunk('delete-user-by-admin', async (id: number) => {
  const userData: any = window.localStorage.getItem('user');

  const { token } = JSON.parse(userData);

  const { data: user } = await axios.delete(`${Endpoint.modifyUser}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: { id, isActive: true },
  });

  return user;
});

export const restoreDeletedUser = createAsyncThunk(
  'restore-deleted-user-by-admin',
  async (id: number) => {
    const { data: user } = await axios.put(`${Endpoint.modifyUser}`, { id, isActive: true });

    return user;
  },
);

export const changeAdminType = createAsyncThunk('change-admin-type', async (user: User) => {
  const ID = user.id;

  const addAdmin = async () => {
    const { data: userData } = await axios.put(`${Endpoint.modifyUser}`, {
      id: ID,
      type_user: 'Administrator',
    });

    return userData;
  };
  const deleteAdmin = async () => {
    const { data: userData } = await axios.put(`${Endpoint.modifyUser}`, {
      id: ID,
      type_user: 'User',
    });

    return userData;
  };

  if (user.type_user === 'Administrator') {
    return await deleteAdmin();
  } else {
    return await addAdmin();
  }
});

const edithUsers = (builder: any) => {
  builder.addCase(changeAdminType.pending, () => {
    toast.loading('Changing user type...');
  });
  builder.addCase(changeAdminType.rejected, () => {
    toast.dismiss();
    toast.error('An error occurred during the request..');
  });
  builder.addCase(changeAdminType.fulfilled, (state: Admin, action: any) => {
    toast.dismiss();
    const ADMIN = 'Administrator';

    console.log(action);
    const addAdmin = () => {
      state.adminUsers = state.adminUsers.concat(action.payload);
      state.normalUsers = state.normalUsers.filter(e => e.id !== action.payload.id);
      toast.success('Admin added succesfully');
    };
    const deleteAdmin = () => {
      state.adminUsers = state.adminUsers.filter(e => e.id !== action.payload.id);
      state.normalUsers = state.normalUsers.concat(action.payload);
      toast.success('Admin deleted succesfully');
    };
    action.payload.type_user === ADMIN ? addAdmin() : deleteAdmin();
  });

  builder.addCase(restoreDeletedUser.pending, () => {
    toast.loading('Restoring User...');
  });

  builder.addCase(restoreDeletedUser.fulfilled, (state: Admin, action: any) => {
    toast.dismiss();

    state.adminUsers = state.adminUsers?.map((user: any) => {
      if (user.id === action.payload.id) user.isActive = true;
      return user;
    });
    state.employeeUsers = state.employeeUsers?.map((user: any) => {
      if (user.id === action.payload.id) user.isActive = true;
      return user;
    });
    state.normalUsers = state.normalUsers?.map((user: any) => {
      if (user.id === action.payload.id) user.isActive = true;
      return user;
    });
    toast.success('User is Active again');
  });
  builder.addCase(restoreDeletedUser.rejected, () => {
    toast.dismiss();

    toast.success('Operation rejected');
  });

  builder.addCase(logicDeleteUser.pending, () => {
    toast.loading('Deleting User...');
  });

  builder.addCase(logicDeleteUser.fulfilled, (state: Admin, action: any) => {
    state.adminUsers = state.adminUsers?.map((user: any) => {
      if (user.id === action.payload?.id) user.isActive = false;
      return user;
    });
    state.employeeUsers = state.employeeUsers?.map((user: any) => {
      if (user.id === action.payload?.id) user.isActive = false;
      return user;
    });
    state.normalUsers = state.normalUsers?.map((user: any) => {
      if (user.id === action.payload?.id) user.isActive = false;
      return user;
    });
    toast.dismiss();
    toast.success('Usuario eliminado exitosamente...');
  });

  builder.addCase(logicDeleteUser.rejected, () => {
    toast.dismiss();
    toast.error('Hubo un error en la carga de usuarios...');
  });

  builder.addCase(getUsersByAdmin.pending, () => {
    toast.loading('Cargando datos...');
  });

  builder.addCase(getUsersByAdmin.fulfilled, (state: Admin, action: any) => {
    toast.dismiss();

    if (action.payload.length) {
      state.adminUsers = action.payload?.filter((e: any) => e.type_user === 'Administrator');
      state.employeeUsers = action.payload?.filter((e: any) => e.type_user === 'Employee');
      state.normalUsers = action.payload?.filter(
        (e: any) => e.type_user !== 'Administrator' && e.type_user !== 'Employee',
      );

      toast.success('Usuarios cargados...');
    } else {
      toast.error('No se han encontrado coincidencias');
    }
  });

  builder.addCase(getUsersByAdmin.rejected, () => {
    toast.dismiss();
    toast.error('Hubo un error en la carga de usuarios...');
  });
};

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  last_name: string;
  birth_date: string;
  phone: string;
  identification: number;
  type_user: string;
  isActive: boolean;
}

export interface Admin {
  adminUsers: User[];
  employeeUsers: User[];
  normalUsers: User[];
}

// Estado inicial que puede ser cualquier cosa
const initialState: Admin = {
  adminUsers: [],
  employeeUsers: [],
  normalUsers: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: edithUsers,
});

// Action creators are generated for each case reducer function
// exportamos las acciones con destructuring

// export const {  } = adminSlice.actions;

// exportamos el reducer que va para el store, esto se puede hacer de distintas formas en este caso lo hare con un default
export default adminSlice.reducer;
