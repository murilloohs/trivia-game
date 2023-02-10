import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestTriviaAPI } from '../redux/actions';
import Header from './Header';

class Game extends Component {
  state = {
    allQuestions: [],
    data: [],
  };

  componentDidMount() {
    this.getQuestions();
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

  render() {
    const { response, nextQuestion } = this.props;
    const { allQuestions } = this.state;
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
                      .map((question, index) => (
                        <button
                          key={ question }
                          data-testid={
                            question === response[nextQuestion].correct_answer
                              ? 'correct-answer' : `wrong-answer-${index}`
                          }
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

export default connect(mapStateToProps)(Game);

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
