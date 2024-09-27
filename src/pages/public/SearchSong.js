import React, {useEffect}from 'react'
import {SongPlaylist ,SongItem} from '../../components'
import { useSelector,useDispatch } from "react-redux";
import * as actions from "../../store/action"
const SearchSong = () => {
  const {searchData} = useSelector(state => state.music)
  const dispath = useDispatch()
  useEffect(() => {
   dispath(actions.getSearchSongs(searchData?.top?.id))
  }, [searchData])
  // console.log(searchData)
  return (
    <div>
      <SongPlaylist />
    </div>
  )
}

export default SearchSong