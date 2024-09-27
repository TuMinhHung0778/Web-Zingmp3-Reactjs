import React, { useEffect, useState } from "react";
// import icons from "../../ultil/icon";
import { apiGetChartHome } from "../../apis";
import { ChartRank } from "../../components";
import { SongItem } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import path from "../../ultil/path"
const SectionWeek = () => {
  const [chartData, setChartData] = useState(null);
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) {
        setChartData(response.data.data);
      }
    };
    fetchChartData();
  }, []);
  console.log(chartData);
  useEffect(() => {
    if (!isShowFull) {
      setSongs(chartData?.RTChart?.items?.filter((i, index) => index < 10));
    } else {
      setSongs(chartData?.RTChart?.items);
    }
  }, [isShowFull, chartData]);
  return (
    <div className="chart_home">
      <Scrollbars style={{ width: "100%", height: "90vh" }}>
        <div className="chart_full">
          <ChartRank isChartHome={true} />
        </div>

        <div className="song_top100">
          {songs?.map((item, index) => (
            <SongItem
              songData={item}
              order={(index += 1)}
              key={index}
              isChartHome={true}
            />
          ))}
          {!isShowFull ? (
            <button
              onClick={() => setIsShowFull((prev) => !prev)}
              className="btn_chart"
            >
              Xem top 100
            </button>
          ) : (
            <button
              onClick={() => setIsShowFull((prev) => !prev)}
              className="btn_chart"
            >
              Ẩn bớt
            </button>
          )}
        </div>

        <div className="rank_tl">
            <h2>Bảng Xếp Hạng Tuần</h2>
          </div>
        <div className="rank_countrys">
          
          <div className="rank_country">
            <div className="rank_title">
              <span>Việt Nam</span>
            </div>
            <div className="rank_content">
              {chartData?.weekChart?.vn?.items
                ?.filter((i, index) => index < 5)
                ?.map((item, index) => (
                  <SongItem
                    songData={item}
                    order={(index += 1)}
                    key={index}
                    isChartHome={true}
                    isShow={true}
                    isChart={true}
                  />
                ))}
                <button
                  onClick={() => navigate(chartData?.weekChart?.vn?.link?.split('.')[0])}
                  className="btnChart_bottom"
                >
                  Xem Tất Cả
                </button> 
            </div>
          </div>

          <div className="rank_country">
            <div className="rank_title">
              <span>US-UK</span>
            </div>
            <div className="rank_content">
              {chartData?.weekChart?.us?.items
                ?.filter((i, index) => index < 5)
                ?.map((item, index) => (
                  <SongItem
                    songData={item}
                    order={(index += 1)}
                    key={index}
                    isChartHome={true}
                    isShow={true}
                    isChart={true}
                  />
                ))}
                <button
                  onClick={() => navigate(chartData?.weekChart?.us?.link?.split('.')[0])}
                  className="btnChart_bottom"
                >
                  Xem Tất Cả
                </button>
            </div>
          </div>

          <div className="rank_country">
            <div className="rank_title">
              <span>K-Pop</span>
            </div>
            <div className="rank_content">
              {chartData?.weekChart?.korea?.items
                ?.filter((i, index) => index < 5)
                ?.map((item, index) => (
                  <SongItem
                    songData={item}
                    order={(index += 1)}
                    key={index}
                    isChartHome={true}
                    isShow={true}
                    isChart={true}
                  />
                ))}
                <button
                  onClick={() => navigate(chartData?.weekChart?.korea?.link?.split('.')[0])}
                  className="btnChart_bottom"
                >
                  Xem Tất Cả
                </button>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default SectionWeek;
