import React, { memo } from "react";
import icons from "../ultil/icon";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/action";
import { Modal } from "antd";
import { Tag } from "primereact/tag";
const { BsMusicNoteBeamed } = icons;
const SongItem = ({ songData, isShow = true, order, percent, isChart,isTooltip,isChartHome }) => {
  const dispatch = useDispatch();
  const warning = () => {
    Modal.warning({
      title: "Dành Cho Tài Khoản PREMIUM ",
      content:
        "Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản PREMIUM để nghe bài hát này.",
    });
  };
  return (
    <>
      <div
        className={isTooltip ? 'tooltip' : isChart ? 'song_chart' : 'song'}
        onClick={() => {
          if (songData?.streamingStatus !== 2) {
            dispatch(actions.setCurSongId(songData?.encodeId));
            dispatch(actions.play(true));
            dispatch(actions.playAlbum(true));
            dispatch(actions.setRecent(songData))
            
          } else {
            warning();
          }
        }}
      >
        
        <div className={isChart ? 'infor_chart' : 'info'}>
          <div className={isChart || isChartHome ? 'stt' :''}>
            {isChart || isChartHome ? order && <span>{order}</span> : <span>{isShow ? <BsMusicNoteBeamed /> : ""}</span>}
          </div>
          <div>
            <img
              src={songData?.thumbnail}
              alt="thumbnail"
              style={isChart ? { width: "60px", height: "60px", borderRadius: "5px"} : { width: "40px", height: "40px", borderRadius: "5px"}}
            />
          </div>
          <div className={isChart ? 'songName_chart' : 'song_name'}>
            <div className={isShow ? "name_value" : "name2"}>
              <span>
                {isShow
                  ? songData?.title?.length > 25
                    ? `${songData?.title?.slice(0, 25)}...`
                    : songData?.title
                  : songData?.title?.length > 20
                  ? `${songData?.title?.slice(0, 20)}...`
                  : songData?.title }
              </span>
              {songData?.streamingStatus === 2 && (
                <Tag value="PREMIUM" severity="warning"></Tag>
              )}
            </div>
            <div className={isTooltip ? '' : isShow ? "singer_name" : "artists"}>
              <span>{songData?.artistsNames}</span>
            </div>
          </div>
        </div>
        <div className={isChart ? '' : "album_song"}>
          <div>
            <span>
              {isChart
                ? ""
                : isShow
                ? songData?.album?.title.length > 30
                  ? `${songData?.album?.title?.slice(0, 30)}...`
                  : songData?.album?.title
                : ""}
            </span>
          </div>
        </div>

        <div className={isChart ? 'percent' : "time"}>
          {isChart
            ? percent && <span>{`${percent}%`}</span>
            : isShow
            ? moment.utc(songData?.duration * 1000).format("mm:ss")
            : ""}
        </div>
      </div>
      {isChart ? '' : isShow ? <hr style={{ border: "0.03125rem solid #2B2434" }} /> : ""}
    </>
  );
};

export default memo(SongItem);
