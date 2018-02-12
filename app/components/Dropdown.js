import React from 'react';
import ReactDOM from 'react-dom';

class Dropdown extends React.Component {
	
	render(){
		return (
				<div style={{'float': 'right'}}>
		            <b>Select company name  </b>
		            <input list="stocks" name="stock" onChange={this.props.onChange} />
		            <datalist id="stocks">
		              {this.props.stockList.map(i => <option key={i} value={i[0]} >{i[1]}</option>)}
		            </datalist>
		      	</div>
	          );
	}
}
export default Dropdown;