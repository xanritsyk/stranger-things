import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePosts, getPosts } from "../api/Index";
import { MessageForm, Search } from ".";

import "./App.css";

const Posts = ({ postValue, setPostValue }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const authToken = localStorage.getItem("token") ? true : false;
  const catchId = (id) => {
    setPostValue(id);
    return postValue;
  };
  useEffect(() => {
    getPosts()
      .then((response) => {
        const posts = response.data.posts;
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  async function deletePost(post_id) {
    const tokens = localStorage.getItem("token");
    const erase = await deletePosts(tokens, post_id);
    navigate("/Profile");
    return erase;
  }
  const postMapping = posts.map((post, index) => {
    let postId = posts[index]._id;
    return (
      <div id="postDiv" key={`Posts${index}`}>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">{post.title}</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title">$$$: {post.price}</h5>
            <p className="card-text"> {post.updatedAt}</p>
            <p className="card-text">DESCRIPTION: {post.description}</p>
          </div>
          <ul className="list-group list-group-light list-group-small">
            <li className="list-group-item px-4">
              POST BY: {post.author.username}
            </li>
            <li>
              <MessageForm postId={postId} deletePost={deletePost} />
            </li>
            <li>
              {authToken === true ? (
                <button
                  onClick={() => {
                    catchId(post._id)
                    deletePost(post._id);
                  }}
                  type="button"
                  id="deletePostButton"
                  className="btn btn-dark"
                >
                  Delete Post
                </button>
              ) : (
                <Link to="/Login">
                  <button className="btn btn-warning" id="loginToViewPost">
                    Login to Interact With Posts
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  });

  return (
    <div id="postBorder">
      <Search postMapping={postMapping} posts={posts} setPosts={setPosts} />
      <h1 className="display-4">Welcome to Posts!</h1>

      {authToken === true ? (
        <Link to="/Profile">
          <button id="backToProfile" type="button" className="btn btn-dark">
            {" "}
            Back to Profile{" "}
          </button>
        </Link>
      ) : null}

      {postMapping}

      {authToken === true ? (
        <Link to="/Profile">
          <button type="button" className="btn btn-dark">
            {" "}
            Back to Profile{" "}
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default Posts;