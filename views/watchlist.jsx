var React = require('react');

class Watchlist extends React.Component {
  render() {
    const test = this.props.item.map( item => {
      let refy = 'movies/'+item.id;
      return <li key={item.title}><div><a href={refy}>{item.title}</a></div><div><img src={item.image}/></div></li>
    });

    return (
      <div>
        <h1>Watchlist:</h1>
        <a href='/watchlist'>Go to Movie List</a>
        <ul>
        {test}
        </ul>
      </div>
    );
  }
}


module.exports = Watchlist;