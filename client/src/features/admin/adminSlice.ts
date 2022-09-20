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

export const logicDeleteUser = createAsyncThunk('delete-user-by-admin', async (id, token) => {
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
  async (id, token) => {
    const { data: user } = await axios.put(`${Endpoint.modifyUser}`, { id, isActive: true });

    return user;
  },
);

const edithUsers = (builder: any) => {
  builder.addCase(restoreDeletedUser.pending, (state, action) => {
    toast.loading('Restoring User...');
  });

  builder.addCase(restoreDeletedUser.fulfilled, (state, action) => {
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
  builder.addCase(restoreDeletedUser.rejected, (state, action) => {
    toast.dismiss();

    toast.success('Operation rejected');
  });

  builder.addCase(logicDeleteUser.pending, (state, action) => {
    toast.loading('Deleting User...');
  });

  builder.addCase(logicDeleteUser.fulfilled, (state, action) => {
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

  builder.addCase(logicDeleteUser.rejected, (state, action) => {
    toast.dismiss();
    toast.error('Hubo un error en la carga de usuarios...');
  });

  builder.addCase(getUsersByAdmin.pending, (state, action) => {
    toast.loading('Cargando datos...');
  });

  builder.addCase(getUsersByAdmin.fulfilled, (state, action) => {
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

  builder.addCase(getUsersByAdmin.rejected, (state, action) => {
    toast.dismiss();
    toast.error('Hubo un error en la carga de usuarios...');
  });
};

// Estado inicial que puede ser cualquier cosa
const initialState: any = {
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
