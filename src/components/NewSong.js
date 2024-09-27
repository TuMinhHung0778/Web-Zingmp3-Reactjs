import React, { memo, useState } from "react";
// import { CiGlass } from "react-icons/ci";
import { useSelector } from "react-redux";
import moment from "moment";
import Moment from "react-moment";
import { Tag } from "primereact/tag";
import { useDispatch } from "react-redux";
import * as actions from "../store/action";
import {  Modal  } from 'antd';
import SongItem from "../components/SongItem";
const NewSong = ({songData}) => {
  const { new_song } = useSelector((state) => state.app);
  // console.log(new_song)
  const [tabMusic, setTabMusic] = useState('all');
  const dispatch = useDispatch();
  const warning = () => {
    Modal.warning({
      title: 'Dành Cho Tài Khoản PREMIUM ',
      content: 'Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản PREMIUM để nghe bài hát này.',
    });
  };

  const handleChangeTabMusic = (tab) => {

    setTabMusic(tab)
  }

  const convertTime = (timeMiliseconds) => {
    const timeMusicCurrent = moment.unix(timeMiliseconds).format('YYYY-MM-DD');
    return <Moment fromNow={true}>{timeMusicCurrent}</Moment>
  }

  // const handlePlayMusic = (idmusic) => {

  // }

  return (
    <div className={songData ? 'newSong_search' : 'new_song'}>
      <div className="new_title" style={songData && {display: 'none'}}>
        <h2 className="text_title">{new_song?.title}</h2>
      </div>
      <div className="new_category" style={songData && {display: 'none'}}>
        <div className="btn_category">
          <button type="button" className={`btn_action ${tabMusic === 'all' ? 'tab-active' : ''}`} onClick={()=>handleChangeTabMusic('all')}>
            Tất cả
          </button>
          <button type="button" className={`btn_action ${tabMusic === 'vPop' ? 'tab-active' : ''}`} onClick={()=>handleChangeTabMusic('vPop')}>
            Việt Nam
          </button>
          <button type="button" className={`btn_action ${tabMusic === 'others' ? 'tab-active' : ''}`} onClick={()=>handleChangeTabMusic('others')}>
            Quốc Tế
          </button>
        </div>
        <div>
          <span>Tất Cả</span>
        </div>
      </div>
      <div className="song_items" style={songData && {display: 'none'}}>
        {new_song?.items?.[tabMusic]?.slice(0,12).map((item) => (
          <div key={new_song?.items?.[tabMusic]?.encodeId} className="song_item"
          onClick={() => {
          if (item.streamingStatus !== 2) {
          dispatch(actions.setCurSongId(item?.encodeId));
          dispatch(actions.play(true));
          dispatch(actions.playAlbum(true));
          dispatch(actions.setRecent(item))
          }else{
            warning();
          }
        }}
          >
          
            <div className="item_img">
              <img src={item.thumbnail} alt="" />
            </div>
            <div className="item_title">
              <span className="item_text">
                {item.title.length > 20
                  ? `${item?.title?.slice(0, 20)}...`
                  : item?.title}
                  {item.streamingStatus === 2 && (
                <Tag value="PREMIUM" severity="warning"></Tag>
              )}
              </span>
              <div className="item_artis">
                <span>
                  {item.artistsNames.length > 20
                    ? `${item?.artistsNames?.slice(0, 20)}...`
                    : item?.artistsNames}
                </span>
                <span>{convertTime(item.releaseDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={songData ? 'songItems_search' : 'song_items'} style={songData ? {display: 'flex'} : {display: 'none'}}>
        {songData?.slice(0,6).map((item) => (
          <div key={songData?.encodeId} className={songData ? 'songItem_search' : 'song_item'}
          onClick={() => {
          if (item.streamingStatus !== 2) {
          dispatch(actions.setCurSongId(item?.encodeId));
          dispatch(actions.play(true));
          dispatch(actions.playAlbum(true));
          dispatch(actions.setRecent(item))
          }else{
            warning();
          }
        }}
          >
          
            <div style={{display : 'flex'}}>
            <div className="item_img">
              <img src={item.thumbnail} alt="" />
            </div>
            <div className="item_title">
              <span className="item_text">
                {item.title.length > 20
                  ? `${item?.title?.slice(0, 20)}...`
                  : item?.title}
                  {item.streamingStatus === 2 && (
                <Tag value="PREMIUM" severity="warning"></Tag>
              )}
              </span>
              <div className="item_artis">
                <span>
                  {item.artistsNames.length > 20
                    ? `${item?.artistsNames?.slice(0, 20)}...`
                    : item?.artistsNames}
                </span>
                {songData ? '' : <span>{convertTime(item.releaseDate)}</span>}
              </div>
            </div>
            </div>
                {songData ? <span>{moment.utc(item?.duration * 1000).format("mm:ss")}</span>: ''}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default memo(NewSong);
