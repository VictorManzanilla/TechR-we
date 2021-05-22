import React, {useState, useEffect} from 'react'
import AdminNav from '../../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {updateSub, getSub, } from '../../../../functions/sub'
import CategoryForm from '../../../../components/forms/CategoryForm'
import { getCategories } from '../../../../functions/category'



const SubUpdate = ({match, history}) => {
    //redux
    const {user} = useSelector((state) => ({ ...state}))

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState('')

    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))

    const loadSub = () => 
    getSub(match.params.slug).then((s) => {
    setName(s.data.name)
    setParent(s.data.parent)
})


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(name)
        setLoading(true)
        updateSub(match.params.slug, {name, parent}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`'${res.data.name}' is updated!`)
            history.push('/admin/sub')
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }


   

   
    
    return(
        <div className='container-fluid'>
        <div className='row'>
            <div className='col md-2'>
                <AdminNav/>
            </div>
            <div className='col'> 
            {loading ? (<h4 className="text-danger">Loading...</h4>)
            :
            (<h4>Update Sub Category</h4>)}
            <br/>

            <div className="form-group">
                <label> Parent Category</label>
                <select 
                name="category" 
                className="form-control"
                onChange={(e) => setParent(e.target.value)}
                >
                    <option>Please select</option>
                    {categories.length > 0 && categories.map((category) => 
                    (<option key={category._id} value={category._id} selected={category._id === parent}>{category.name}</option>))}
                </select>
            </div>
           
            <br/>
            <CategoryForm handleSubmit={handleSubmit}name={name} setName={setName}/>
            <br/>
            
           
            </div>

        </div>

    </div>
    )
}

export default SubUpdate

