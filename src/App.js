// import logo from './logo.svg';
import './App.css';
import Header from "./components/header/header";
import Converter from "./components/converter/converter";
import {useEffect, useState} from "react";

function App() {

    const [currencyList, setCurrencyList] = useState();

    const fetchCurrencyList = () => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', {
            headers: {},
        })
            .then(res => res.json())
            .then(data => {
                setCurrencyList(data)
            })
    };

    useEffect(() => {
        fetchCurrencyList()
    },[]);

  return (
    <div className="App">
        <Header currencyList = {currencyList}></Header>
        <Converter currencyList = {currencyList}></Converter>
    </div>
  );
}

export default App;
