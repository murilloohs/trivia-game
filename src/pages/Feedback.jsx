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

    return (
      <div>
        <section>
          <Header />
        </section>
        <div data-testid="feedback-text" />
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
