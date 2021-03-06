import React, {Component} from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src'; // Expects that Highcharts was loaded in the code

class HighChartRender extends Component{

	render(){
		  // split the data set into ohlc and volume
		    var ohlc = [],
		        volume = [],
		        dataLength = this.props.data !== undefined ? this.props.data.length : '',
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
		            this.props.data[i][0], // the date
		            this.props.data[i][1], // open
		            this.props.data[i][2], // high
		            this.props.data[i][3], // low
		            this.props.data[i][4] // close
		        ]);

		        volume.push([
		            this.props.data[i][0], // the date
		            this.props.data[i][5] // the volume
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
		            type: this.props.type === 'default' ? 'candlestick' : this.props.type,
		            name: this.props.stock,
		            data: ohlc,   /// live stream npm i --save socket.io
		            dataGrouping: {
		                units: groupingUnits
		            }
		        }, {
		            type: this.props.type === 'default' ? 'column' : this.props.type,
		            name: 'Volume',
		            data: volume,
		            yAxis: 1,
		            dataGrouping: {
		                units: groupingUnits
		            }
		        }]
		    };

    	return (<ReactHighstock config = {config} ></ReactHighstock>);
	}
}

export default HighChartRender;