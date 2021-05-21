import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
export default class Layout extends Component {
    static propTypes = {
        header: PropTypes.element,
        aside:PropTypes.element,
        children:PropTypes.element
    }

    render() {
        return (
            <div className='container'>
                <header className='header'>
                    导航区域通过属性传递{this.props.header}
                </header>
                <div className="middle">
                    <div className="aside">
                        左侧菜单栏{this.props.aside}
                    </div>
                    <div className="main">
                        右侧主区域{this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
