var React = require('react');

class Index extends React.Component {
  render() {
    const test = this.props.item.map( item => {
      let refy = 'movies/'+item.id;
      return <li key={item.title}><div><a href={refy}>{item.title}</a></div></li>
    });

    return (
      <div>
        <h1>Movies:</h1>
        <h2>
        <a href='/watchlist'>Go to Watchist</a>
        </h2>
        <ul>
        {test}
        </ul>
      </div>
    );
  }
}

module.exports = Index;