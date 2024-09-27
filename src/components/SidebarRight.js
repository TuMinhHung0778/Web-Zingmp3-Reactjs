import React, { useState, useEffect } from "react";
import icons from "../ultil/icon";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SongItem from "../components/SongItem";
import { apiGetDetailPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";
import { play } from "../store/action";

const { TfiAlarmClock, IoIosMore, AiOutlineHeart, BiSolidPlaylist } = icons;
const SidebarRight = (showPlaylist = true) => {
  const [playlist, setPlayList] = useState();
  const [isRecent, setisRecent] = useState("listPlay");
  const handleChange = (tab) => {
    setisRecent(tab);
  };
  const [show, setShow] = useState(false);

  const { curSongData, curAlbumId, isPlaying, recentSongs, curIdSong } =
    useSelector((state) => state.music);
  // console.log(curSongData);
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId);
    if (response?.data?.err === 0) setPlayList(response?.data?.data);
  };

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, [curIdSong]);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setisRecent(false);
  }, [isPlaying, curIdSong]);

  return (
    <div>
      <div className="sideRight_header">
        <div className="list1">
          <button
            className={`action ${isRecent === "listPlay" ? "tab_active" : ""}`}
            onClick={() => handleChange("listPlay")}
          >
            Danh sách phát
          </button>
          <button
            className={`action ${isRecent === "recently" ? "tab_active" : ""}`}
            onClick={() => handleChange("recently")}
          >
            Nghe gần đây
          </button>
        </div>
        <div className="list2">
          <span>
            <TfiAlarmClock size={18} />
          </span>
          <span>
            <IoIosMore size={18} />
          </span>
        </div>
      </div>
      {isRecent === "recently" ? (
        <div className="listSong">
          <Scrollbars style={{ width: "100%", height: "85vh" }}>
            {recentSongs?.map((item) => (
              <SongItem songData={item} isShow={false} />
            ))}
          </Scrollbars>
        </div>
      ) : (
        <div className="container">
          <div className="sideRight_body">
            <SongItem songData={curSongData} isShow={false} />
          </div>
          <div className="sideBody2">
            <span className="next">Tiếp theo</span>
            <span className="from">
              <span>Từ playlist</span>
              <span style={{ color: "rgb(194, 115, 237)" }}>
                {playlist?.title}
              </span>
            </span>
          </div>
          <div className="listSong">
            <Scrollbars style={{ width: "100%", height: "80vh" }}>
              {playlist?.song?.items?.map((item) => (
                <SongItem songData={item} isShow={false} />
              ))}
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarRight;
