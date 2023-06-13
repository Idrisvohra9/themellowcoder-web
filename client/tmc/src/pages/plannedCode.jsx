import React, { useState } from 'react'
import useLoader from '../Hooks/useLoader';
import Head from "./components/Head";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function PlannedCode() {
  useLoader();
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const navigate = useNavigate();
  return (
    <>
    <Head title={id}></Head>
    <div>plannedCode</div>
    </>
  )
}
