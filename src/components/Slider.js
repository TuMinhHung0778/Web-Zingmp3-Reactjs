import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../store/action';
import { useNavigate } from "react-router-dom";


// import {getSliders} from "../ultil/fn"
import Slider from "react-slick";

const Sliders = () => {
  const { banner } = useSelector((state) => state.app);
  // Animation banner
  const dispatch = useDispatch(); 
  const navi = useNavigate()
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed: 5000,
    initialSlide: 1,
    cssEase: "ease"
  };
  const handelClickBanner = (item) =>{
    if(item?.type === 1){
      dispatch(actions.setCurSongId(item.encodeId))
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    }else if(item?.type === 4){
      const albumPath = item?.link?.split('.')[0];
      navi(albumPath)
    }else {
      dispatch(actions.setPlaylist(null));
    }
  }

  return (
    <div className="slider">
      <Slider {...settings}>
        {banner?.map((item) => (
          <div key={item.encodeId}>
            <img src={item.banner} className="img_banner" alt="" onClick={() =>handelClickBanner(item)}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliders;
