import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  requestTriviaAPI, dispatchNextQuestion, addNextQuestion } from '../redux/actions/index';
import Header from './Header';
import '../App.css';

class Game extends Component {
  state = {
    isColorCorrect: false,
    isBtnNext: false,
  };

  componentDidMount() {
    this.getQuestions();
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

  render() {
    const { response, nextQuestion, allQuestions } = this.props;
    const { isColorCorrect, isBtnNext } = this.state;
    const numberSorted = 0.5;

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
                <div>
                  <div data-testid="answer-options">
                    {allQuestions.sort(() => Math.random() - numberSorted)
                      .map((question, index) => {
                        const verifyColor = response[nextQuestion]
                          .correct_answer === question
                          ? 'correctColor' : 'incorrectColor';
                        return (

                          <button
                            onClick={ this.handleColor }
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

export default connect(mapStateToProps)(Game);

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
