import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../store/action";
import { Modal } from "antd";
import { Tag } from "primereact/tag";
import {NewSong, Sections, ArtistSame} from '../../components'
const SearchAll = () => {
  const { searchData } = useSelector(state => state.music);
  const handleChangeNumber = (number) => {
    if (number > Math.pow(10, 6)) {
      return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`;
    } else if (number > Math.pow(10, 3)) {
      return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}k`;
    }else{
       return number
    }
  };

  const dispatch = useDispatch();
  const warning = () => {
    Modal.warning({
      title: "Dành Cho Tài Khoản PREMIUM ",
      content:
        "Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản PREMIUM để nghe bài hát này.",
    });
  };
  return (
    <div className="searchAll">
      <div>
        <div>
        <h3>Nổi Bật</h3>
        <div className="search_popular">
          {searchData?.top && (
            <div className="card_artist">
              <div className="avatar_card">
                <img
                  src={searchData.top.thumbnail}
                  alt="avatar"
                  style={
                    searchData.top.objectType === "artist"
                      ? { borderRadius: "50%" }
                      : searchData.top.objectType === "song"
                      ? { borderRadius: "12px" }
                      : {}
                  }
                />
              </div>

              <div className="card_title">
                <span
                  style={{
                    fontSize: "16px",
                    color: "#7C7783",
                    marginBottom: "8px",
                  }}
                >
                  {searchData.top.objectType === "artist"
                    ? "Nghệ Sĩ"
                    : searchData.top.objectType === "song"
                    ? "Bài Hát"
                    : ""}
                </span>
                <span style={{ fontSize: "18px" }}>
                  {searchData.top.title || searchData.top.name}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span style={{ fontSize: "16px", color: "#7C7783" }}>
                    {handleChangeNumber(searchData.artists[0].totalFollow) +
                      " quan tâm"}
                  </span>
                )}
                {searchData.top.objectType === "song" && (
                  <span style={{ fontSize: "16px", color: "#7C7783" }}>
                    {searchData.top.artistsNames}
                  </span>
                )}
              </div>
            </div>
          )}

          {searchData?.songs && (
            <div className="card_artist"
             onClick={() => {
          if (searchData?.songs?.streamingStatus !== 2) {
            dispatch(actions.setCurSongId(searchData.top.objectType === "artist"
                      ? searchData.songs[0].encodeId
                      : searchData.top.objectType === "song"
                      ? searchData.songs[1].encodeId
                      : ""));
            dispatch(actions.play(true));
            dispatch(actions.playAlbum(true));
            dispatch(actions.setRecent(searchData.top.objectType === "artist"
                      ? searchData.songs[0]
                      : searchData.top.objectType === "song"
                      ? searchData.songs[1]
                      : ""))
            
          } else {
            warning();
          }
        }}
            >
              <div className="avatar_card">
                <img
                  src={
                    searchData.top.objectType === "artist"
                      ? searchData.songs[0].thumbnail
                      : searchData.top.objectType === "song"
                      ? searchData.songs[1].thumbnail
                      : ""
                  }
                  alt="avatar"
                  style={{ borderRadius: "12px" }}
                />
              </div>

              <div className="card_title">
                <span
                  style={{
                    fontSize: "16px",
                    color: "#7C7783",
                    marginBottom: "8px",
                  }}
                >
                  Bài Hát
                </span>
                <span style={{ fontSize: "18px" }}>
                  {searchData.top.objectType === "artist"
                    ? searchData.songs[0].title
                    : searchData.top.objectType === "song"
                    ? searchData.songs[1].title
                    : ""}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span style={{ fontSize: "16px", color: "#7C7783" }}>
                    {searchData.songs[0].artistsNames}
                  </span>
                )}
                {searchData.top.objectType === "song" && (
                  <span style={{ fontSize: "16px", color: "#7C7783" }}>
                    {searchData.songs[1].artistsNames}
                  </span>
                )}
              </div>
              {searchData.songs?.streamingStatus === 2 && (
                <Tag value="PREMIUM" severity="warning"></Tag>
              )}
            </div>
          )}
          {searchData?.songs && (
            <div className="card_artist"
            onClick={() => {
          if (searchData?.songs?.streamingStatus !== 2) {
            dispatch(actions.setCurSongId(searchData.top.objectType === "artist"
                      ? searchData.songs[1].encodeId
                      : searchData.top.objectType === "song"
                      ? searchData.songs[2].encodeId
                      : ""));
            dispatch(actions.play(true));
            dispatch(actions.playAlbum(true));
            dispatch(actions.setRecent(searchData.top.objectType === "artist"
                      ? searchData.songs[1]
                      : searchData.top.objectType === "song"
                      ? searchData.songs[2]
                      : ""))
            
          } else {
            warning();
          }
        }}>
              <div className="avatar_card">
                <img
                  src={
                    searchData.top.objectType === "artist"
                      ? searchData.songs[1].thumbnail
                      : searchData.top.objectType === "song"
                      ? searchData.songs[2].thumbnail
                      : ""
                  }
                  alt="avatar"
                  style={{ borderRadius: "12px" }}
                />
              </div>

              <div className="card_title">
                <span
                  style={{
                    fontSize: "16px",
                    color: "#7C7783",
                    marginBottom: "8px",
                  }}
                >
                  Bài Hát
                </span>
                <span style={{ fontSize: "18px" }}>
                  {searchData.top.objectType === "artist"
                    ? searchData.songs[1].title
                    : searchData.top.objectType === "song"
                    ? searchData.songs[2].title
                    : ""}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span style={{ fontSize: "16px", color: "#7C7783" }}>
                    {searchData.songs[1].artistsNames}
                  </span>
                )}
                {searchData.top.objectType === "song" && (
                  <span style={{ fontSize: "16px", color: "#7C7783" }}>
                    {searchData.songs[2].artistsNames}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        </div>

        <div>
            <h3>Bài Hát</h3>
            {searchData.songs && <NewSong songData = {searchData.songs} />}
        </div>

        <div>
            <h3>Playlist/Album</h3>
            {searchData.playlists && <Sections data={searchData.playlists}  isSearch={true} number={5}/>}
        </div>

        <div>
            <h3>Nghệ Sĩ/OA</h3>
            <div className="artist_same">
            {searchData.artists && <ArtistSame data={searchData.artists}/>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
