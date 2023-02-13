import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    console.log('oi');
    this.setStorage();
  }

  setStorage = () => {
    const { nameUser, score, emailUser } = this.props;
    const hash = md5(emailUser).toString();

    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    const obj = {
      nome: nameUser,
      img: gravatarUrl,
      score,
    };
    const dados = [obj, ...JSON.parse(localStorage.getItem('ranking') || '[]')];
    const sorted = dados.sort((a, b) => a.nome - b.nome);
    localStorage.setItem('ranking', JSON.stringify(sorted));
    this.setState({ players: sorted });
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <div>
          {
            players.sort((a, b) => b.score - a.score).map((e, index) => (
              <div key={ index }>
                <img src={ e.img } alt={ e.name } />
                <p data-testid={ `player-name-${index}` }>{ e.nome }</p>
                <p data-testid={ `player-score-${index}` }>{ e.score }</p>
              </div>

            ))
            // : players.map((e, index) => (
            //   <div key={ index }>
            //     <img src={ e.img } alt={ e.name } />
            //     <p data-testid={ `player-name-${index}` }>{ e.nome }</p>
            //     <p data-testid={ `player-score-${index}` }>{ e.score }</p>
            //   </div>
            // ))
          }
        </div>
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

const mapStateToProps = (store) => ({
  nameUser: store.loginReducer.loggedName,
  score: store.player.score,
  emailUser: store.loginReducer.loggedEmail,
});

Ranking.propTypes = {
  nameUser: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  emailUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
