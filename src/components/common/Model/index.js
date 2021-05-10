import React from 'react'
import './index.css'
export default function Index(props) {
    let defaultProps={
        bg:'rgba(0,0,0,.5)'
    }
    let data={
        ...defaultProps,
        ...props
    }
    console.log(data)
    return (
        <div className='model' style={{
            background:data.bg
        }}>
            <div className="model_center">
            {props.children}
            </div>
        </div>
    )
}
