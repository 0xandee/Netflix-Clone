import React, { useEffect, useState } from "react";
import './planForm.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";

import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import { IconCheckmark,IconNetflix,IconComputer,IconPhone,IconTablet,IconTV } from "../../assets/Icon";
import { Footer } from "../../components";



const planData = [{
    id: 1,
    planChoice: 'Mobile', monthPrice: '70,000',
    videoQuality: 'Good', resolution: '480p',
    devices: ['Phone', 'Tablet']
},
{
    id: 2,
    planChoice: 'Basic', monthPrice: '180,000',
    videoQuality: 'Good', resolution: '480p',
    devices: ['Phone', 'Tablet', 'Computer', 'TV']
},
{
    id: 3,
    planChoice: 'Standard', monthPrice: '220,000',
    videoQuality: 'Better', resolution: '1080p',
    devices: ['Phone', 'Tablet', 'Computer', 'TV']
},
// {
//     id: 4,
//     planChoice: 'Premium', monthPrice: '260,000',
//     videoQuality: 'Best', resolution: '4K+HDR',
//     devices: ['Phone', 'Tablet', 'Computer', 'TV']
// }
]

const PlanForm = () => {
    const [items, setItem] = useState(planData);
    const [isFixed, setIsFixed] = useState(false);
    const [itemChecked, setItemChecked] = useState(2);
    



    const onPlanChange = (e) => {
        setItemChecked(e.target.value)


    }

    const nextClicked = () => {

    }
    useEffect(() => {
        const top = document.getElementById("headerPlan").offsetTop;

        const handleScroll = () => {
            window.scrollY > top + 20 ? setIsFixed(true) : setIsFixed(false);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div id='planForm' className="mt-4">
            <div className={`plan-form`}>
                <div className='plan-form__background-image'>
                </div>
                <div className={`plan-form__body`}>
                    <div className={`plan-form__body__content`}>
                        <div className={`plan-form__body__content__main`}>
                            <div >
                                <span class="plan-form__body__content__main__step-indicator" >STEP <b>2</b> OF <b>3</b>
                                </span>
                                <h1 class="plan-form__body__content__main__step-title">

                                    Choose the plan that’s right for you</h1>
                                <div class="plan-form__body__content__main__step-content">
                                    <span>
                                        <IconCheckmark className={`plan-form__icon-checkmark`} />
                                        <p>Watch all you want. Ad-free.
                                        </p>

                                    </span>
                                    <span>
                                        <IconCheckmark className={`plan-form__icon-checkmark`} />
                                        <p> Recommendations just for you.

                                        </p>
                                    </span>
                                    <span>
                                        <IconCheckmark className={`plan-form__icon-checkmark`} />
                                        <p> No ads and no extra fees. Ever.

                                        </p>
                                    </span>
                                </div>
                            </div>

                            <div className={`plan-form__body__content__main__plans`}>
                                <div id='headerPlan'
                                    className={`plan-form__body__content__main__plans__header ${isFixed && 'is-fixed'}`}>
                                    <Container>
                                        <Row>
                                            <Col md='4' ></Col>
                                            {items.map(item => (
                                                <Col align="center" >
                                                    <div className={`plan-form__body__content__main__plans__header__item`}
                                                    >

                                                        <input type='radio' value={item.id} name="plan_choice" checked={itemChecked == item.id} onChange={onPlanChange} />
                                                        <span className={`plan-form__body__content__main__plans__header__item__plan-input`}>{item.planChoice}
                                                        </span>

                                                    </div>
                                                </Col>

                                            ))}
                                        </Row>
                                    </Container>

                                </div>
                            </div>
                            <Container >
                                <Row className={`plan-form__body__content__main__plans__row`}>
                                    <Col md="4" >Monthly Price</Col>
                                    {items.map(item => (
                                        <Col className={`plan-form__body__content__main__plans__row__item ${item.id == itemChecked && 'is-selected'} `} >
                                            {item.monthPrice + ' đ'}</Col>
                                    ))}
                                </Row>
                                <Row className={`plan-form__body__content__main__plans__row`}>
                                    <Col md="4" >Video quality</Col>
                                    {items.map(item => (
                                        <Col className={`plan-form__body__content__main__plans__row__item ${item.id == itemChecked && 'is-selected'} `} >
                                            {item.videoQuality}
                                        </Col>
                                    ))}
                                </Row>
                                <Row className={`plan-form__body__content__main__plans__row`} >
                                    <Col md="4" >Resolution</Col>
                                    {items.map(item => (
                                        <Col className={`plan-form__body__content__main__plans__row__item ${item.id == itemChecked && 'is-selected'} `} >
                                            {item.resolution}
                                        </Col>
                                    ))}
                                </Row>
                                <Row className={`plan-form__body__content__main__plans__row--device`}>
                                    <Col md="4" >Devices you can use to watch</Col>
                                    {items.map(item => (
                                        <Col className={`plan-form__body__content__main__plans__row__item ${item.id == itemChecked && 'is-selected'} `} >
                                            {item.devices.map(device => (

                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    padding: '5px 0'
                                                }}>
                                                    {
                                                        {
                                                            'Computer': <IconComputer className={`device`} />,
                                                            'TV': <IconTV className={`device`} />,
                                                            'Tablet': <IconTablet className={`device`} />,
                                                            'Phone': <IconPhone className={`device`} />,
                                                        }[device]
                                                    }
                                                    {device}
                                                </div>
                                            ))}
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                            <NavLink to='/signup/languagesetup'>
                                <button className={`plan-form__body__content__main__button-next`} >
                                    <span>Next
                                    </span>
                                </button>
                            </NavLink>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div>
                    <Footer style={{ background: '#f3f3f3' }} />
                </div>

            </div>

        </div>
    )
}
export default PlanForm;