import React from 'react';
import ReactDOM from 'react-dom';
import FetchStockData from './components/FetchStockData.js';
import Dropdown from './components/Dropdown.js';
import StockList from './StocksData.js'; //stockList


class StockExchange extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      type: 'default',
      stock: 'MSFT',
      companyName: 'Microsoft',
      stockList: StockList
    }

    this.changeType = this.changeType.bind(this);
  }
  changeType(e){
    this.setState({
      type: e.target.value || 'default'
    });
  }

  changeStock(e){
  	let value = e.target.textContent.split(' ')[0];
    let b = this.state.stockList.filter(i => i[0] == value);

    if(!b.length){
      return;
    }

    this.setState({
      stock: value,
      companyName: b[0][1]
    });    
  }

  render(){
    return (<div>
	        <FetchStockData type={this.state.type} stock={this.state.stock} companyName={this.state.companyName} />

	        <div className="row">
	        	<div className="col-md-6">
	        		<b>Select Chart Type  </b>
					<select name="type" onChange={e => this.changeType(e)}>
						<option value="default">Default</option>
						<option value="line">Line</option>
						<option value="column">Column</option>
						<option value="scatter">Scatter</option>
					</select>
	        	</div>

	        	<div className="col-md-6">
	        		<Dropdown onClick={e => this.changeStock(e)} stockList={this.state.stockList}/>
	        	</div>
	        </div>
          

          
	      </div>);
  }
}

// ========================================

ReactDOM.render(
  <StockExchange />,
  document.getElementById('tabs')
);