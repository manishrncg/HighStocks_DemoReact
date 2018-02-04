import React from 'react';
import ReactDOM from 'react-dom';
import FetchStockData from './components/FetchStockData.js';

class StockExchange extends React.Component {
  constructor(props){
    super(props);

  let stockList = [['MSFT', 'Microsoft'],
                    ['FB', 'FB'],
                    ['AAPL', 'Apple'],
                    ['20MICRONS', '20 Microns'],
                    ['21STCENMGM', '21st Cent. Mgmt.'],
                    ['3MINDIA', '3M India'],
                    ['ORCL', 'Oracle'],
                    ['CSCO', 'Cisco Systems, Inc.'],
                    ['TURN', '180 Degree Capital Corp.'],
                    ['VNET', '21Vianet Group, Inc.'],
                    ['FLWS', '1-800 FLOWERS.COM, Inc.'],
                    ['ZNGA', 'Zynga Inc.'],
                    ['WIX', 'Wix.com Ltd..com'],
                    ['WEB', 'Web.com Group, Inc.']
                  ];

    this.state = {
      type: 'default',
      stock: 'MSFT',
      stockList: stockList
    }

    this.changeType = this.changeType.bind(this);
  }
  changeType(e){
    this.setState({
      type: e.target.value || 'default'
    });
  }

  changeStock(e){
    let b = this.state.stockList.filter(i => i[0] == e.target.value);

    if(!b.length){
      return;
    }

    this.setState({
      stock: e.target.value
    });    

  }

  render(){
    return (<div>
	        <FetchStockData type={this.state.type} stock={this.state.stock} />

          <b>Select Chart Type  </b>
          <select name="type" onChange={e => this.changeType(e)}>
            <option value="default">Default</option>
            <option value="line">Line</option>
            <option value="column">Column</option>
            <option value="scatter">Scatter</option>
          </select>

          <div style={{'float': 'right'}}>
            <b>Select company name  </b>
            <input list="stocks" name="stock" onChange={e => this.changeStock(e)} />
            <datalist id="stocks">
              {this.state.stockList.map(i => <option key={i} value={i[0]} >{i[1]}</option>)}
            </datalist>
          </div>
	      </div>);
  }
}

// ========================================

ReactDOM.render(
  <StockExchange />,
  document.getElementById('tabs')
);