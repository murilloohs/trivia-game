import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <Link to="/">
          <button
            data-testid="btn-go-home"
          >
            {' '}
            Back to login
          </button>
        </Link>
      </div>
    );
  }
}
