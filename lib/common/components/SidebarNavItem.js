// @flow

import Icon from '@conveyal/woonerf/components/icon'
import React, {Component} from 'react'
import {Link} from 'react-router'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

import {POPOVER} from './Sidebar'

type Props = {
  // data-test-id is an end-to-end test identifier utilized in EditorSidebar.
  'data-test-id'?: string,
  active?: boolean,
  disabled?: boolean,
  expanded: boolean,
  icon: string,
  image?: ?string,
  keyName: $Values<typeof POPOVER>,
  label: string,
  link?: string,
  loading?: boolean,
  onClick: $Values<typeof POPOVER> => void
}

type State = {hover: boolean}

export default class SidebarNavItem extends Component<Props, State> {
  state = {
    hover: false
  }

  _onClick = () => this.props.onClick(this.props.keyName)

  toggleHover = () => this.setState({ hover: !this.state.hover })

  render () {
    const {
      active,
      disabled,
      expanded,
      image,
      icon,
      loading,
      label,
      link
    } = this.props
    const activeColor = disabled
      ? '#777'
      : active
        ? '#fff'
        : this.state.hover
          ? '#fff'
          : '#ccc'

    const containerStyle = {
      backgroundColor: active ? '#313131' : 'rgba(0,0,0,0)',
      borderLeft: active ? '4px solid #2889CA' : '4px solid rgba(0,0,0,0)',
      color: activeColor,
      cursor: 'pointer',
      marginBottom: 5,
      marginLeft: -15,
      marginRight: active ? 10 : 0,
      marginTop: 5,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: expanded ? 10 : 10,
      paddingTop: 10,
      textDecoration: 'none'
    }
    const container = (
      <div
        style={containerStyle}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={!link && this._onClick}>
        <NavIcon
          icon={icon}
          disabled={disabled}
          image={image}
          loading={loading} />
        {expanded && <div className='sidebar-nav-label'>{label}</div>}
        <div style={{ clear: 'both' }} />
      </div>
    )
    const navItem = disabled
      ? <div className='link-disabled'>
        {container}
      </div>
      : link // && !disabled
        ? <Link
          data-test-id={this.props['data-test-id']}
          disabled={disabled}
          style={{textDecoration: 'none'}}
          to={link}
        >
          {container}
        </Link>
        : container
    return expanded
      ? navItem
      : <OverlayTrigger
        overlay={expanded
          ? null
          : <Tooltip id={label}>{label}</Tooltip>
        }>
        {navItem}
      </OverlayTrigger>
  }
}

type IconProps = {
  disabled: ?boolean,
  icon: string,
  image: ?string,
  loading: ?boolean
}

class NavIcon extends Component<IconProps> {
  render () {
    const {disabled, icon, image, loading} = this.props
    return image
      ? <div
        disabled={disabled}
        className='SidebarNavItemImage'>
        <img alt='App logo' width={40} height={40} src={image} />
      </div>
      : <div
        disabled={disabled}
        className='SidebarNavItemIcon'>
        <Icon
          type={icon}
          size='lg'
          className={loading ? 'fa-spin fa-lg' : 'fa-lg'} />
      </div>
  }
}
