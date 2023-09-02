import React, { useState } from "react";
import useLoader from "../../Hooks/useLoader";
import Head from "../../components/Head";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable,
} from "react-reorder";

export default function PlannedCode() {
  useLoader();
  const { id } = useParams();
  const [planCodeData, setPlanData] = useState({});
  const navigate = useNavigate();
  return (
    <>
      <Head title={id}></Head>
      <div className="">
        
      </div>
    </>
  );
}
