import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { MoreLikeThis } from "../../components";
import { Row, Col, Container } from 'reactstrap'
import './style.scss';
import VideoPlayer from "../VideoPlayer";
import { IconChevronLeft, IconChevronRight } from "../../assets/Icon";

const GroupStreaming = () => {
 
  const [openedChatBox, setOpenedChatBox] = useState(false);

  const handleOpenChatBox = () => {
    setOpenedChatBox(!openedChatBox)
  }
  return (
    <div id='groupStreaming'>
      <div className='position-relative group-streaming h-100 w-100 ' >
        <div className='group-player position-relative '>
          <div className={`icon-chevron--right ${openedChatBox && 'active'}`} onClick={handleOpenChatBox}>
            {!openedChatBox ?
              <IconChevronRight />
              :
              <IconChevronLeft />
            }
          </div>
          <VideoPlayer />
        </div>

        <div className={`group-chat-box ${!openedChatBox && 'active'}`} >

          Chat box
        </div>


      </div>

    </div>
  )
}

export default GroupStreaming;