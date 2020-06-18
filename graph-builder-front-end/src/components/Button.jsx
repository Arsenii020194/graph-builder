import React from 'react'
import {connect} from 'react-redux'
import {sayHello} from '../actions/App'

export default class Button extends React.Component {
  render() {
    const {whatsUp, stateObject, saySomething} = this.props
    debugger
    return (<div>
      <button onClick={saySomething}>
        PRESS TO DISPATCH FIRST ACTION
      </button>
      <h2>{whatsUp}</h2>
      <button onClick={() => console.log('Redux State:', stateObject)}>
        Press to inspect STATE in console panel
      </button>
    </div>)
  }
}
const mapStateToProps = (state) => ({
  whatsUp: state.say,
  stateObject: state
})
const mapDispatchToProps = (dispatch) => ({
  saySomething: () => { dispatch(sayHello())}
})

Button = connect(
    mapStateToProps,
    mapDispatchToProps
)(Button)
