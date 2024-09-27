import React , {useState } from 'react'
import icons from '../ultil/icon';
import * as actions from '../store/action'
import { useDispatch } from 'react-redux';
import { useNavigate,createSearchParams } from 'react-router-dom';
import path from '../ultil/path';
const Search = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()

    const {AiOutlineSearch} = icons
    const [keyword, setKeyword] = useState('')

    const handleSearch = async(e) =>{
      // setKeyword(e.target.value)
      if(e.keyCode === 13){
        dispath(actions.search(keyword))
        navigate({
          pathname : `/${path.SEARCH}/${path.ALL}`,
          search : createSearchParams({
            q: keyword
          }).toString().replace(' ', '%20')
        })
      }
    }


  return (
    <div className='search_zone'>
    <span className='icon_search'>
        <AiOutlineSearch size={27}/>
    </span>
        <input 
        type="text"
        className='ipt_search'
        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        />
    </div>
  )
}

export default Search