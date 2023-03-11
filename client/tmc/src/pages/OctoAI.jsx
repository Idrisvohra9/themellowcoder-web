import React, { useState } from "react";
import useLoader from "../Hooks/useLoader";
import Helmet from "react-helmet"
export default function OctoAI() {
  useLoader();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await fetch("../Api/generate",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      console.log(response.body);
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setPrompt("");
      setResult(data.result);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  function inputFocus(e){
    console.log(e.key);
    if(e.key === ""){

    }
  }
  function enterSend(e){
    if(e.key === "Enter"){
      handleSend();
    }
  }
  document.body.addEventListener("keydown", inputFocus);
  return (
    <div className="mainContent OctoAI">
      <Helmet>
        <title>themellowcoder - OctoAI</title>
      </Helmet>
      <div className="frosty-gradient-bg pt-4">
        <div className="mt-2 ms-3 me-3">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <svg
              width="800"
              height="800"
              viewBox="0 0 36 36"
              aria-hidden="true"
              className="octo-ai"
            >
              <path
                fill="#553788"
                d="M10 12c3 5 0 10.692-3 9.692s-4 2-1 3 9.465-.465 13-4c1-1 2-1 2-1L10 12z"
              ></path>
              <path
                fill="#553788"
                d="M26 12c-3 5 0 10.692 3 9.692s4 2 1 3-9.465-.465-13-4c-1-1-2-1-2-1L26 12z"
              ></path>
              <path
                fill="#744EAA"
                d="M30.188 16c-3 5 0 10.692 3 9.692s4 2 1 3-9.465-.465-13-4c-1-1-2-1-2-1l11-7.692zM5.812 16c3 5 0 10.692-3 9.692s-4 2-1 3 9.465-.465 13-4c1-1 2-1 2-1L5.812 16z"
              ></path>
              <path
                fill="#9266CC"
                d="M33.188 31.375c-2.729.91-6.425-5.626-4.812-10.578C30.022 17.554 31 13.94 31 11c0-7.18-5.82-11-13-11S5 3.82 5 11c0 2.94.978 6.554 2.624 9.797 1.613 4.952-2.083 11.488-4.812 10.578-3-1-4 3-1 4s8.31-.627 12-4c2.189-2 4.189-2 4.189-2s2 0 4.188 2c3.69 3.373 9 5 12 4s1.999-5-1.001-4z"
              ></path>
              <circle fill="#292F33" cx="14" cy="21" r="2"></circle>
              <circle fill="#292F33" cx="22" cy="21" r="2"></circle>
            </svg>
            <h1 className="mt-4">Octo The AI</h1>
          </div>
        </div>
        <div className="container bg-dark rounded-4 w-100 h-100 p-2">
          <pre className="result">{result}</pre>
        </div>
        <div className="container d-flex prompt-field w-100 justify-content-center align-items-center">
          <input
            type="text"
            className="input"
            placeholder="Ask me something..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={enterSend}
          />
          <button className="btn btn-primary ms-2" onClick={() => handleSend()}>
            <svg viewBox="0 0 24 24" fill="none">
              <g
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.51 4.23l8.56 4.28c3.84 1.92 3.84 5.06 0 6.98l-8.56 4.28c-5.76 2.88-8.11.52-5.23-5.23l.87-1.73c.22-.44.22-1.17 0-1.61l-.87-1.74C1.4 3.71 3.76 1.35 9.51 4.23zM5.44 12h5.4" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
