import React, {useEffect,useState}from 'react'
import { useSelector } from "react-redux";
import {apiGetArtist} from '../../apis'
import { Sections } from '../../components';
import { Scrollbars } from "react-custom-scrollbars-2";
const SearchPlaylist = () => {
  const {searchData} = useSelector(state => state.music)
  const [playlist, setPlaylist] = useState([])
  useEffect(() => {
    const fetch =async()=>{
      const res = await apiGetArtist(searchData?.top.alias)
      if(res.data.err ===0){
        setPlaylist(res.data.data.sections[1])
      }
    }
    fetch()
   }, [])
   console.log(playlist)
  return (
    <div className='playlist_search'>
      <h3>Playlis/Album</h3>
      <div>
        <Scrollbars style={{ width: "100%", height: "90vh" }}>
          <Sections data={playlist.items} isSearch={true} number={50} />
          </Scrollbars>
      </div>
    </div>
  )
}

export default SearchPlaylist