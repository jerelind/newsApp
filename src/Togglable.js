import React from 'react'

class Togglable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div>
          <div id="newsButtonDiv" style={hideWhenVisible}>
            <div id="headerDiv" onClick={this.toggleVisibility}><h1 className={this.props.className}>{this.props.title}</h1></div>
          </div>
          <div style={showWhenVisible}>
          <div id="headerDiv" onClick={this.toggleVisibility}><h1 className={this.props.className}>{this.props.title}</h1></div>
            {this.props.children}
          </div>
        </div>
      )
    }
  }

  export default Togglable