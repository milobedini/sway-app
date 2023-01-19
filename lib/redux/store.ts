// import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";

import reducers from "./reducers";

// import meditationReducer from "./reducers/meditationReducer";

// export const store = configureStore({
//   reducer: {
//     meditations: meditationReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// /*
// When using index

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';

// const store = configureStore({
//   reducer: rootReducer
// });

// export default store;

// */

const store = createStore(reducers, {});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
