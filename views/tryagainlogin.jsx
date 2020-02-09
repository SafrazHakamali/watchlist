var React = require('react');

class Register extends React.Component {
  render() {
  	return (
  		<form method="POST" action="/loggedinmovies">
            <div>
            Incorrect Login or Password. Please try again.
            </div>
            <div>
            Login:
            </div>
            <div>
            Name: 
            <input type="text" name="name"/>
            </div>
            <div>
            Password:
            <input type="text" name="password"/>
            </div>
            <div>
            <input type="submit" value="Submit"/>
            </div>
        </form>
  	)
  }
}

module.exports = Register;