import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct, getProducts} from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {getCategories} from '../../../functions/category'



const initialState = {
        title: 'Iphone 14',
        description: 'New model',
        price: '4',
        categories: [],
        category: '',
        subs: [],
        shipping: 'Yes',
        quantity: '10',
        images: [],
        colors: ["Black", 'Brown', 'Silver', 'White', 'Blue'],
        brands: ["Apple", 'Microsoft', 'Lenovo', 'Samsung', 'ASUS'],
        color: '',
        brand: '',
    
}



const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const [products, setProducts] = useState([])
    
    //product list component to render the products to practice, use hooks products and load
    
    //redux
    const {user} = useSelector((state) => ({ ...state}))
    
    useEffect(() => {
        
        loadCategories()
        loadProducts()
    }, [])

    const loadCategories = () => getCategories().then((c) => setValues({...values, categories: c.data}))
    const loadProducts = () => getProducts().then((p) => setProducts(p.data))

    // 
    const handleSubmit = (e) => {
        e.preventdefault()
        
        createProduct(values, user.token)
        
        
        .then(res => {
        
            console.log(res)
            
            window.alert(`'${res.data.title}' is created`)
            window.location.reload()
    
        })
        .catch((err) => {
            console.log(err)
            if (err.response.status === 4000) toast.error(err.response.data)
            toast.error(err.message.data.err)
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        //  console.log(e.target.name, '----------', e.target.value)
    }

    return(
        <div className='container-fluid'>
        <div className='row'>
            <div className='col md-2'>
                <AdminNav/>
            </div>
            <div className='col-md-10'> 
            <h4> Product create Page</h4>
             <br/>
            
            <ProductCreateForm 
            handleSubmit={handleSubmit} 
            handleChange={handleChange}
            values={values}
            />
            </div>
        </div>
        
        
        
        </div>
    )

}

export default ProductCreate