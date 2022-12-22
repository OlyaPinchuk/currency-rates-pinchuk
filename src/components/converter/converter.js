import {useEffect, useRef, useState} from "react";
import {MenuItem, Select} from "@material-ui/core";
import './converter.css'

function Converter(props) {

    const {currencyList} = props;
    const uah = {cc: 'UAH', rate: 1};

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [amountFromCurrency, setAmountFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('UAH');
    const [amountToCurrency, setAmountToCurrency] = useState('');

    const toInputRef = useRef();
    const fromInputRef = useRef();

    useEffect(() => {
        if (currencyList && !currencyList.find(c => c.cc === 'UAH')) {
            currencyList.push(uah)
        }
    }, [props.currencyList]);

    const handleFromSelect = (e) => {
        setFromCurrency(e.target.value)
        handleFromInputChange(e, e.target.value)
    };

    const handleFromInputChange = (e, currency = fromCurrency) => {
        setAmountFromCurrency(prevState => fromInputRef.current.value);
        const fromCurrencyFull = currencyList.find(c => c.cc === currency);
        const toCurrencyFull = currencyList.find(c => c.cc === toCurrency);
        setAmountToCurrency(prevState => (fromInputRef.current.value * (fromCurrencyFull.rate / toCurrencyFull.rate)).toFixed(2));
    };

    const handleToSelect = (e) => {
        setToCurrency(prevState => e.target.value);
        handleToInputChange(e, e.target.value);
    };

    const handleToInputChange = (e, currency = toCurrency) => {
        setAmountToCurrency(prevState => toInputRef.current.value);
        const fromCurrencyFull = currencyList.find(c => c.cc === fromCurrency);
        const toCurrencyFull = currencyList.find(c => c.cc === currency);
        setAmountFromCurrency(prevState => (toInputRef.current.value * (toCurrencyFull.rate / fromCurrencyFull.rate)).toFixed(2));
    };


    return <div>
        <div className='container'>
            <form className='form'>
                <input className='input' ref={fromInputRef} value={amountFromCurrency} onChange={handleFromInputChange}/>
                <Select value={fromCurrency} onChange={handleFromSelect}>
                    {currencyList && currencyList.map(c => <MenuItem key={c.rate} value={c.cc}>{c.cc}</MenuItem> )}
                    {currencyList && !currencyList.find(c => c.cc === 'UAH') && <MenuItem value="UAH">UAH</MenuItem>}
                </Select>

            </form>

            <form className='form'>
                <input className='input' ref={toInputRef} value={amountToCurrency} onChange={handleToInputChange}/>
                <Select value={toCurrency} onChange={handleToSelect}>
                    {currencyList && currencyList.map(c => <MenuItem key={c.rate} value={c.cc}>{c.cc}</MenuItem> )}
                    {currencyList && !currencyList.find(c => c.cc === 'UAH') && <MenuItem value="UAH">UAH</MenuItem>}
                </Select>
            </form>
        </div>
        <div className='rates'>
            <h3>Rates:</h3>
            {currencyList && currencyList.map(c => <div key={c.rate} value={c.cc}>{c.cc} -- {c.txt} -- {c.rate}</div> )}
        </div>
    </div>
}

export default Converter;