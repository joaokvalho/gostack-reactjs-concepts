import React from 'react'

import Logo from '../../assets/img/logo.svg'

import './styles.css'

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={Logo} alt="EZHelp" />
            </div>
            <div className="header__user">
                <p>{props.userName}</p>
            </div>            
        </header>
    )
}

export default Header