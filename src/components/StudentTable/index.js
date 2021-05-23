import React from 'react'
import './index.css'
export default function StudentTable(props) {
  let stulist=  props.stus.map((item)=><tr key={item.id}>
      <td>{item.sNo}</td>
      <td>{item.name}</td>
      <td>{item.sex===0?'男':'女'}</td>
      <td>{item.birth}</td>
      <td>{item.email}</td>
      <td>{item.name}</td>
      </tr>)
    return (
        <table className='tab'>
            <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>出生年月</th>
                    <th>邮箱</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {stulist}
            </tbody>
        </table>
    )
}
