import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
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
};

export default connect(mapStateToProps)(Feedback);
