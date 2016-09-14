
import React, { Component } from 'react'
import cx from 'classnames'

import PictureBubble from 'components/PictureBubble'
import BounceTransitionGroup from 'components/BounceTransitionGroup'
import s from './styles.css'

const Orbit = ({ size = 32, containerSize, className, offset = 8, angle, children }) => {

  let radians = angle * (Math.PI / 180)

  let widthStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  let origin = containerSize / 2 - size /  2

  let positionStyle = {
    top: origin - Math.sin(radians) * (containerSize / 2 + size / 2 + offset),
    left: origin + Math.cos(radians) * (containerSize / 2 + size / 2 + offset),
  }

  return (
    <div className={cx(s.orbit, 'animated', className)} style={{...widthStyle, ...positionStyle}}>
      {children}
    </div>
  )
}

export default class RoomTile extends Component {

  static defaultProps = {
    size: 160,
  }

  state = {
    orbitsAngle: Math.round(Math.random() * 360),
  }

  componentDidMount() {
    this.interval = setInterval(this.animate, 20)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  animate = () => {
    this.setState({
      orbitsAngle: this.state.orbitsAngle + 0.8,
    })
  }


  render() {
    const { className, size, room, children, ...others } = this.props
    const { orbitsAngle } = this.state
  
    let sizeStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      lineHeight: `${size}px`,
    }

    const deltaAngle = 21

    return (
      <div className={cx(s.tile, className)} style={sizeStyle} {...others}>
        <BounceTransitionGroup>
          { room.users.map((u, i) => (
            <Orbit key={u.id} size={32} containerSize={size} angle={orbitsAngle - i * deltaAngle}>
            <PictureBubble size={32} image={u.avatar} />
            </Orbit>
          ))}
        </BounceTransitionGroup>

        <div className={s.wrap}>
          <h4>{room.name}</h4>
          <p className={s.messagesCount}>
            <i className="fa fa-envelope-o"></i> {room.messages.length}
          </p>
        </div>
      </div>
    )
  }
}