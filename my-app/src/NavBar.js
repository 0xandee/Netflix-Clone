import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './scss/navBar.scss'

import { Link, NavLink } from 'react-router-dom';
import CustomDropdown from './components/Dropdown';
import * as Icon from 'react-feather';
import classnames from 'classnames'
import CustomNotification from './components/CustomNotification';

//import classnames from 'classnames'

const navTabs = [{ id: 0, label: "Home", navLink: '/home' },
{ id: 1, label: "New & Popular", navLink: '/popular' },
{ id: 2, label: "TV Show", navLink: '/tvshow' },
{ id: 3, label: "Movies", navLink: '/movies' },
{ id: 4, label: "My Playlist", navLink: '/playlist' }];

const NavigationBar = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const textInput = React.createRef(null);
    const [items, setItem] = useState(navTabs);
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
        setIsShown(false)
    }
    const btnSearchClicked = () => {
        if (!isShown) {
            textInput.current.focus()
        }
        setIsShown(!isShown)
    }
    const [onToppage, setOnTopPage] = useState(false);
    var currentScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            currentScrollY = window.scrollY
            currentScrollY > 0 ? setOnTopPage(true) : setOnTopPage(false);
            console.log("🚀 ~ file: NavBar.js ~ line 52 ~ handleScroll ~ currentScrollY", currentScrollY > 0)
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div id='navbar' >
            <div className= {`nav-bar ${onToppage && 'top-page'} ${isOpen && 'top-page'}`}
            >
                <div className='div-navigation'>
                    <img className='brand-logo'
                        src='https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg' alt='logo'
                    />
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
                    <div className={`search-box nav-element ${isShown && 'input-search'}`} >

                        <button>
                            <Icon.Search className='icon-style' size='16px' strokeWidth='4' color='white' onClick={btnSearchClicked} />
                        </button>

                        <React.Fragment>
                            <input onBlur={onBlurSearchInput} ref={textInput} id='searchInput' type={'text'} name="search" placeholder="Search.." >
                            </input>
                        </React.Fragment>

                    </div>
                    <div className='nav-element'>
                        <CustomNotification/>
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
