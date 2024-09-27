import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { SongPlaylist, AudioLoading, Loading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/action";
import { Skeleton } from "antd";

import icons from "../../ultil/icon";

const {
  BsFillPlayFill,
  AiOutlineHeart,
  BiDotsHorizontalRounded,
  BsPlayCircle,
} = icons;
const Allbum = () => {
  const { pid } = useParams();
  const { curIdSong, isPlay, songs } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
  }, [pid]);
  return (
    <div className="album">
        {playlistData ? <div>
          <div className="thumnail_album">
        {/* <Skeleton.Image active loading={true} className="skeleton-image"/> */}
        <div className="album_img">
          {!playlistData ? (
            <Skeleton.Image active loading={true} className="skeleton-image" />
          ) : (
            <img src={playlistData?.thumbnailM} alt="thumbnail" />
          )}
          <div className={isPlay ? "audio_effect" : "icon_img"}>
            {isPlay ? (
              <AudioLoading />
            ) : (
              <BsPlayCircle size={50} style={{ color: "#E5E5E5" }} />
            )}
          </div>
        </div>
        <div className="album_text">
          {!playlistData ? (
            <Skeleton
              active
              loading={true}
              title={false}
              paragraph={{ rows: 1, width: "100%" }}
              width={"100%"}
              style={{ backgroundColor: "#6D6875", width: "50%",height: "30px"}}
            ></Skeleton>
          ) : (
            <h3>{playlistData?.title}</h3>
          )}
          <span className="album_title">
            <span>Cập nhật: </span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="album_artist">
            <span>
              {/* {playlistData?.artistsNames} */}
              {playlistData?.artistsNames.length > 40
                  ? `${playlistData?.artistsNames?.slice(0, 40)}...`
                  : playlistData?.artistsNames}
            </span>
            <span>
              {`${Math.round(playlistData?.like / 1000)}K người yêu thích`}
            </span>
          </span>
        </div>

        <div>
          <button type="submit" className="btn_thumb">
            <BsFillPlayFill size={25} /> <span>Phát Ngẫu Nhiên</span>
          </button>
        </div>
        <div className="other">
          <div className="other_action">
            <AiOutlineHeart size={24} />
          </div>
          <div className="other_action">
            <BiDotsHorizontalRounded size={24} />
          </div>
        </div>
      </div>

      <div className="playlist_album">
        <span style={{ fontSize: "14px" }}>
          <span style={{ color: "#75707C" }}>Lời Tựa </span>
          <span>{playlistData?.sortDescription}</span>
        </span>
        <div>
          <Scrollbars style={{ width: "100%", height: "90vh" }}>
            <SongPlaylist totalDuration={playlistData?.song?.totalDuration} />
          </Scrollbars>
        </div>
      </div>
        </div> : <div className="loading"><Loading /></div>}
      
    </div>
  );
};

export default Allbum;
