// import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import options from '../../../static/Images/options.png';
import answer from '../../../static/Images/answer.png';
import fiftyFifty from '../../../static/Images/fiftyFifty.png';
import hints from '../../../static/Images/hints.png';
import useLoader from "../../../Hooks/useLoader";

// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';
function QuizInstructions() {
    useLoader();
    return (
        <div className="gradient-bg-2 pt-4">

            <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
            <div className="instructions container">
                <h1>How To play the Quiz</h1>
                <p>Ensure you read this instructions from start to finish.</p>
                <ul className="browser-default" id="main-list">
                    <li>The Quiz has a duration of 15 minutes and ends as soon as your time elapses.</li>
                    <li>Each quiz consists 0f 25 questions.</li>
                    <li>Choose from our three distinctive levels of difficulty - basic, intermediate, and advanced - to embark on a journey of intellectual discovery tailored to your expertise.</li>
                    <li>
                        Every question contains 4 options.
                        <img src={options} alt="Quiz App Options example" />
                    </li>
                    <li>
                        Select the option which best answers the question by clicking (or selecting) it.
                        <img src={answer} alt="Quiz App Answer example" />
                    </li>
                    <li>
                        Each game has 2 lifelines namely:
                        <ul id="sublist">
                            <li>2 50-50 chances</li>
                            <li>5 Hints</li>
                        </ul>
                    </li>
                    <li>
                        selecting a 50-50 lifeline by clicking the icon
                        <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                        will remove 2 wrong answers, leaving the correct answer and one incorrect answer.
                        <br />
                        <img src={fiftyFifty} alt="Quiz App Fifty-Fifty example" />
                    </li>
                    <li>
                        Using a hint by the icon
                        <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                        will remove one wrong answer leaving two wrong answers and one correct answer. You can use as many hints as possible on a single question.
                        <img src={hints} alt="Quiz App hints example" />
                    </li>
                    <li>
                        Feel Free to quit (or retire from) the game at any time. In that case your score will be revealed afterwards.
                    </li>
                    <li>
                        The timer starts as soon as the game loads.
                    </li>
                    <li>
                        Let's do this if you think you've got what it takes?
                    </li>
                </ul>
                <div className="d-flex justify-content-between">
                    <span><Link to="/IqTest" className="text-decoration-none text-primary">No take me back</Link></span>
                    <span><Link to="/IqTest/modes" className="text-decoration-none text-primary">Okay, Let's do this!</Link></span>
                </div>
            </div>
        </div >
    );
}

export default QuizInstructions;