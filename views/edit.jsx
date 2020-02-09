var React = require('react');

class Edit extends React.Component {
    render() {
    let page = "/movies/"+this.props.id+"?_method=put";
  	return (
  		<form method="POST" action={page}>
            Edit Movie {this.props.id}:
            <div>
            Title: 
            <input type="text" name="title" defaultValue={this.props.title}/>
            </div>
            <div>
            Release Date:
            <input type="text" name="year" defaultValue={this.props.year}/>
            </div>
            <div>
            Overview:
            <input type="text" name="review" defaultValue={this.props.review}/>
            </div>
            <div>
            <input type="submit" defaultValue="Submit"/>
            </div>
        </form>
  	)
  }
}

module.exports = Edit;