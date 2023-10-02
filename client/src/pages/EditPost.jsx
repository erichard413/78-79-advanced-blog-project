import React from "react";
import { getUsers } from "../api/users";
import { useLoaderData } from "react-router";
import { EditPostForm } from "../forms/EditPostForm";
import { editPost, getPost } from "../api/posts";
import { redirect } from "react-router";
import { useNavigation } from "react-router";

function EditPost() {
  const { users, post } = useLoaderData();
  const { state } = useNavigation();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <EditPostForm users={users} post={post} state={state} />
    </>
  );
}

const loader = async ({ request: { signal }, params: { postId } }) => {
  const post = await getPost(postId, { signal });
  const users = await getUsers({ signal });
  return { post, users };
};

export const editPostRoute = {
  loader,
  element: <EditPost />,
  action: async ({ request, params: { postId } }) => {
    const formData = await request.formData();
    const body = await formData.get("body");
    const title = await formData.get("title");
    const userId = await formData.get("userId");
    if (title == "") return "Title is required!";
    if (body == "") return "Body is required!";
    await editPost(postId, { body, title, userId }, request.signal);
    return redirect("/");
  },
};
