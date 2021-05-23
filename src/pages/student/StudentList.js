import React from 'react'
import StudentSearchBar from '../../components/StudentSearchBar';
import StudentTable from '../../components/StudentTable';
// import { searchStudents } from '../../services/student'
import { useState, useEffect } from 'react'
import qs from 'query-string';



/**
 * 该函数用于获取地址栏参数中的查询条件，返回一个对象
 * 如果没有查询条件，返回默认查询条件
 * @param {*} search 
 * @returns 
 */
function getQuery(search){
    let queryDefault={
        page:1,
        limit:10,
        sex:-1,
        key:''
    }
   let query= qs.parse(search);
   let currentquery=Object.assign({},queryDefault,query);//混合默认查询条件和真实的条件
   currentquery.page=+currentquery.page;//将参数值转换成数字类型
   currentquery.limit=+currentquery.limit;//将参数值转换成数字类型
   currentquery.sex=+currentquery.sex;//将参数值转换成数字类型
   return currentquery;//返回当前真实的查询条件，保证查询参数是齐全的并且参数值是数字类型
}

export default function StudentList(props) {
    let query=getQuery(props.location.search)
    const [students, setstudents] = useState([]);
    getQuery(props.location.search)
    useEffect(() => {
            // searchStudents({
            //     page: 1,
            //     limit: 10,
            //     key:'123',
            //     sex:-1
                
            // }).then(res=>{
            //     console.log(res.datas)
            //     setstudents(res.datas)
            // })
    }, [query])//只有地址栏参数改变才触发，useEffect的回调函数

    return (
        <div>
            <StudentSearchBar defaultprops={{
                key: '123',
                sex: 0
            }} />
            <StudentTable stus={students} />
        </div>
    )
}
