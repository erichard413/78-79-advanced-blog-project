import React from "react";
import { Form } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export function PostQueryForm({ users, queryRef }) {
  return (
    <Form method="get" action="/posts" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" ref={queryRef} />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select type="search" name="userId" id="userId">
            <option value="">Any</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn">Filter</button>
      </div>
    </Form>
  );
}
