import React, { useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import { isLoggedIn } from "../tools/cookies";
import PlanCodeCard from "./components/PlanCodeCard";
import Head from "./components/Head";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPCs } from "../Api/actions";
import { Link } from "react-router-dom";

export default function PlanCode() {
  useLoader();
  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const pcs = useSelector((store) => store.planCodeReducer);
  useEffect(() => {
    dispatch(getPCs()); // We go to the post reducer
  }, [dispatch]);
  return (
    <>
      <Head title="Plan Code" />
      <div className="plan-code-bg">
        <div className="pc-gradient"></div>
        <div className="pc-pattern">
          <div className="p-3">
            <h1>Plan a Project</h1>
            <div
              className="toast align-items-center bg-primary border-0 w-100 show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">
                  <h6>
                    Plan Code is a project planning tool of TMC (themellowocoder) which provides simple UI for developing project algorithms and many functionalities alongside, such as team management, progress tracking, Sticky notes, Milestones etc. The privacy of your Plan Code entirely depends on you and you can always explore public plan codes. 
                  </h6>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto ms-2"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <hr />
            <div className="mt-3 row">
              <div className="col-8">
                <div className="input-group flex-nowrap">
                  <input
                    type="text"
                    placeholder="Filter by project title, tags or username"
                    className="input"
                    onChange={() => {}}
                  />
                  <span className="input-group-text search-btn h-100">🔍</span>
                </div>
              </div>
              <div className="d-flex col-lg-4 col-sm-12 justify-content-end">
                {isLoggedIn() ? (
                  <Link to="create" className="pc-btn">
                    <span>Plan a code!</span>
                  </Link>
                ) : (
                  <div>Login to Post!</div>
                )}
              </div>
            </div>
            <hr />
            <div className="mt-3 pb-3 border-bottom border-light">
              <div className="container d-flex justify-content-center">
                <div
                  className="btn-group w-100"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <button
                    type="button"
                    className="btn btn-outline-dark w-25 active"
                  >
                    Personal
                  </button>
                  <button type="button" className="btn btn-outline-dark w-50">
                    Explore All
                  </button>
                  <button type="button" className="btn btn-outline-dark w-25">
                    Completed
                  </button>
                </div>
              </div>
            </div>
            <div className="container mb-3">
              {!pcs.length ? (
                <div className="pc-spinner mt-5 mb-5">
                  <div className="spinner1"></div>
                </div>
              ) : (
                pcs.map((post) => <PlanCodeCard {...post} key={post._id} />)
              )}
              <PlanCodeCard/>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
