import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  requestTriviaAPI,
  dispatchNextQuestion,
  addNextQuestion,
  actionScore,
  actionAssertions,
  resetScore,
} from '../redux/actions';

import Header from '../components/Header';
import '../App.css';
import '../styles/Game.css';
import logo from '../images/logo.png';

const timer = 1000;
const CORRECT_ANSWER = 'correct-answer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isColorCorrect: false,
      isBtnNext: false,
      seconds: 30,
      isDisabled: false,
      rightAnswers: 0,
      countQuestions: 0,
      questions: [],
    };
    this.myInterval = 0;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.getQuestions();
    this.timerFunction();
    dispatch(resetScore());
  }

  componentDidUpdate(prevProps) {
    const { allQuestions } = this.props;
    if (prevProps.allQuestions !== allQuestions) {
      this.questionsSorted();
    }
  }

  questionsSorted = () => {
    const { allQuestions } = this.props;
    const numberSorted = 0.5;
    const array = allQuestions.sort(() => Math.random() - numberSorted);
    this.setState({ questions: array });
  };

  getQuestions = () => {
    const { dispatch, history } = this.props;
    dispatch(requestTriviaAPI(history));
  };

  handleColor = () => {
    this.setState({ isColorCorrect: true, isBtnNext: true });
  };

  handleDispatch = () => {
    const { dispatch } = this.props;
    const { rightAnswers } = this.state;
    dispatch(dispatchNextQuestion());
    dispatch(addNextQuestion());
    dispatch(actionAssertions(rightAnswers));

    // oldState refere-se aos valores atuais dos estados, passado como parâmetro para atualizar no countQuestions
    this.setState((oldState) => ({ isColorCorrect: false,
      seconds: 30,
      isDisabled: false,
      isBtnNext: false,
      countQuestions: oldState.countQuestions + 1 }
    ));
    this.timerFunction();
    clearInterval(this.myInterval);
    this.timerFunction();
  };

  timerFunction = () => {
    const { dispatch } = this.props;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      } else {
        this.handleColor();
        this.setState({
          isDisabled: true,
          isBtnNext: true,
        });
        clearInterval(this.myInterval);
        dispatch(actionScore(0));
      }
    }, timer);
  };

  handleClick = ({ target }) => {
    const { dispatch, response } = this.props;
    const { seconds } = this.state;
    this.handleColor();
    this.setState(() => ({ isDisabled: true }));
    clearInterval(this.myInterval);

    if (target.id === CORRECT_ANSWER) {
      this.setState((prevState) => ({
        rightAnswers: prevState.rightAnswers + 1,
      }));

      let diff = 0;
      const ten = 10;
      if (response.difficulty === 'easy') {
        diff = 1;
      } else if (response.difficulty === 'medium') {
        diff = 2;
      } else {
        const diffNumber = 3;
        diff = diffNumber;
      }
      const score = ten + (seconds * diff);
      dispatch(actionScore(score));
    }
  };

  render() {
    const { response, nextQuestion } = this.props;
    const {
      isColorCorrect,
      isBtnNext,
      isDisabled,
      seconds,
      questions,
      countQuestions,
    } = this.state;

    const numberOfQuestions = 5;
    if (countQuestions === numberOfQuestions) {
      return (
        <Redirect to="/feedback" />
      );
    }
    return (
      <div className="container-game">
        <section>
          <Header />
        </section>
        <img src={ logo } alt="logo" className="logo-game" />
        {
          response.length > 0
            ? (
              <div className="container-questions-all">
                <div className="container-questions">
                  <p
                    data-testid="question-category"
                    className="category"
                  >
                    {response[nextQuestion].category}

                  </p>
                  <p
                    data-testid="question-text"
                    className="question"
                  >
                    { response[nextQuestion].question }
                  </p>

                  <p className="seconds">
                    <span className="spinner" />
                    { seconds }
                  </p>
                </div>
                <div className="container-answer">
                  <div data-testid="answer-options">
                    {questions.map((question, index) => {
                      const verifyColor = response[nextQuestion]
                        .correct_answer === question
                        ? 'correctColor' : 'incorrectColor';
                      return (
                        <button
                          onClick={ this.handleClick }
                          id={
                            question === response[nextQuestion].correct_answer
                              ? CORRECT_ANSWER : `wrong-answer-${index}`
                          }
                          disabled={ isDisabled }
                          value={ question }
                          key={ question }
                          className={ isColorCorrect === true ? verifyColor : '' }
                          data-testid={
                            question === response[nextQuestion].correct_answer
                              ? CORRECT_ANSWER : `wrong-answer-${index}`
                          }
                        >
                          {question}
                        </button>
                      );
                    })}
                    {
                      isBtnNext
                      && (
                        <button
                          data-testid="btn-next"
                          onClick={ this.handleDispatch }
                          className="btn btn-success"
                        >
                          Next
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            )
            : (<p className="category">carregando...</p>)
        }
      </div>
    );
  }
}

const mapStateToProps = ({ trivia: { response, nextQuestion, allQuestions } }) => ({
  response,
  nextQuestion,
  allQuestions,
});

Game.propTypes = {
  allQuestions: PropTypes.shape({
    sort: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.number.isRequired,
  response: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
export default connect(mapStateToProps)(Game);
