import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const limit = 3;

    return (
      <div className="container-feedback">
        <section>
          <Header />
        </section>
        <section className="container-point">
          <p
            data-testid="feedback-text"
          >
            {(assertions >= limit)
              ? 'Well Done!' : 'Could be better...'}
          </p>
          <div>
            Você acertou
          </div>
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          <div>
            questões
          </div>
          <div>
            Um total de
          </div>
          <span data-testid="feedback-total-score">
            { score }
          </span>
          <div>
            pontos
          </div>
          <section>
            <Link to="/ranking">
              <button
                data-testid="btn-ranking"
                className="btn btn-success ms-2 "
              >
                Ranking
              </button>
            </Link>
            <Link to="/">
              <button
                data-testid="btn-play-again"
                className="btn btn-danger ms-2 "
              >
                Play Again
              </button>
            </Link>
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  score: store.player.score,
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
