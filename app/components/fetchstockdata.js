import React from 'react';
import ReactDOM from 'react-dom';
import ReactHighcharts from 'react-highcharts'; // Expects that Highcharts was loaded in the code. react-highstock
// import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import ReactHighstock from 'react-highcharts/ReactHighstock.src'; // Expects that Highcharts was loaded in the code.

class FetchStockData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      data: [],
      stock: 'MSFT'
    };
  }

  componentDidMount(){
      let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&outputsize=full&apikey=HOFON6NCZGGNG78W';
       // Your dedicated access key is: HOFON6NCZGGNG78W
       let array = [];
      fetch(url, {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => (res.json()))
      .catch(error => console.error('Error:', error))
      .then(response => {
          let data = response['Time Series (1min)'];
          Object.keys(response['Time Series (1min)']).map(i => array.push([new Date(i).getTime(), Number(data[i]['1. open']), Number(data[i]['2. high']), Number(data[i]['3. low']), Number(data[i]['4. close']), Number(data[i]['5. volume'])]));
          this.setState({
            data: array.sort()
          });
      });
  }

  componentWillReceiveProps(newProps){
      let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+newProps.stock+'&interval=1min&outputsize=full&apikey=HOFON6NCZGGNG78W';
       // Your dedicated access key is: HOFON6NCZGGNG78W
       let array = [];
      fetch(url, {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => (res.json()))
      .catch(error => console.error('Error:', error))
      .then(response => {
          let data = response['Time Series (1min)'];
          Object.keys(response['Time Series (1min)']).map(i => array.push([new Date(i).getTime(), Number(data[i]['1. open']), Number(data[i]['2. high']), Number(data[i]['3. low']), Number(data[i]['4. close']), Number(data[i]['5. volume'])]));
          this.setState({
            data: array.sort(),
            stock: newProps.stock
          });
      });
  }

  render(){
      // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        dataLength = this.state.data != undefined ? this.state.data.length : '',
        // set the allowed units for data grouping
        groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ]],

        i = 0;

    for (i; i < dataLength; i += 1) {
        ohlc.push([
            this.state.data[i][0], // the date
            this.state.data[i][1], // open
            this.state.data[i][2], // high
            this.state.data[i][3], // low
            this.state.data[i][4] // close
        ]);

        volume.push([
            this.state.data[i][0], // the date
            this.state.data[i][5] // the volume
        ]);
    }

    let config = {

        rangeSelector: {
            selected: 1
        },

        title: {
            text: this.state.stock + ' Historical'
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },

        series: [{
            type: this.props.type == 'default' ? 'candlestick' : this.props.type,
            name: this.state.stock,
            data: ohlc,   /// live stream npm i --save socket.io
            dataGrouping: {
                units: groupingUnits
            }
        }, {
            type: this.props.type == 'default' ? 'column' : this.props.type,
            name: 'Volume',
            data: volume,
            yAxis: 1,
            dataGrouping: {
                units: groupingUnits
            }
        }]
    };

    return (<div>
              <ReactHighstock config = {config} ></ReactHighstock>
  	      </div>);
  }
}

export default FetchStockData;