import { baseApi } from "./base";

export function getPosts(query = null, userId = "Any", options) {
  return baseApi
    .get(`posts`, { params: { userId, q: query } }, options)
    .then(res => res.data);
}

export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then(res => res.data);
}

export function newPost(data, options) {
  return baseApi.post(`posts`, data, options).then(res => res.data);
}

export function editPost(postId, data, options) {
  return baseApi.put(`posts/${postId}`, data, options).then(res => res.data);
}
