import axios from 'axios'
const requset=axios.create({
    baseURL:'/api'
})
export default requset