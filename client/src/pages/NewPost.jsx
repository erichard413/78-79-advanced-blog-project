import React from "react";
import { getUsers } from "../api/users";
import { redirect, useLoaderData } from "react-router";
import { NewPostForm } from "../forms/NewPostForm";
import { newPost } from "../api/posts";
import { useNavigation } from "react-router";

function NewPost() {
  const { users } = useLoaderData();
  const { state } = useNavigation();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <NewPostForm users={users} state={state} />
    </>
  );
}

const loader = async ({ request: { signal } }) => {
  const users = await getUsers({ signal });
  return { users };
};

export const newPostRoute = {
  loader,
  element: <NewPost />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const title = await formData.get("title");
    const body = await formData.get("body");
    const userId = await formData.get("userId");
    if (title == "") return "Title is required!";
    if (body == "") return "Body is required!";
    await newPost({ body, title, userId }, request.signal);
    return redirect("/");
  },
};
