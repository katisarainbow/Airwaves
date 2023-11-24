import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

// POST

export const fetchPosts = (page) => API.get(`/posts/explore?page=${page}`);
export const fetchFollowingPosts = (page, userId) =>
  API.get(`/posts?page=${page}&userId=${userId}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery}`);
export const fetchPostsByUsername = (username) =>
  API.get(`/posts/user/${username}`);
export const fetchPostsById = (postId) => API.get(`/posts/${postId}`);

export const fetchPostsLength = () => API.get('/posts/length');

// POST (CREATE - UPDATE - DELETE - LIKE)

export const createPost = (newPosts) => API.post('/posts', newPosts);
export const updatePost = (id, updatePost) =>
  API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// POST COMMENTS

export const getPostComments = (postId) =>
  API.get(`/posts/${postId}/commentPost`);

// COMMENTS

export const commentPost = (postId, comment) =>
  API.post(`/posts/${postId}/commentPost`, comment);
export const updateComment = (updatedComment, postId, commentId) =>
  API.patch(`/posts/${postId}/commentPost/${commentId}`, updatedComment);
export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/commentPost/${commentId}`);

export const likeComment = (postId, commentId) =>
  API.patch(`/posts/${postId}/commentPost/${commentId}/likePost`);

// AUTH

export const fetchUser = (username) => API.get(`/user/${username}`);
export const login = (formData) => API.post('/user/login', formData);
export const signup = (formData) => API.post('/user/signup', formData);

export const updateUserData = (userData, userId) =>
  API.patch(`/user/${userId}`, userData);

export const followUser = (userId, userLogId) =>
  API.patch(`/user/${userLogId}/follow/${userId}`);
