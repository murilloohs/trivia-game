import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestTriviaAPI } from '../redux/actions';
import Header from './Header';
import '../App.css';

class Game extends Component {
  state = {
    colorCorret: false,
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    const { dispatch, history } = this.props;
    dispatch(requestTriviaAPI(history));
  };

  handleColor = ({ target }) => {
    const { response, nextQuestion } = this.props;

    console.log('red');
    this.setState({ colorCorret: true });
    console.log(target.value);
    console.log(response[nextQuestion].correct_answer);
  };

  render() {
    const { response, nextQuestion, allQuestions } = this.props;
    const { colorCorret } = this.state;
    const numberSorted = 0.5;
    let color;

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
                          ? 'correntColor' : 'incorretColor';
                        console.log(verifyColor);
                        return (

                          <button
                            onClick={ this.handleColor }
                            value={ question }
                            key={ question }
                            className={ colorCorret === true ? verifyColor : '' }
                            style={ { border: `3px solid ${color}` } }
                            data-testid={
                              question === response[nextQuestion].correct_answer
                                ? 'correct-answer' : `wrong-answer-${index}`
                            }
                          >
                            {question}
                          </button>
                        );
                      })}
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
