import React, { Component } from 'react';
class StudentSearchBar extends Component {
    constructor(props) {
        super(props);
        let def = {
            key: '123',
            sex: 0
        }
        this.state = {//混合传入的属性与默认属性，设置为state初始值
            ...def,
            ...this.props.defaultprops
        }
    }
    radioChange = (e) => {
        this.setState({
            ...this.state,
            sex: +e.target.value
        }, () => {
            console.log(this.state)
        })
    }
    searchStudent = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state)
        }
    }
    
    render() {
        return (
            <div>
                关键字：<input type="text" value={this.state.key} onChange={(e) => {
                    this.setState({
                        key: e.target.value,
                    })
                }} />
                <label ><input type="radio" checked={this.state.sex === -1} name="sex" value={-1} onChange={this.radioChange} />不限性别</label>
                <label ><input type="radio" checked={this.state.sex === 0} name="sex" value={0} onChange={this.radioChange} />男</label>
                <label ><input type="radio" checked={this.state.sex === 1} name="sex" value={1} onChange={this.radioChange} />女</label>
                <button onClick={this.searchStudent}>查询</button>
            </div>
        );
    }
}

export default StudentSearchBar;