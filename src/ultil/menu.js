import icons from "./icon"
const {BsFillDiscFill,
       AiOutlineLineChart,
       MdLibraryMusic,
       LuRadio} =icons;
export const sidebarMenu = [
    {
        path : '',
        text: 'Khám Phá',
        icons: <BsFillDiscFill size={'24px'}/>
    },
    {
        path : 'zing-chart',
        text: '#zingchart',
        icons: <AiOutlineLineChart size={'24px'}/>
    },
    {
        path : 'radio',
        text: 'Radio',
        icons: <LuRadio size={'24px'}/>
    },
    {
        path : 'library',
        text: 'Thư viện',
        icons: <MdLibraryMusic size={'24px'}/>
    },

]

export const SearchMenu = [
    {
        path : 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path : 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path : 'playlist',
        text: 'PLAYLIST/ALBUM',
    },
]