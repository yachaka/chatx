
import React from 'react'
import { Link as ReactRouterLink } from 'react-router'



export default function Link(props) {
  return (
    <ReactRouterLink {...props}>{props.children}</ReactRouterLink>
  )
}