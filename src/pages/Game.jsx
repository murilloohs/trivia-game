import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionScore, requestTriviaAPI } from '../redux/actions';
import Header from './Header';

const timer = 1000;

class Game extends Component {
  state = {
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

  questions = () => {
    const { nextQuestion } = this.props;
    const { data } = this.state;
    this.setState({
      allQuestions: [data[nextQuestion].correct_answer,
        ...data[nextQuestion].incorrect_answers,
      ] });
  };

  getQuestions = async () => {
    const request = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${request}`;
    const response = await fetch(url);
    const data = await response.json();
    const responseErro = 3;
    if (data.response_code === responseErro) {
      localStorage.clear('token');
      const { history } = this.props;
      history.push('/');
    } else {
      const { dispatch } = this.props;
      dispatch(requestTriviaAPI());
      this.setState({ data: data.results }, () => this.questions());
    }
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
    const { response, nextQuestion } = this.props;
    const { allQuestions, isDisabled, seconds } = this.state;

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
                      .map((question, index) => (
                        <button
                          key={ question }
                          type="button"
                          id={
                            question === response[nextQuestion].correct_answer
                              ? CORRECT_ANSWER : `wrong-answer-${index}`
                          }
                          data-testid={
                            question === response[nextQuestion].correct_answer
                              ? CORRECT_ANSWER : `wrong-answer-${index}`
                          }
                          disabled={ isDisabled }
                          onClick={ this.handleClick }
                        >
                          {question}
                        </button>
                      ))}
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

const mapStateToProps = ({ trivia: { response, nextQuestion } }) => ({
  response,
  nextQuestion,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  nextQuestion: PropTypes.number.isRequired,
  response: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default connect(mapStateToProps)(Game);
