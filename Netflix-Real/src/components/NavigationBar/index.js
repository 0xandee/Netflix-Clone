import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './navBar.scss'

import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import * as Icon from 'react-feather';
import CustomNotification from '../CustomNotification';
import CustomDropdown from '../Dropdown';
import { IconNetflix } from '../../assets/Icon';

import io from "socket.io-client";


const navTabs = [{ id: 0, label: "Home", navLink: '/home' },
{ id: 1, label: "New & Popular", navLink: '/popular' },
{ id: 3, label: "Movies", navLink: '/movies/1' },
{ id: 4, label: "My Playlist", navLink: '/playlist' }];

const NavigationBar = (props) => {
    const history = useHistory();
    const [isShown, setIsShown] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const textInput = React.createRef(null);
    const [searchText, setSearchText] = useState('');
    const [items, setItem] = useState(navTabs);
    const [onToppage, setOnTopPage] = useState(false);

    const [username, setusername] = useState(Math.random().toString(36).substr(2, 12));
    const [roomname, setroomname] = useState("idgroup");

    var currentScrollY = useRef(0);

    const useWindowSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [width, height] = useWindowSize();

    const onBlurSearchInput = () => {

        textInput.current.blur()
        setIsShown(false)
    }
    

    const btnSearchClicked = () => {
        if (!isShown) {
            textInput.current.focus()
        }
        setIsShown(!isShown)
    }
    const onSearchKeyPress = (e) => {

        if (e.key === "Enter") {

            history.push({
                pathname: '/search',
                search: `value=${searchText}`,

            })
            setSearchText('')
        }

    }

    const logoClicked = ()=>{
        history.push('/home')
    }

    useEffect(() => {
        const handleScroll = () => {
            currentScrollY = window.scrollY
            currentScrollY > 0 ? setOnTopPage(true) : setOnTopPage(false);
        };
        window.addEventListener("scroll", handleScroll, { passive: true }); 
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const btnGroupAddClicked = () => {
        ///////////////////////////////////////////////////////////////////
        // const socket = io("http://localhost:8000", { transports: ['websocket']});

        // // This sets the room number on the client
        // // var username = Math.random().toString(36).substr(2, 12);
        // // var roomnum = Math.random().toString(36).substr(2, 12);
        // var username = "Andy" + Math.random().toString(36).substr(1, 3);
        // var roomnum = "VIP-1";
        // // Join room
        // socket.emit('new room', {username, roomnum}, function(data) {
        //     // This should only call back if the client is the host
        //     console.log("data", data);
        //     if (data) {
        //         console.log("Host is syncing the new socket!")
        //         // syncVideo(roomnum)
        //     }
        // });
        
        // socket.emit("joinRoom", { username, roomname });

        // socket.emit("new user", username, function(data) {
        //     console.log("data", data);
        //     if (data) {
        //         // history.pushState('', 'Vynchronize', roomnum);
        //     }
        // });

    }
    // var $userForm = $('#user-form');
    // $userForm.submit(function(e) {
    //     e.preventDefault();
    //     const socket = io("http://localhost:8000", { transports: ['websocket']});
    //     socket.on("connect", () => {
    //         console.log(socket.id); // "G5p5..."
    //       });
    //     var username = Math.random().toString(36).substr(2, 12);
    //     // This sets the room number on the client
    //     var roomnum = Math.random().toString(36).substr(2, 12);

    //     console.log("username", username);
    //     console.log("roomnum", roomnum);
    //     console.log("HOLY SHIT");

    //     socket.emit("new user", username, function(data) {
    //         console.log("data", data);
    //         if (data) {
    //             // history.pushState('', 'Vynchronize', roomnum);
    //         }
    //     });
    //     // Join room
    //     socket.emit('new room', roomnum, function(data) {
    //         // This should only call back if the client is the host
    //         if (data) {
    //             console.log("Host is syncing the new socket!")
    //             // syncVideo(roomnum)
    //         }
    //     });
    // })

    return (
        <div id='navbar' >
            <div className={`nav-bar ${onToppage && 'top-page'} ${isOpen && 'top-page'}`}>
                <div className='div-navigation'>
                    <div onClick={logoClicked}>
                        <IconNetflix className='brand-logo' />
                    </div>

                    {width > 865 ?
                        <React.Fragment>
                            <div className='tab-navigation'>

                                {
                                    items.map(item => (
                                        <NavLink to={item.navLink} className='nav-item' activeStyle={styles.activeStyle}>{item.label}</NavLink>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                        :
                        (<div className='sub-menu nav-element'
                            onClick={() => setOpen(!isOpen)}>
                            <div className='sub-menu-header'>
                                <span>Browse</span>
                                <span className={`caret ${isOpen && 'open'}`} />
                            </div>
                            <div className={`sub-menu-body ${isOpen && 'open'}`} >
                                {isOpen && (
                                    <React.Fragment>
                                        <div className='callout-arrow-browse' />
                                        <div className='top-bar' />
                                        {isOpen && items.map(item => (
                                            <div style={{ display: 'flex', flexDirection: 'column' }} id={item.id}>
                                                <Link className="sub-menu-item" to={item.navLink} >
                                                    <span >
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            </div>
                                        ))}
                                    </React.Fragment>

                                )}

                            </div>
                        </div>)
                    }
                </div>
                <div className='secondary-navigation'>
                    <Link to='/watchgroup/1'>
                        <div style={{paddingRight: '3rem', cursor: 'pointer'}}>
                            <Icon.Plus onClick={btnGroupAddClicked} className='icon-style' style={{color: 'white'}}/>
                        </div>
                    </Link>
                    {/* <form id='user-form' style={{paddingRight: '3rem', cursor: 'pointer'}}>
                        <input type="submit" value="Create Room" className='icon-style' style={{color: 'white'}}/>
                    </form> */}
                    <div className={`search-box nav-element ${isShown && 'input-search'}`} >
                        <div>
                            <Icon.Search className='icon-style' size='16px' strokeWidth='4' color='white' onClick={btnSearchClicked} />
                        </div>

                        <React.Fragment>
                            <input
                                onKeyPress={onSearchKeyPress}
                                onBlur={onBlurSearchInput}
                                ref={textInput} value={searchText}
                                type={'text'}
                                name="search"
                                placeholder="Search.."
                                onChange={(e) => setSearchText(e.target.value)} >
                            </input>
                        </React.Fragment>

                    </div>
                    <div className='nav-element'>
                        <CustomNotification />
                    </div>
                    <div className='nav-element'>
                        <CustomDropdown />
                    </div>

                </div>


            </div >
        </div>
    );

}

const styles = ({
    activeStyle: {
        fontWeight: "bold",
        pointerEvents: 'none',
    }
})

export default NavigationBar;
