import React, {useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



import {Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import {currentUser} from './functions/auth'
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/routes/AdminRoute'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/category/subcategory/SubCreate'
import SubUpdate from './pages/admin/category/subcategory/SubUpdate'

import ProductCreate from './pages/admin/product/ProductCreate'
import Products from './pages/admin/product/Products'



const App = () => {
    const dispatch = useDispatch()

    //to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if(user) {
                const idTokenResult = await user.getIdTokenResult()
                // console.log('user', user)

                currentUser(idTokenResult.token)
                .then((res) => {
                // console.log('user data', res.data)
                dispatch({
                    
                    type: 'USER_LOGGED_IN',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id
                    }
                })
            })
            .catch(err => console.log(err))
            }
        })
        //cleanup
        return () => unsubscribe()
    }, [dispatch])

    return(
       <>
        <Header/>
        <ToastContainer/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route  exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/register/complete" component={RegisterComplete}/>
            <Route exact path="/forgot/password" component={ForgotPassword}/>
            <UserRoute exact path="/user/history" component={History}/>
            <UserRoute exact path="/user/password" component={Password}/>
            <UserRoute exact path="/user/wishlist" component={Wishlist}/>
            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
            <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
            <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
            <AdminRoute exact path="/admin/sub" component={SubCreate}/>
            <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate}/>
            <AdminRoute exact path="/admin/product" component={ProductCreate}/>
            <AdminRoute exact path="/admin/products" component={Products}/>





        </Switch>
       </>
    )
}
export default App