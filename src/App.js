import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {Home,Login,Public, Allbum,SectionWeek,Searchs,SearchSong , SearchAll,Singer,SearchPlaylist,ArtistSinger,BXHWeek} from './pages/public/index';
// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import path from './ultil/path';
import { useEffect, useState } from 'react';
import * as actions from './store/action';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
//
import "react-alice-carousel/lib/alice-carousel.css";
import { apiGetChartHome } from './apis';



function App() {
  const dispatch = useDispatch();
  const [weekData, setWeekData] = useState()
  useEffect(()=>{
    dispatch(actions.getHome())
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) {
        setWeekData(response.data.data.weekChart);
      }
    };
    fetchChartData();
  },[]);
  
  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.ALBUM_TITLE_PID} element={<Allbum />} />
          <Route path={path.PLAYLIST_TITLE_PID} element={<Allbum />} />
          <Route path={path.WEEKCHART_TITLE_PID} element={<SectionWeek />} />
          <Route path={path.HOME__SINGER} element={<Singer />} />
          <Route path={path.HOME_ARTIST} element={<Singer />} />
          <Route path={path.WEEK_TITLE_PID} element={<BXHWeek weekData={weekData && Object.values(weekData)}/>} />

          <Route path={path.SEARCH} element={<Searchs />} >
            <Route path={path.ALL} element={<SearchAll />} />
            <Route path={path.SONG} element={<SearchSong />} />
            <Route path={path.PALYLIST_SEARCH} element={<SearchPlaylist />} />
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
