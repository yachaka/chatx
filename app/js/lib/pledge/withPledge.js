
import React, { Component } from 'react'

// let resolvingPledges = []
// function isResolving(pledge) {
//   return resolvingPledges.indexOf(pledge) !== -1
// }

// function resolved(pledge) {
//   resolvingPledges.splice(resolvingPledges.indexOf(pledge), 1)
// }

// function resolvePledge(pledge, props) {
  // if (resolvingPledges.indexOf(pledge) !== -1)
  //   return
  
  // let res = pledge.resolve(props)
  // if (res.then && res.catch) {
  //   resolvingPledges.push(pledge)
  //   res.then(resolved, resolved)
  // }

// }

export default (pledge, forceFetch) => (WrappedComponent, LoadingComponent = () => null) => {

  class Pledge extends Component {
    state = {
      resolved: pledge.isResolved(this.props),
      resolving: false,
    }

    constructor(props) {
      super(props)
    }

    componentWillMount() {
      if (forceFetch || !pledge.isResolved(this.props)) {
        this.setState({ resolving: true })
        pledge.resolve(this.props)
      }
    }

    componentWillReceiveProps(nextProps) {
      let resolved = pledge.isResolved(nextProps)
      if (!resolved && !this.state.resolving)
        pledge.resolve(nextProps)

      this.setState({
        resolved,
        resolving: !resolved,
      })

    }

    render() {
      const { resolved, resolving } = this.state
      const ToRender = resolved ? WrappedComponent : LoadingComponent

      const additionalProps = {}

      if (resolved && resolving)
        additionalProps.stale = true

      return (
        <ToRender key={resolved ? 'resolved' : 'loading'} {...additionalProps} {...this.props} />
      )
    }
  }

  Pledge.displayName = `Pledge(${WrappedComponent.displayName || WrappedComponent.name})`
  Pledge.propTypes = WrappedComponent.propTypes

  return Pledge
}