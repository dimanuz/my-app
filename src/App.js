import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colDeleteButtonEnabled: false,
            rowDeleteButtonEnabled: false,
            topStyle : {top: 60},
            leftStyle : {left: 60},
            data : null
        };

        this.totalCols = (props.totalCols || 4);
        this.totalRows = (props.totalRows || 4);

        this.selectedCol = -1;
        this.selectedRow = -1;

        //Жесткая привязка контекста
        this.addColumn = this.addColumn.bind(this);
        this.addRow = this.addRow.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.mouseOverCells = this.mouseOverCells.bind(this);
        this.mouseOutCells = this.mouseOutCells.bind(this);
        this.SetEnabledRowDeleteButton = this.SetEnabledRowDeleteButton.bind(this);
        this.setEnabledColDeleteButton = this.setEnabledColDeleteButton.bind(this);
        this.setDisabledRowDeleteButton = this.setDisabledRowDeleteButton.bind(this);
        this.setDisabledColDeleteButton = this.setDisabledColDeleteButton.bind(this);
    }

    componentWillMount(){
        this.setDataCells();
    }

    setDataCells() {
        let arr = [];
        for (let r = 0; r < this.totalRows; r++){
            arr[r] = [];
            for (let c = 0; c < this.totalCols; c++){
                arr[r][c] = '';
            }
        }
        this.setState({data: arr});
    }

    mouseOverCells(event) {
        if (event.target.classList.contains('cells__td')) {
            this.selectedCol = event.target.cellIndex;
            this.selectedRow = event.target.parentElement.rowIndex;

            if (this.totalCols > 1)
                this.setState({colDeleteButtonEnabled: true});
            if (this.totalRows > 1)
                this.setState({rowDeleteButtonEnabled: true});

            this.setState({topStyle: {top: event.nativeEvent.layerY-event.nativeEvent.offsetY}});
            this.setState({leftStyle: {left: event.nativeEvent.layerX-event.nativeEvent.offsetX}});
        }
    }

    mouseOutCells() {
        this.setDisabledRowDeleteButton();
        this.setDisabledColDeleteButton();
    }

    SetEnabledRowDeleteButton() {
        if (this.totalRows > 1)
            this.setState({rowDeleteButtonEnabled: true});
    }

    setEnabledColDeleteButton() {
        if (this.totalCols > 1)
            this.setState({colDeleteButtonEnabled: true});
    }

    setDisabledRowDeleteButton() {
        this.setState({rowDeleteButtonEnabled: false});
    }

    setDisabledColDeleteButton() {
        this.setState({colDeleteButtonEnabled: false});
    }

    addColumn() {
        let {data}  = this.state;
        data.map(function (row) {return row.push('')});
        this.setState({data: data});
        this.totalCols++;
    }

    addRow() {
        let {data}  = this.state;
        let b = data[0].map(function (){ return '';});
        data.push(b);
        this.setState({data: data});
        this.totalRows++;
    }

    deleteColumn() {
        if (this.totalCols > 1) {
            this.setDisabledColDeleteButton();
            let {data}  = this.state;
            let c = this.selectedCol;
            data.map(function (row) {return row.splice(c,1)});
            this.setState({data: data});
            this.totalCols--;
        }
    }

    deleteRow() {
        if (this.totalRows > 1) {
            this.setDisabledRowDeleteButton();
            let {data}  = this.state;
            data.splice(this.selectedRow,1);
            this.setState({data: data});
            this.totalRows--;
        }
    }

    getClassNameDeleteColButton() {
        const c = 'cells__buttons cells__delete_button cells__delete_column_button';
        return this.state.colDeleteButtonEnabled? c+' cells__button-enabled' : c
    }

    getClassNameDeleteRowButton() {
        const c = 'cells__buttons cells__delete_button cells__delete_row_button';
        return this.state.rowDeleteButtonEnabled? c+' cells__button-enabled' : c
    }

    getData(){
        return this.state.data.map(function (row, index) {
            return <tr key={index}>{
                row.map(function (td, index) {
                return <td className='cells__td' key={index}>{td}</td>;
            })
        }</tr>;
        });
    }

    render() {
        return (
            <div>
            <table className = 'cells__table' onMouseOver = {this.mouseOverCells} onMouseOut = {this.mouseOutCells}>
    <tbody>
        {this.getData()}
    </tbody>
        </table>
        <button className = 'cells__buttons cells__add_button cells__add_row_button' onClick = {this.addRow}><i className='fa fa-plus'></i></button>
        <button className = 'cells__buttons cells__add_button cells__add_columm_button' onClick = {this.addColumn}><i className='fa fa-plus'></i></button>
        <button style = {this.state.topStyle} className = {this.getClassNameDeleteRowButton()} onMouseOver = {this.SetEnabledRowDeleteButton} onMouseOut = {this.setDisabledRowDeleteButton} onClick = {this.deleteRow}><i className='fa fa-minus'></i></button>
        <button style = {this.state.leftStyle} className = {this.getClassNameDeleteColButton()} onMouseOver = {this.setEnabledColDeleteButton} onMouseOut = {this.setDisabledColDeleteButton} onClick = {this.deleteColumn}><i className='fa fa-minus'></i></button>
        </div>
    )
    }
}

export default App;
