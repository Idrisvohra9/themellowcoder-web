import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom';
import useLoader from "../../Hooks/useLoader";

function MyComponentWrapper() {
    const location = useLocation();
    useLoader();
    return <QuizSummary location={location} />;
}

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberofQuestions: 0,
            numberofAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
        };
    }

    componentDidMount() {
        const { location } = this.props;
        const { state } = location;
        if (state) {
            this.setState({
                score: (state.score / state.numberofQuestions) * 100,
                numberofQuestions: state.numberofQuestions,
                numberofAnsweredQuestions: state.numberofAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        }
    }

    render() {
        const { location } = this.props;
        const { state } = location;

        let stats, remark;
        if (state.score !== undefined && state.score !== null) {

            if (state.score <= 5) {
                remark = 'You need more practice!';
            }
            else if (state.score > 5 && state.score <= 10) {
                remark = 'Better luck next time';
            }
            else if (state.score <= 15 && state.score > 10) {
                remark = 'You can do better';
            }
            else if (state.score >= 15 && state.score <= 20) {
                remark = 'You did great!!';
            }
            else {
                remark = 'You\'re an absolute genius!';
            }
        }

        if (state !== undefined && state !== null) {
            stats = (
                <Fragment>
                    <div className="summary-icon-container">
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1 className="summary-heading">Quiz has ended</h1>
                    <div className="summary-container">
                        <h4 className="summary-remark">{remark}</h4>
                        <h2 className="summary-score">Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <div className="summary-stats-container">
                            <div className="summary-stat">
                                <span className="summary-stat-label">Total number of questions:</span>
                                <span className="summary-stat-value">{this.state.numberofQuestions}</span>
                            </div>
                            <div className="summary-stat">
                                <span className="summary-stat-label">Number of attempted questions:</span>
                                <span className="summary-stat-value">{this.state.numberofQuestions}</span>
                            </div>
                            <div className="summary-stat">
                                <span className="summary-stat-label">Number of Correct Answers:</span>
                                <span className="summary-stat-value">{this.state.correctAnswers}</span>
                            </div>
                            <div className="summary-stat">
                                <span className="summary-stat-label">Number of Wrong Answers:</span>
                                <span className="summary-stat-value">{this.state.wrongAnswers}</span>
                            </div>
                            <div className="summary-stat">
                                <span className="summary-stat-label">Hints used:</span>
                                <span className="summary-stat-value">{this.state.hintsUsed}</span>
                            </div>
                            <div className="summary-stat">
                                <span className="summary-stat-label">50-50 Used:</span>
                                <span className="summary-stat-value">{this.state.fiftyFiftyUsed}</span>
                            </div>
                        </div>
                    </div>
                    <div className="summary-button-container">
                        <Link to="/IqTest" className="summary-button">Back to Home</Link>
                    </div>
                </Fragment>
            );
        } else {
            stats = (
                <Fragment>
                    <div className="summary-icon-container">
                        <span className="mdi mdi-alert-circle-outline failure-icon"></span>
                    </div>
                    <h1 className="summary-heading">Oops! Something went wrong</h1>
                    <div className="summary-container">
                        <h4 className="summary-remark">Unable to load quiz summary</h4>
                    </div>
                    <div className="summary-button-container">
                        <Link to="/IqTest" className="summary-button">Back to Home</Link>
                    </div>
                </Fragment>
            );
        }
        return (
            <div className="quiz-summary-container">
                <Helmet>
                    <title>Quiz Summary</title>
                </Helmet>
                {stats}
            </div>
        );
    }
}
export default MyComponentWrapper;