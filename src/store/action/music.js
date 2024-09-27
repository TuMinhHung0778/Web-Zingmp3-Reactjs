import actionTypes from "./actionType";
import * as apis from "../../apis"
export const setCurSongId = (sid) => ({
    type : actionTypes.SET_CUR_SONG_ID,
    sid
})

export const play = (flag) => ({
    type : actionTypes.PLAY,
    flag
})
export const playAlbum = (flag) => ({
    type : actionTypes.SET_ALBUMS,
    flag
})

export const setPlaylist = (songs) => ({
    type : actionTypes.PLAYLIST,
    songs
})

export const setCurSongData = (data) =>({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})

export const setCurAlbumId = (pid) =>({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid
})

export const setRecent = (data) =>({
    type: actionTypes.SET_RECENT,
    data
})

export const search =(keyword) => async(dispatch) => {
    try {
        const response = await apis.apiSearch(keyword)
        if(response.data.err === 0){
            dispatch({
                type : actionTypes.SEARCH,
                data : response.data.data,
                keyword 
            })
        }else{
            dispatch({
                type : actionTypes.SEARCH,
                data : null
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.SEARCH,
            data : null
        })
    }
}

export const getSearchSongs =(singerId) => async(dispatch) => {
    try {
        const response = await apis.apiGetArtistSongs(singerId)
        // console.log(response)
        if(response.data.err === 0){
            dispatch({
                type : actionTypes.PLAYLIST,
                songs : response.data.data.items,
            })
        }else{
            dispatch({
                type : actionTypes.PLAYLIST,
                data : null
            })
        }
    } catch (error) {
        dispatch({
            type : actionTypes.PLAYLIST,
            data : null
        })
    }
}