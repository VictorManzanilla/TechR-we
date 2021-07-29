import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../functions/product'

const initialState = {
        title: 'Iphone 14',
        description: 'New model',
        price: '1000',
        categories: [],
        category: '',
        subs: [],
        shipping: 'Yes',
        quantity: '10',
        images: [],
        colors: ["Black", 'Brown', 'Silver', 'White', 'Blue'],
        brands: ["Apple", 'Microsoft', 'Lenovo', 'Samsung', 'ASUS'],
        color: '',
        brand: ''
    
}



const ProductCreate = () => {
    const [values, setValues] = useState(initialState)

    //redux
    const {user} = useSelector((state) => ({ ...state}))

    //destructure
    const {title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand,} = values

    const handleSubmit = (e) => {
       
        e.preventdefault()

        createProduct(values, user.token)
        
        .then((res) => {
        
            console.log(res)
            
            window.alert(`'${res.data.title}' is created`)
            window.location.reload()
    
        })
        .catch((err) => {
            console.log(err)
            // if (err.response.status === 4000) toast.error(err.response.data)
            toast.error(err.message.data.err)
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        // console.log(e.target.name, '----------', e.target.value)
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
            
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                    type="text"
                    name="title"
                    className='form-control'
                    value={title}
                    onChange={handleChange}
                    />

                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input
                    type="text"
                    name="description"
                    className='form-control'
                    value={description}
                    onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input
                    type="number"
                    name="price"
                    className='form-control'
                    value={price}
                    onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Shipping</label>
                    <select
                    name="shipping"
                    className='form-control'
                    onChange={handleChange}
                    >
                <option>Please Select</option> 
                 <option value='No'>No</option> 
                 <option value='Yes'>Yes</option>        
                    </select>
                </div>
                <div className='form-group'>
                    <label>Quantity</label>
                    <input
                    type="number"
                    name="quantity"
                    className='form-control'
                    value={quantity}
                    onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Color</label>
                    <select
                    name="color"
                    className='form-control'
                    onChange={handleChange}
                    >
                 <option>Please Select</option> 
                    {colors.map(c => <option key={c} value={c}>
                        {c}
                    </option>)}     
                    </select>
                </div>
                <div className='form-group'>
                    <label>Brand</label>
                    <select
                    name="brand"
                    className='form-control'
                    onChange={handleChange}
                    >
                 <option>Please Select</option> 
                    {brands.map(b => <option key={b} value={b}>
                        {b}
                    </option>)}     
                    </select>
                </div>
                <br/>
                        <button className='btn btn-outline-info'>Save</button>
            </form>
            </div>

        </div>
        </div>
    )

}

export default ProductCreate