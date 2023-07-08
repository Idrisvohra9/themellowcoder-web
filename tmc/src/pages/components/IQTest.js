import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useLoader from "../../Hooks/useLoader";

// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';
// note :- Helmet is a nodejs package that helps protect your server from some well-known web vulnerabilities by setting HTTP response headers appropriately, it comes with a collection of several middleware functions that set security headers that are returned from your express application. The top-level helmet function is a wrapper around 15 smaller middlewares.

function Home() {
    useLoader();
    return (
        <Fragment>
            <Helmet><title>Quiz - App Home</title></Helmet>
            <div id="home">
                <section>
                    <h1>The Mellow Coder </h1>
                    <div style={{ textAlign: 'center' }}>
                        <svg width="900" height="900" style={{ width: "45px", height: "45px", fill: "#f8f8f8", marginBottom: "1rem" }} viewBox="0 0 256 256"><path d="M248 132a56.121 56.121 0 00-32-50.61V72a47.983 47.983 0 00-88-26.493A47.983 47.983 0 0040 72v9.39a56.003 56.003 0 000 101.196V184a47.983 47.983 0 0088 26.493A47.983 47.983 0 00216 184v-1.414A56.067 56.067 0 00248 132zM88 216a32.043 32.043 0 01-31.812-28.557A56.174 56.174 0 0064 188h8a8 8 0 000-16h-8a40.008 40.008 0 01-13.334-77.726 8 8 0 005.333-7.542L56 72a32 32 0 0164 0v76.261A47.803 47.803 0 0088 136a8 8 0 000 16 32 32 0 010 64zm104-44h-8a8 8 0 000 16h8a56.174 56.174 0 007.812-.557A31.999 31.999 0 11168 152a8 8 0 000-16 47.803 47.803 0 00-32 12.261V72a32 32 0 1164 0l.001 14.732a8 8 0 005.333 7.542A40.008 40.008 0 01192 172zM60 128a8 8 0 010-16 20.023 20.023 0 0020-20v-8a8 8 0 0116 0v8a36.04 36.04 0 01-36 36zm144-8a8 8 0 01-8 8 36.04 36.04 0 01-36-36v-8a8 8 0 0116 0v8a20.023 20.023 0 0020 20 8 8 0 018 8z"></path></svg>
                    </div>
                    <h1>Quiz App</h1>
                    <div className="play-button-container">
                        <ul className="list-unstyled">
                            <li><Link className="play-button" to="instructions">play</Link></li>
                        </ul>
                    </div>
                </section>
            </div>
        </Fragment>
    );
}
export default Home;