import React, { useEffect, useState } from "react";
import useLoader from "../Hooks/useLoader";
import { getCookie } from "../tools/cookies";
import { NavLink, useParams, Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminPanel() {
  useLoader();
  const { isAdmin } = useParams();
  if (getCookie("isAdmin") === isAdmin) {
    return (
      <div className="minContent gradient-bg p-2">
        <h2>Welcome to admin Panel {getCookie("isAdmin")}!</h2>
        <p>You have all the access to all the data.</p>
        <div className="container">
          <div className="d-flex justify-content-center mt-3 mb-3">
            <ul className="navbar-nav rounded-2 navbar">
              <li className="nav-item">
                <NavLink className="tab nav-link" to="users">
                  Users
                  <div className="highlight"></div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="tab nav-link" to="posts">
                  Posts
                  <div className="highlight"></div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="tab nav-link" to="storieslist">
                  Stories
                  <div className="highlight"></div>
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainContent bg-danger p-2 d-flex justify-content-center align-items-center">
        <h2>Sorry, You are not authorised for this page.</h2>
      </div>
    );
  }
}

export function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
    console.log(users?._id);
  }, []);
  return (
    <>
      <h3>Users</h3>
      <table className="table table-striped table-hover table-dark">
        <tbody>
          <tr>
            <th>_id</th>
            <th>username</th>
            <th>email</th>
            <th>password</th>
            <th>desc</th>
            <th>JoinDate</th>
            <th>tags</th>
            <th>dp</th>
            <th>TMC-Points</th>
            <th>Stories-Count</th>
            <th>Posts-Count</th>
            <th>Friends</th>
            <th>Friends-Count</th>
            <th>Actions</th>
          </tr>
          {users?.map((user) => {
            <tr>
              <td>{user?._id}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </>
  );
}
export function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
    console.log(posts?._id);
  }, []);
  return (
    <>
      <h3>Posts</h3>
      <table className="table table-striped table-hover table-dark">
        <tbody>
          <tr>
            <th>_id</th>
            <th>title</th>
            <th>body</th>
            <th>postedBy</th>
            <th>tags</th>
            <th>likeCounts</th>
            <th>dislikeCounts</th>
            <th>postedAt</th>
            <th>slug</th>
            <th>isReply</th>
            <th>replyId</th>
            <th>Actions</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export function StoriesList() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/stories/")
      .then((response) => setStories(response.data))
      .catch((error) => console.log(error));
    console.log(stories?._id);
  }, []);
  return (
    <>
      <h3>Stories</h3>
      <table className="table table-striped table-hover table-dark">
        <tbody>
          <tr>
            <th>_id</th>
            <th>title</th>
            <th>body</th>
            <th>postedBy</th>
            <th>tags</th>
            <th>selectedFile</th>
            <th>externalLink</th>
            <th>likeCount</th>
            <th>postedAt</th>
            <th>Actions</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
