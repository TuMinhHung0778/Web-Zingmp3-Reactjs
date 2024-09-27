import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink,  useSearchParams } from 'react-router-dom'
import {SearchMenu} from '../../ultil/menu'
import { useSelector } from 'react-redux'
import {Loading } from "../../components";

const Searchs = ({isActive}) => {
 const {keyword} = useSelector(state => state.music)
  return (
    <div className='searchs'>
      {keyword ? <div>
        <div className='search_all'>
        <div className='searchAll_header'>
            <span style={{fontSize : '24px', fontWeight : 'bolder', paddingRight :'24px',borderRight :'4px solid #2F2739'}}>Kết quả tìm kiếm</span>
            <div className='list_search'>
            {SearchMenu.map(item =>(
              <NavLink
               key={item.path}
               to={`${item.path}?q=${keyword.replace(' ','%20')}`}
               className={({isActive} ? 'active_search' : '')}
              >
                {item.text}
              </NavLink>
            ))}
            </div>
        </div>
    </div>
        <div>
            <Outlet />
        </div>
      </div> : <div className="loading"><Loading /></div>}
    </div>
  )
}

export default Searchs