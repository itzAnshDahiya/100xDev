//React Example

import { useState } from "react";
import "./App.css";

export default function App(){
    const [ count , setCount] = useState(0);

    function onClickHandler(){
        setCount(count + 1);
    }

    return(
        <div>
        <button id = "btn" onClick={onClickHandler}>
            counter {count}
        </button>
        </div>
    );
}