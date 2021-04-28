import axios from 'axios'

export const getCategories = async () => 
     await axios.get(`${process.env.REACT_APP_API}/categories`)

export const getCategory = async (slug) => 
     await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

export const removeCategories = async (slug, authToken) => 
     await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
         headers: {
             authToken,
         }
     })

export const updateCategories = async (slug, category, authToken) => 
     await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
         headers: {
             authToken,
         }
     })

export const createCategories = async (category, authToken) => 
     await axios.post(`${process.env.REACT_APP_API}/category`, category, {
         headers: {
             authToken,
         }
     })