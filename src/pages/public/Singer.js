import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from "../../ultil/icon";
import {NewSong, Sections,ArtistSame} from '../../components'
import { Scrollbars } from "react-custom-scrollbars-2";
const Singer = () => {
  const {
    BsFillPersonPlusFill,
    FaPlay
  } = icons;
    const {singer} = useParams()
    // console.log(singer)
    const [artistData,setArtistData] = useState(null)
    const handleChangeNumber = (number) => {
      if (number > Math.pow(10, 6)) {
        return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`;
      } else if (number > Math.pow(10, 3)) {
        return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}k`;
      }else{
         return number
      }
    };
    useEffect(() =>{
        const fetchArtistData = async () =>{
            const res = await apiGetArtist(singer)
            console.log(res)
            if(res.data.err === 0){
              setArtistData(res.data.data)
            }
        }
        singer && fetchArtistData()
    },[singer])
  return (
    <div className='singer_page'>
    <Scrollbars style={{ width: "100%", height: "90vh" }}>

    
      <div className='singer_hero'>
        <div className='singer_background'>
          <div className='singer_infor'>
            <div className='infor_img'>
              <img src={artistData?.thumbnail} alt=""  />
            </div>
            <div className='infor_title'>
                <div className='title_top'>
                  <h1>{artistData?.name}</h1>
                  <button type="submit"><FaPlay size={20}/></button>
                </div>
                <div className='title_bottom'>
                <div>
                  <span>{`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
                </div>
                <div className="cas_btn">
                  <button type="submit" style={{background :'none'}}>
                      <BsFillPersonPlusFill />
                      <span> QUAN TÂM</span>
                  </button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className='hot_song'>
            <h3>Bài Hát Nổi Bật</h3>
            {artistData?.sections && <NewSong songData = {artistData?.sections[0].items} />}
      </div>

      <div className='hot_sing'>
            <h3>{artistData?.sections[1].title}</h3>
            {artistData?.sections && <Sections data={artistData?.sections[1]?.items} isShow={false}  isSearch={true} number={5}/>}
      </div>


      <div className='hot_album'>
            <h3>Tuyển tập</h3>
            {artistData?.sections?.filter(item => item.title === 'Tuyển tập')?.map((item) =>(
              <Sections data={item.items} isShow={false}  isSearch={true} number={5}/>
            ))}
      </div>

      <div className='hot_album'>
            <h3>Xuất hiện trong</h3>
            {artistData?.sections?.filter(item => item.title === 'Xuất hiện trong')?.map((item) =>(
              <Sections data={item.items} isShow={false}  isSearch={true} number={5}/>
            ))}
      </div>
      <div className='hot_album'>
            <h3>Bạn có thể thích</h3>
            {artistData?.sections?.filter(item => item.title === 'Bạn Có Thể Thích')?.map((item) =>(
              <ArtistSame data={item.items}/>
            ))}
      </div>

      <div className='about'>
        <h3>{`Về ${artistData?.name}`}</h3>
        <div className='infor_description'>
          <div className='des_lef'>
            <img src={artistData?.thumbnailM} alt=""  />
          </div>
          <div className='des_right'>
              <div className='infor_about'>
              <p dangerouslySetInnerHTML={{__html: artistData?.biography}}></p>
              </div>

              <div className='infor_follow'>
                <span className='number_follow'>{Number(artistData?.totalFollow.toFixed(1)).toLocaleString()}</span>
                <p>Người quan tâm </p>

              </div>

          </div>
        </div>
      </div>

      
      </Scrollbars>
    </div>
  )
}

export default Singer