var React = require('react');

class Show extends React.Component {
  render() {
  	return (
  		<form method="POST" action="/movieswl">
            <div>
               <h1>Movie: {this.props.title}</h1>
               <img src = {this.props.image}/>
               <h1>Release Date: {this.props.year}</h1>
               <h1>Overview: {this.props.review}</h1>
               <input type="hidden" name="id" value={this.props.id}/>
               <input type="submit" defaultValue="Add to Watch List"/>
               </div>
        </form>
  	)
  }
}

module.exports = Show;