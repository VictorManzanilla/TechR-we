import axios from 'axios'


export const createProdduct = async (product, authToken) => 
     await axios.post(`${process.env.REACT_APP_API}/product`, product, {
         headers: {
             authToken,
         }
     })