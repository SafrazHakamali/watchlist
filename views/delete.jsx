var React = require('react');

class Delete extends React.Component {
    render() {
    let page = "/movies/"+this.props.id+"?_method=delete";
  	return (
  		<form method="POST" action={page}>
            <div>
               <h1>Delete Movie:</h1>
               <h1>Movie: {this.props.title}</h1>
               <h1>Release Date: {this.props.year}</h1>
               <h1>Overview: {this.props.review}</h1>
               <input type="hidden" name="id" value={this.props.id}/>
               <input type="submit" defaultValue="Delete this movie"/>
               </div>
        </form>
  	)
  }
}

module.exports = Delete;