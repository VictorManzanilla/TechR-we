import React from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import ProductCreate from './ProductCreate'


const Products = () => {

    return(
        <div className='container-fluid'>
            <div className='row'>
            <div className='col md-2'>
                <AdminNav/>
            </div>
            <div className='col-md-10'> 
            <h1> All Products </h1>
             <br/>
             <ProductCreate />
            </div>
            </div>
            
        </div>
    )

}

export default Products