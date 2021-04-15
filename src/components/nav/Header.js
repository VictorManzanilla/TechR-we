import React, {useState} from 'react'
import { Menu } from 'antd';
import { BankOutlined , SettingOutlined, RocketOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'


const { SubMenu } = Menu

const Header = () => {
    const [current, setCurrent] = useState('home')

    let dispatch = useDispatch()
    let {user} = useSelector((state) => ({ ...state}))
    let history = useHistory()
    

    const handleClick = (e) => {
      // console.log(e.key)
      setCurrent(e.key)
    }

    const logout = () => {
      firebase.auth().signOut()
      dispatch({
        type: 'LOGOUT',
        payload: null
      })
      history.push("/login")
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home" icon={<BankOutlined />}>
            <Link to="/"> Home - {JSON.stringify(user)}</Link>
          </Menu.Item>

          { !user && (
            <Menu.Item 
            key="register" 
            icon={<RocketOutlined />} 
            className="float-right">
               <Link to="/register"> Register</Link>
            </Menu.Item>
          )}
          
          { !user && (
            <Menu.Item ko7ky--7
            key="login" 
            icon={<UserOutlined />} 
            className="float-right">
                <Link to="/login"> Login</Link>
            </Menu.Item>
          )}

          { user && (
          <SubMenu key="SubMenu" 
          icon={<SettingOutlined />} 
          title={user.email && user.email.split('@')[0]} 
          className="float-right"
          >
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>
          </SubMenu>
          )}
          
              
        </Menu>
      )
}

export default Header