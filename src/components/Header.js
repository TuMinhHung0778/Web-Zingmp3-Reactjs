import React from 'react'
import icons from '../ultil/icon';
import {Search} from './';
import { useNavigate, useParams } from 'react-router-dom'
import {Login} from "../pages/public"
const {FaArrowLeft, FaArrowRight} = icons 
const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='header_left'>
        <div className='control'>
          <span onClick={() => navigate(-1)}><FaArrowLeft size={24}/></span>
          <span onClick={() => navigate(-1)}><FaArrowRight size={24}/></span>
        </div>
        <div className='search'>
          <Search />
        </div>
      </div>
      <div className='header_right'>
        <Login/>
      </div>
    </>
  )
}

export default Header