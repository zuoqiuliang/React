import React, { Component } from 'react';

let ctx= React.createContext();
class Tick extends Component {
   
    constructor(props){
        super(props)
        // 初始化状态
        this.state={
            time:this.props.number
        }
      this.timer=  setInterval(() => {
            if(this.state.time===0){
                clearInterval(this.timer);
                return
            }
            this.setState({
                time:this.state.time-1
            })
        }, 1000);
    }
    
    render() {
        return (
            <div>
                剩余时间：{this.state.time}
            </div>
        );
    }
}

export default Tick;