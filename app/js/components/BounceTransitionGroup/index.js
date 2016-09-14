
import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

export default function BounceTransitionGroup(props) {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName={{
        enter: 'bounceIn',
        appear: 'bounceIn',
        leave: 'bounceOut',
      }}
      transitionEnterTimeout={750}
      transitionAppearTimeout={750}
      transitionLeaveTimeout={750}
      {...props}
    >
      {props.children}
    </CSSTransitionGroup>
  )
}
