import actionTypes from "../action/actionType";
const initState = {
    banner : [],
    new_song : {},
    chill : {},   
    playlist : {},
    remix : {},
    lofi :{},
    artistspopular : {},
    weekchart : [],
    chart : {},
    rank : [],
    chartdata : {},
    singer : null

};
const appReducer = (state = initState,action) => {
    switch(action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null,
                new_song: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                playlist: action.homeData?.find(item => item.sectionId === 'hEditorTheme2') || {},
                remix : action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || {},
                lofi : action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || {},
                artistspopular : action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                top100 : action.homeData?.find(item => item.sectionId === 'h100') || {},
                hotalbum : action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
                weekchart : action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                chart : action.homeData?.find(item => item.sectionId === 'hZC')?.chart || {},
                rank : action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
                chartdata : action.homeData?.find(item => item.sectionId === 'hZC') || [],
                // chartdata : action.homeData?.find(item => item.sectionId === 'hZC') || [],

            };
        default:
            return state;
    }
};
export default appReducer;