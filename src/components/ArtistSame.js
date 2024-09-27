import React, { memo } from "react";
import icons from "../ultil/icon";
import { Link } from "react-router-dom";
const {
    BsFillPersonPlusFill
  } = icons;
const ArtistSame = ({data}) => {
    const handleChangeNumber = (number) => {
        if (number > Math.pow(10, 6)) {
          return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`;
        } else if (number > Math.pow(10, 3)) {
          return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}k`;
        }else{
           return number
        }
      };
  return (
    <div className="cardArtist_same">
      {data?.slice(0, 5).map((item) => (
        <div style={{width : '20%', height: '100%', textAlign : 'center'}}>
          <Link to={`${item.link}`} >
            <div className="cas_img">
              <img src={item.thumbnailM} alt="" />
            </div>
          </Link>
          <div className="cas_title">
            <Link to={`${item.link}`}>
                {item.name}
            </Link>

            <span style={{ fontSize: "14px", color: "#7C7783" }}>
                {handleChangeNumber(item.totalFollow) +" quan tâm"}
            </span>
          </div>
          <div className="cas_btn">
            <button type="submit">
                <BsFillPersonPlusFill />
                <span> QUAN TÂM</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ArtistSame);
