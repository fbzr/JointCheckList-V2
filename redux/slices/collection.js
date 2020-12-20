import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';
// import SocketClient from '../../SocketClient';

export const loadUsersCollection = createAsyncThunk(
  'collection/loadUsersCollection',
  async ({userId}, thunkAPI) => {
    // make request to API
    // return user's lists obj
  },
);

export const addList = createAsyncThunk(
  'collection/addList',
  async ({title}, thunkAPI) => {
    // make req to api using await
    // const newList = await listController.add(list);
    // return newList;
    return {
      id: nanoid(),
      title: title || Date.now(),
      createdAt: Date.now(),
      items: {},
    };
  },
);

export const removeList = createAsyncThunk(
  'collection/removeList',
  async ({id}, thunkAPI) => {
    // TODO: backend request
    return id;
  },
);

export const addItem = createAsyncThunk(
  'collection/addItemToList',
  async ({listId, title}, thunkAPI) => {
    // TODO: backend request
    return {
      id: nanoid(),
      title,
      listId,
      done: false,
      createdAt: Date.now(),
    };
  },
);

export const removeItem = createAsyncThunk(
  'collection/removeItemFromList',
  async ({id, listId}, thunkAPI) => {
    // TODO: backend request
    return {
      id,
      listId,
    };
  },
);

export const toggleItem = createAsyncThunk(
  'collection/toggleItem',
  async ({id, listId}, thunkAPI) => {
    return {
      id,
      listId,
    };
  },
);

export const patchList = createAsyncThunk(
  'collection/patchList',
  async ({id, args}, thunkAPI) => {
    // TODO: backend patch
    return {
      id,
      ...args,
    };
  },
);

export const patchItem = createAsyncThunk(
  'collection/patchItem',
  async ({id, listId, args}, thunkAPI) => {
    console.log('***PATCH_ITEM***\n', args);
    // TODO: backend patch
    return {
      id,
      listId,
      ...args,
    };
  },
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    lists: {},
    loading: 'idle',
    // socket: new SocketClient();
  },
  reducers: {},
  extraReducers: {
    // RTK allows DIRECT STATE MUTATION because it uses immer under the hood

    [addList.fulfilled]: (state, action) => {
      const list = action.payload;
      state.lists[list.id] = list;
      // TODO: call emmit method from SocketClient instance in state
    },

    [removeList.fulfilled]: (state, action) => {
      const id = action.payload;
      delete state.lists[id];
    },

    [patchList.fulfilled]: (state, action) => {
      const {id} = action.payload;
      state.lists[id] = {...state.lists[id], ...action.payload};
    },

    [addItem.fulfilled]: (state, action) => {
      const item = action.payload;
      state.lists[item.listId].items[item.id] = item;
    },

    [removeItem.fulfilled]: (state, action) => {
      const {listId, id} = action.payload;
      delete state.lists[listId].items[id];
    },

    [toggleItem.fulfilled]: (state, action) => {
      const {listId, id} = action.payload;
      state.lists[listId].items[id].done = !state.lists[listId].items[id].done;
    },

    [patchItem.fulfilled]: (state, action) => {
      const {listId, id} = action.payload;
      state.lists[listId].items[id] = {
        ...state.lists[listId].items[id],
        ...action.payload,
      };
    },
  },
});

// export const {addList, removeList} = listsSlice.actions;
export default collectionSlice.reducer;
