import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getData = () => {
    return axios.get(baseURL)
}

const addData = (contactAdd) => {
    return axios.post(baseURL, contactAdd)
}

const deleteData = (id) => {
    console.log(id)
    return axios.delete(`${baseURL}/${id}`)
}

const updateData = (id, updateData) => {
    return axios.put(`${baseURL}/${id}`, updateData)
}

export default {
    getData: getData,
    addData: addData,
    deleteData: deleteData,
    updateData: updateData
 
}