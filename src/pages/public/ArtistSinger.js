import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'

const ArtistSinger = () => {
    const {singer} = useParams()
    console.log(singer)
    useEffect(() =>{
        const fetchArtistData = async () =>{
            const res = await apiGetArtist(singer)
            console.log(res)
        }
        singer && fetchArtistData()
    },[singer])
  return (
    <div style={{marginTop : "100px"}}>ArtistSinger</div>
  )
}

export default ArtistSinger