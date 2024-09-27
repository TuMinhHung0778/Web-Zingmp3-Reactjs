import React from 'react'
import logo from '../assets/img/logo.svg';
import { sidebarMenu } from '../ultil/menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import path from '../ultil/path'
const SidebarLeft = () => {
    const navi = useNavigate()
  return (
    <div className='left'>
        <div onClick={()=> navi(path.HOME)} className='logo'>
            <img src={logo} alt="Logo" className='img_logo'/>
        </div>
        <div className='nav_menu'>
            
            {
                sidebarMenu.map(item =>(
                    <NavLink
             to={item.path} 
             className={'nav_menu_items'}
             key={item.path}
             >
                {item.icons}
                <span style={{fontWeight: 'bold',fontSize: '14px'} }>{item.text}</span>
            </NavLink>
                ))
            }
        </div>
    </div>
  )
}

export default SidebarLeft