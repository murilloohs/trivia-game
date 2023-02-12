import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  requestTriviaAPI, dispatchNextQuestion, addNextQuestion  actionScore} from '../redux/actions/index';

import Header from './Header';
import '../App.css';

const timer = 1000;

class Game extends Component {
  state = {
    isColorCorrect: false,
    isBtnNext: false,
    allQuestions: [],
    data: [],
    seconds: 30,
    isDisabled: false,
    rightAnswers: 0,
  };

  componentDidMount() {
    this.getQuestions();
    this.timerFunction();
  }

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
    this.setState({ isColorCorrect: false });
  };

  timerFunction = () => {
    const { dispatch } = this.props;
    const myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      } else {
        this.setState({
          isDisabled: true,
        });
        clearInterval(myInterval);
        dispatch(actionScore(0));
      }
    }, timer);
  };

  handleClick = ({ target }) => {
    const { dispatch } = this.props;
    const { data, seconds } = this.state;

    const CORRECT_ANSWER = 'correct-answer';
    this.handleColor();

    if (target.id === CORRECT_ANSWER) {
      this.setState((prevState) => ({
        rightAnswers: prevState.rightAnswers + 1,
      }));

      let diff = 0;

      if (data.difficulty === 'easy') {
        diff = 1;
      } else if (data.difficulty === 'medium') {
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
    const { response, nextQuestion, allQuestions } = this.props;
    const { isColorCorrect, isBtnNext, isDisabled, seconds  } = this.state;
    const numberSorted = 0.5;
    const CORRECT_ANSWER = 'correct-answer';

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
                    {allQuestions.sort(() => Math.random() - numberSorted)
                      .map((question, index) => {
                        const verifyColor = response[nextQuestion]
                          .correct_answer === question
                          ? 'correctColor' : 'incorrectColor';
                        return (

                          <button
                            onClick={ this.handleClick }
                            value={ question }
                            key={ question }
                            className={ isColorCorrect === true ? verifyColor : '' }
                            data-testid={
                              question === response[nextQuestion].correct_answer
                                ? 'correct-answer' : `wrong-answer-${index}`
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
