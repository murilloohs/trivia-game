import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  requestTriviaAPI,
  dispatchNextQuestion,
  addNextQuestion,
  actionScore,
} from '../redux/actions';

import Header from './Header';
import '../App.css';

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
      questions: [],
    };
    this.myInterval = 0;
  }

  componentDidMount() {
    this.getQuestions();
    this.timerFunction();
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
    dispatch(dispatchNextQuestion());
    dispatch(addNextQuestion());
    this.setState({ isColorCorrect: false, seconds: 30, isDisabled: false });
    this.timerFunction();
    clearInterval(this.myInterval);
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
        this.setState({
          isDisabled: true,
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

    if (target.id === CORRECT_ANSWER) {
      this.setState((prevState) => ({
        rightAnswers: prevState.rightAnswers + 1,
      }));

      let diff = 0;

      if (response.difficulty === 'easy') {
        diff = 1;
      } else if (response.difficulty === 'medium') {
        diff = 2;
      } else {
        const diffNumber = 3;
        diff = diffNumber;
      }
      const ten = 10;
      const score = ten + (seconds * diff);
      dispatch(actionScore(score));
    }
  };

  render() {
    const { response, nextQuestion } = this.props;
    const { isColorCorrect, isBtnNext, isDisabled, seconds, questions } = this.state;

    return (
      <div>
        <h1>TRIVIA</h1>
        <section>
          <Header />
        </section>
        {
          response.length > 0
            ? (
              <div>
                <p data-testid="question-text">{ response[nextQuestion].question }</p>
                <p data-testid="question-category">{response[nextQuestion].category}</p>
                <p>{ seconds }</p>
                <div>
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
                        >
                          Next
                        </button>
                      )
                    }
                  </div>
                </div>

              </div>
            )
            : (<p>carregando...</p>)
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
