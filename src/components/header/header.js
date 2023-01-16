// import {useState} from "react";
import './header.css'

function Header(props) {

    const {currencyList} = props;

    const usd = currencyList ? currencyList.find(c => c.cc === 'USD') : null;
    const eur = currencyList ? currencyList.find(c => c.cc === 'EUR') : null;

    return <div className='header'>
        <span className='title'>USD/EUR to UAH|</span>
        {usd && <div>USD: {usd.rate}</div>}
        {eur && <div>EUR: {eur.rate}</div>}
    </div>
}

export default Header;