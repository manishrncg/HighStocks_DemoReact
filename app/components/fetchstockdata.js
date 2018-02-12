import React from 'react';
import ReactDOM from 'react-dom';
import ReactHighcharts from 'react-highcharts'; // Expects that Highcharts was loaded in the code. react-highstock
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
      let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&interval=1min&outputsize=full&apikey=HOFON6NCZGGNG78W';
       // Your dedicated access key is: HOFON6NCZGGNG78W
       let array = [];
      fetch(url, {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => (res.json()))
      .catch(error => console.error('Error:', error))
      .then(response => {
        // console.log(response["Monthly Adjusted Time Series"]);
          let data = response["Monthly Adjusted Time Series"];
          Object.keys(response["Monthly Adjusted Time Series"]).map(i => array.push([new Date(i).getTime(), Number(data[i]['1. open']), Number(data[i]['2. high']), Number(data[i]['3. low']), Number(data[i]['4. close']), Number(data[i]['5. adjusted close'])]));
          this.setState({
            data: array.sort(sortFunction)
          });
          // console.log(array);
      });

      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      }
  }

  componentWillReceiveProps(newProps){
      let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+newProps.stock+'&interval=1min&outputsize=full&apikey=HOFON6NCZGGNG78W';
       // Your dedicated access key is: HOFON6NCZGGNG78W
       let array = [];
      fetch(url, {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => (res.json()))
      .catch(error => console.error('Error:', error))
      .then(response => {
          let data = response["Monthly Adjusted Time Series"];
          Object.keys(response["Monthly Adjusted Time Series"]).map(i => array.push([new Date(i).getTime(), Number(data[i]['1. open']), Number(data[i]['2. high']), Number(data[i]['3. low']), Number(data[i]['4. close']), Number(data[i]['5. adjusted close'])]));
          this.setState({
            data: array.sort(sortFunction),
            stock: newProps.stock
          });
      });

      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      }
  }

  render(){
      // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        dataLength = this.state.data != undefined ? this.state.data.length : '',
        // set the allowed units for data grouping
        groupingUnits = [[
                            'minute',
                            [1, 2, 5, 10, 15, 30]
                        ], [
                            'hour',
                            [1, 2, 3, 4, 6, 8, 12]
                        ], [
                            'day',
                            [1]
                        ], [
                            'week',
                            [1]
                        ], [
                            'month',
                            [1, 3, 6]
                        ]];
                        
       var i = 0;

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
            text: this.props.stock + ' Historical ('+this.props.companyName+')'
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