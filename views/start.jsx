var React = require('react');

class Start extends React.Component {
  render() {
  	return (
      <div>
        <div>
           <a href="/register">Register</a>
        </div>
        <div>
           <a href="/login">Login</a>
        </div>
      </div>
  	)
  }
}

module.exports = Start;