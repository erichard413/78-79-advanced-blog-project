import React from "react";
import { Link, useActionData } from "react-router-dom";
import { Form } from "react-router-dom";

export function EditPostForm({ users, post, state }) {
  const errorMessage = useActionData();

  const isLoading = state == "submitting" || state == "loading";

  return (
    <Form method="post" action={`/posts/${post.id}/edit`} className="form">
      <div
        className="error-message"
        style={{ display: "block", width: "100%" }}
      >
        {errorMessage?.includes("Title") ? errorMessage : null}
      </div>
      <div className="form-row">
        <div
          className={`form-group ${
            errorMessage?.includes("Title") ? "error" : ""
          }`}
        >
          <label htmlFor="title">Title</label>

          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={post.userId}>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div
          className={`form-group ${
            errorMessage?.includes("Body") ? "error" : ""
          }`}
        >
          <label htmlFor="body">Body</label>
          <div className="error-message">
            {errorMessage?.includes("Body") ? errorMessage : null}
          </div>
          <textarea name="body" id="body" defaultValue={post.body}></textarea>
        </div>
      </div>
      <div className="form-row form-btn-row">
        <Link to="/posts" className="btn btn-outline">
          Cancel
        </Link>
        <button disabled={isLoading} className="btn">
          Save
        </button>
      </div>
    </Form>
  );
}
