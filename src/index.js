import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './font-awesome/css/font-awesome.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let DOMCells = document.querySelectorAll(".cells");
ReactDOM.render(
    <App totalCols = "2" totalRows = "2" />,
    DOMCells[0]
);

ReactDOM.render(
    <App />,
    DOMCells[1]
);

registerServiceWorker();
