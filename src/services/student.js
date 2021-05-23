import axios from 'axios'

/**
 * 如果传递了key属性，则按照关键字和性别搜索；
 * 如果key没有值，则对所有学生分页
 * @param {*} param0 
 * @returns 
 */
export async function searchStudents({page=1,limit=10,key='',sex=-1}={}){
    // 方式一：fetch  api
    // return await fetch(`/api/student/searchStudent?appkey=18875702527_1591697929883&sex=${sex}&search=${key}&page=${page}&size=${limit}`)
    // .then(resp=>resp.json()).then(res=>res.data)


    // 方式二：axios
    let resp;
    if(key){//按关键字搜索
        resp=await axios.get('/api/student/searchStudent',{
            params:{
                appkey:'18875702527_1591697929883',
                sex,
                search:key,
                page,
                size:limit
            }
        })
        resp.datas=resp.data.data.searchList;
        delete resp.searchList;
    }else{//全部搜索
        resp=await axios.get('/api/student/findAll',{
            params:{
                appkey:'18875702527_1591697929883'
            }
        })
        resp.datas=resp.data.data
    }
    return  resp
}

