import React, { Component } from 'react';
import Header from './Header';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <section>
          <Header />
        </section>
        <div data-testid="feedback-text" />
      </div>
    );
  }
}
