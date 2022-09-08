import React from 'react';
import Header from "../Header";
import Board from "../Board";
import style from "./index.module.css"

function App() {
    return <div className={style.wrapper}><Header /><Board /></div>
}

export default App;
