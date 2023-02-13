import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  redirectInitialPage = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    const { score, assertions } = this.props;
    const limit = 3;

    return (
      <div>
        <section>
          <Header />
        </section>
        <p
          data-testid="feedback-text"
        >
          {(assertions >= limit)
            ? 'Well Done!' : 'Could be better...'}

        </p>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>
        <section>
          <button
            data-testid="btn-play-again"
            onClick={ this.redirectInitialPage }
          >
            Play Again
          </button>
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
