var React = require('react');

class New extends React.Component {
  render() {
  	return (
  		<form method="POST" action="/movies">
            Add a Movie:
            <div>
            Title: 
            <input type="text" name="title"/>
            </div>
            <div>
            Release Date:
            <input type="text" name="year"/>
            </div>
            <div>
            Overview:
            <input type="text" name="review"/>
            </div>
            <div>
            <input type="submit" value="Submit"/>
            </div>
        </form>
  	)
  }
}

module.exports = New;