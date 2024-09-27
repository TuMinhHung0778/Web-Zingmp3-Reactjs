import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultil/icon";

const Sections = ({ data, isShow = true, isSearch, number }) => {
  const { AiOutlineHeart, BiDotsHorizontalRounded, BsPlayCircle } = icons;
  const n = number || 5;
  const navi = useNavigate();
  // console.log(data)
  const handelClickAlbum = (item) => {
    const albumPath = item?.link?.split(".")[0];
    navi(albumPath);
  };
  return (
    <div className={isSearch ? "sections_search" : "sections"}>
      <div className="sections_title">
        <h2 className="text_title">{isSearch ? "" : data?.title}</h2>
      </div>
      <div className="section_content">
        {isSearch
          ? data?.slice(0, number).map((item) => (
              <div
                className="section"
                key={item.encodeId}
                onClick={() => handelClickAlbum(item)}
              >
                <div className="section_img">
                  <img src={item.thumbnailM} alt="" />
                  <div className="icon_img">
                    <AiOutlineHeart size={25} style={{ color: "#E5E5E5" }} />
                    <BsPlayCircle size={45} style={{ color: "#E5E5E5" }} />
                    <BiDotsHorizontalRounded
                      size={25}
                      style={{ color: "#E5E5E5" }}
                    />
                  </div>
                </div>
                <div className="section_depscription">
                  {isSearch ? (
                    <div className="hot_album">
                      <span>
                        {item.title.length > 20
                          ? `${item?.title?.slice(0, 20)}...`
                          : item?.title}
                      </span>
                      <span>
                        {item.artistsNames.length > 20
                          ? `${item?.artistsNames?.slice(0, 20)}...`
                          : item?.artistsNames}
                      </span>
                    </div>
                  ) : isShow ? (
                    <span>
                      {item.sortDescription.length > 35
                        ? `${item?.sortDescription?.slice(0, 35)}...`
                        : item?.sortDescription}
                    </span>
                  ) : (
                    <div className="hot_album">
                      <span>
                        {item.title.length > 20
                          ? `${item?.title?.slice(0, 20)}...`
                          : item?.title}
                      </span>
                      <span>
                        {item.artistsNames.length > 20
                          ? `${item?.artistsNames?.slice(0, 20)}...`
                          : item?.artistsNames}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          : data?.items?.slice(0, number).map((item) => (
              <div
                className="section"
                key={item.encodeId}
                onClick={() => handelClickAlbum(item)}
              >
                <div className="section_img">
                  <img src={item.thumbnailM} alt="" />
                  <div className="icon_img">
                    <AiOutlineHeart size={25} style={{ color: "#E5E5E5" }} />
                    <BsPlayCircle size={45} style={{ color: "#E5E5E5" }} />
                    <BiDotsHorizontalRounded
                      size={25}
                      style={{ color: "#E5E5E5" }}
                    />
                  </div>
                </div>
                <div className="section_depscription">
                  {isShow ? (
                    <span>
                      {item.sortDescription.length > 35
                        ? `${item?.sortDescription?.slice(0, 35)}...`
                        : item?.sortDescription}
                    </span>
                  ) : (
                    <div className="hot_album">
                      <span>
                        {item.title.length > 20
                          ? `${item?.title?.slice(0, 20)}...`
                          : item?.title}
                      </span>
                      <span>
                        {item.artistsNames.length > 20
                          ? `${item?.artistsNames?.slice(0, 20)}...`
                          : item?.artistsNames}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default memo(Sections);
