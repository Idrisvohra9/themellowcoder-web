import React, { useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import { getCookie } from "../tools/cookies";
import { NavLink, useParams, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers, getStories } from "../Api/actions";

// import axios from "axios";

export default function AdminPanel() {
  useLoader();
  const { isAdmin } = useParams();
  if (getCookie("isAdmin") === isAdmin) {
    return (
      <div className="minContent gradient-bg p-2 h-100">
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
          <div className="admin container-fluid">
            <Outlet />
          </div>
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
  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const users = useSelector((store) => store.userReducer);
  useEffect(() => {
    dispatch(getUsers()); // We go to the post reducer
  }, [dispatch]);
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
            return (
              <tr className="clipped-row">
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td className="clipped-row">{user.desc}</td>
                <td>{user.joinDate}</td>
                <td>
                  {user.tags?.map((tag, id) => (
                    <span key={id}>{tag}, </span>
                  ))}
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/users/${user.dp}`}
                    alt=""
                    className="dp"
                  />
                </td>
                <td>{user.tmcPoints}</td>
                <td>{user.tmcPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export function Posts() {
  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const posts = useSelector((store) => store.postReducer);
  useEffect(() => {
    dispatch(getPosts()); // We go to the post reducer
  }, [dispatch]);
  return (
    <>
      <h3>Posts</h3>
      <table className="table table-striped table-hover table-dark">
        <tbody>
          <tr>
            <th>_id</th>
            <th>title</th>
            <th style={{ width: "200px" }}>body</th>
            <th>postedBy</th>
            <th>tags</th>
            <th>likeCounts</th>
            <th>dislikeCounts</th>
            <th>postedAt</th>
            <th>slug</th>
            <th>Actions</th>
          </tr>
          {posts.map((post, id) => {
            return (
              <tr key={id} className="clipped-row">
                <td>{post._id}</td>
                <td>{post.title}</td>
                <td className="clipped-col">{post.body}</td>
                <td>{post.postedBy?.username}</td>
                <td>
                  {post.tags.map((tag, id) => (
                    <span key={id}>{tag}, </span>
                  ))}
                </td>
                <td>{post.likedBy?.length}</td>
                <td>{post.dislikedBy?.length}</td>
                <td>{post.createdAt}</td>
                <td>{post.slug}</td>
                <td>
                  <Actions />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export function StoriesList() {
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

function Actions(updateLink, delFun) {
  return (
    <div className="d-flex">
      <Link to={updateLink} className="bi bi-pencil-square btn btn-primary" />
      <button
        className="bi bi-trash3 btn btn-danger ms-2"
        onClick={() => delFun}
      ></button>
    </div>
  );
}
