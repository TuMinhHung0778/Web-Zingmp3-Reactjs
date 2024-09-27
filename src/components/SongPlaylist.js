import React from 'react'
import  { SongItem } from './';
import moment from 'moment';
import icons from '../ultil/icon';
import { useSelector } from 'react-redux';
const {BsDot} = icons;
const SongPlaylist = ({ totalDuration}) => {
    // console.log(songs, totalDuration)
    const {songs} = useSelector(state => state.music)
  return (
    <div>
        {totalDuration ? '' : <h3 style={{marginLeft: '70px',fontSize :'25px'}}>Bài Hát</h3>}
         <div className={totalDuration ? 'listsong' : 'listsong_search'}>
        {totalDuration && <div>
          <div className='listsong_title'>
            <span style={{width: '45%'}}>BÀI HÁT</span>
            <span style={{width: '45%'}}>ALBUM</span>
            <span style={{width: '10%'}}>THỜI GIAN</span>
        </div>
        <hr style={{border: '1px solid #2B2434'}}/>
        </div>}
        <div className='listsong_items'>
          {songs?.map(item =>(<SongItem key={item.encodeId} songData={item} />))}
        </div>

      </div>
     {totalDuration &&  <div style={{display : 'flex',alignItems: 'center'}}>
        <span>{`${songs?.length}`} bài hát</span>
        <BsDot size={25}/>
        <span>
          {moment.utc(totalDuration * 1000).format("H Giờ mm " ) + `${'phút'}`}
        </span>
      </div>}
    </div>
  )
}

export default SongPlaylist