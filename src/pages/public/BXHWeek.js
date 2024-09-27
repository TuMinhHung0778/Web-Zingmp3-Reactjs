import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Scrollbars } from "react-custom-scrollbars-2";
import { SongItem } from "../../components";
const BXHWeek = ({weekData}) => {
    // const {pid} = useParams();
    const [tabMusic, setTabMusic] = useState('vn');
    const [songData, setSongData] = useState('')
    // useEffect(()=>{
    //   console.log(pid)
    // },[pid])
    console.log(weekData?.find(item => item.country === tabMusic))
    const handleChangeTabMusic = (tab) => {

      setTabMusic(tab)
    }
    useEffect(() => {
      if(tabMusic){
        setSongData(weekData?.find(item => item.country === tabMusic))
      }
    }, [tabMusic]);
  return (
    <div className='rank_week'>
      <div className='week_title'>
        <h1>Bảng Xếp Hạng Tuần</h1>
      </div>

      <div className="rank_category">
        <div className="btn_category">
          <button type="button" className={`rank_action ${tabMusic === 'vn' ? 'tab-active' : ''}`} onClick={()=>handleChangeTabMusic('vn')}>
            VIỆT NAM
          </button>
          <button type="button" className={`rank_action ${tabMusic === 'us' ? 'tab-active' : ''}`} onClick={()=>handleChangeTabMusic('us')}>
            US-UK
          </button>
          <button type="button" className={`rank_action ${tabMusic === 'korea' ? 'tab-active' : ''}`} onClick={()=>handleChangeTabMusic('korea')}>
            K-POP
          </button>
        </div>
      </div>

      <Scrollbars style={{ width: "100%", height: "100vh" }}>
      <div className="song_top100">
          {songData?.items?.map((item, index) => (
            <SongItem
              songData={item}
              order={(index += 1)}
              key={index}
              isChartHome={true}
            />
          ))}
        </div>
      </Scrollbars>
    </div>
  )
}

export default BXHWeek