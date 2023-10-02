import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { Link } from "react-router-dom";
import { PostQueryForm } from "../forms/PostQueryForm";
import { getUsers } from "../api/users";
import { useRef } from "react";

function PostList() {
  const {
    posts,
    users,
    searchParams: { query },
  } = useLoaderData();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link to="/posts/new" className="btn btn-outline">
            New
          </Link>
        </div>
      </h1>
      <PostQueryForm users={users} queryRef={queryRef} />
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || null;
  const authorId = searchParams.get("userId") || null;
  const posts = await getPosts(query, authorId, { signal });
  const users = await getUsers({ signal });
  return { posts, users, searchParams: { query } };
}

export const postListRoute = {
  loader,
  element: <PostList />,
};
