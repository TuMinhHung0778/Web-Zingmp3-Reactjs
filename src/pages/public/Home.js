import React from "react";
import { useSelector } from "react-redux";
import { Sliders, NewSong, Sections, ChartRank, Loading } from "../../components";
import { Link } from "react-router-dom";
const Home = () => {
  const {
    playlist,
    chill,
    remix,
    lofi,
    artistspopular,
    top100,
    hotalbum,
    weekchart,
  } = useSelector((state) => state.app);
  return (
    <div className="home_page">
      {(playlist&& chill&& remix&& lofi&& artistspopular&& top100&& hotalbum&& weekchart)? <div>
        <Sliders />
      <NewSong />
      <Sections data={playlist} number={5}/>
      <Sections data={chill} number={5}/>
      <Sections data={remix} number={5}/>
      <Sections data={lofi} number={5}/>
      <Sections data={artistspopular} number={5}/>
      <Sections data={top100} number={5}/>
      <Sections data={hotalbum} isShow={false} number={5}/>
      <ChartRank />
      <div className="week_chart">
        {weekchart?.map((item) => (
          <div className="week_img">
            <Link to={item?.link?.split(".")[0]} key={item.link}>
              <img src={item.cover} alt="image cover" />
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "90px" }}></div>
      </div> : <div className="loading"><Loading /></div>}
    </div>
  );
};

export default Home;
