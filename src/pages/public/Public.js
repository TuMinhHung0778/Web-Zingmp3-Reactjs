import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight, Header } from "../../components";

const Public = () => {
  const [isshow, setIsShow] = useState(true)
  return (
    <div className="wapper">
      <div className="content">
        <div className="side_left">
          <SidebarLeft />
        </div>

        {isshow ? <div className="contents">
          <div className="header">
            <Header />
          </div>
          <Outlet />
        </div> : <div className="contents_hiden">
          <div className="header_hiden">
            <Header />
          </div>
          <Outlet />
        </div> }

        {isshow ? 
        <div className="side_right">
          <SidebarRight />
        </div> : <div className="sideRight_hidden">
          <SidebarRight />
        </div>}
      </div>

      <div className="playmusic">
        <Player setIsShow = {setIsShow} />
      </div>
    </div>
  );
};

export default Public;
