import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './navBar.scss'

import { Link, NavLink, useHistory } from 'react-router-dom';

import * as Icon from 'react-feather';

import CustomDropdown from '../Dropdown';
import { IconNetflix } from '../../assets/Icon';


const navTabs = [{ id: 0, label: "Home", navLink: '/home' },
{ id: 3, label: "Movies", navLink: '/movies/1' },
{ id: 1, label: "Just for You", navLink: '/popular' },
{ id: 4, label: "My Playlist", navLink: '/playlist' }];

const NavigationBar = (props) => {
    const history = useHistory();
    const [isShown, setIsShown] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const textInput = React.createRef(null);
    const [searchText, setSearchText] = useState('');
    const [items, setItem] = useState(navTabs);
    const [onToppage, setOnTopPage] = useState(false);

    const idgroup = localStorage.getItem('username');

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

    const logoClicked = () => {
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
                                        <NavLink  key={item.id} to={item.navLink} className='nav-item' activeStyle={styles.activeStyle}>{item.label}</NavLink>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                        :
                        (<div className='sub-menu nav-element'
                            onClick={() => setOpen(!isOpen)}>
                            <div className='sub-menu-header'>
                                <h6 className='text-white'>Browse</h6>
                                <span className={`caret ${isOpen && 'open'}`} />
                            </div>
                            <div className={`sub-menu-body ${isOpen && 'open'}`} >
                                {isOpen && (
                                    <React.Fragment>
                                        <div className='callout-arrow-browse' />
                                        <div className='top-bar' />
                                        {isOpen && items.map(item => (
                                            <div  key={item.id} style={{ display: 'flex', flexDirection: 'column' }} id={item.id}>
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
                    <div className='position-relative nav-element'>
                        <div className={`search-box  ${isShown && 'input-search'}`} >
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
                        <Link to={`/watchgroup/${idgroup}`} className="text-decoration-none text-light">
                            <div style={{ textAlign: 'center', paddingRight: '2vw', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon.Plus className='icon-style' style={{ color: 'white' }} />
                                <span className='text-white text-center' style={{fontSize: '14px' }} >Create Group</span>
                            </div>
                        </Link>
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
