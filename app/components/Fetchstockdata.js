import React from 'react';
import ReactDOM from 'react-dom';
import HighChartRender from './HighChartRender';

class FetchStockData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      data: [],
      stock: 'MSFT'
    };
  }

  sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
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
          let data = response["Monthly Adjusted Time Series"];
          Object.keys(data)
                    .map(i => array.push(
                      [new Date(i).getTime(), Number(data[i]['1. open']), Number(data[i]['2. high']), Number(data[i]['3. low']), Number(data[i]['4. close']), Number(data[i]['5. adjusted close'])]
                      ));
          this.setState({
            data: array.sort(this.sortFunction)
          });
      });
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
          data && Object.keys(data)
                    .map(i => array.push(
                      [new Date(i).getTime(), Number(data[i]['1. open']), Number(data[i]['2. high']), Number(data[i]['3. low']), Number(data[i]['4. close']), Number(data[i]['5. adjusted close'])]
                      ));
          this.setState({
            data: array.sort(this.sortFunction),
            stock: newProps.stock
          });
      });

  }

  render(){
    

    return (<HighChartRender data = {this.state.data} type={this.props.type} stock={this.props.stock} companyName={this.props.companyName} ></HighChartRender>);
  }
}

export default FetchStockData;