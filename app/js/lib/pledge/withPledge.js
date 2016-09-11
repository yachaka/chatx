
import React, { Component } from 'react'

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