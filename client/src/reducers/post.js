import {
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
  COMMENT,
  FETCH,
} from "../constants/actionTypes";

const postsReducers = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return [...posts, ...action.payload];
    case CREATE:
      return [...posts, action.payload];
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH:
      return action.payload;
    case COMMENT:
      return [
        ...posts,
        posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      ];
    default:
      return posts;
  }
};
export default postsReducers;
