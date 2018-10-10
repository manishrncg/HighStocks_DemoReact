import React, {Component} from 'react';

class Dropdown extends Component {
	constructor(props){
		super(props);
		this.state = {
			li: '',
			liSelected: false,
			stockList: this.props.stockList
		};
	}

	onClick(){
		this.setState({ liSelected: true });
	}

	onChangeListSimilar(e){
		let value = e.target.value.toLowerCase();
		let valueReg = new RegExp('^'+value+'.*$');
		let searchResults = [];
		
		let index = this.state.stockList.filter(i => ( i[0].toLowerCase().match(valueReg) || i[1].toLowerCase().match(valueReg) ));
		searchResults = value=="" || index.map(i => (<li key={i} value={i[0]}>{i[0]+' ('+i[1]+')'}</li>));
		this.setState({
			li: searchResults,
			liSelected: false
		});

	}

	render(){
		return (
				<div className="col-md-6 offset-md-6 col-lg-6 offset-lg-6 col-sm-12 offset-sm-0 col-xs-12 offset-xs-0">
		            <b>Search company name/symbol </b>
		            <input list="stocks" name="stock" onChange={(e) => this.onChangeListSimilar(e)} />
		            {!this.state.liSelected &&
		            <ul id="list" onClick={(e) => (this.props.onClick(e), this.onClick(e))} >
		            	{this.state.li}
		            </ul>
		        	}
		      	</div>
	          );
	}
}
export default Dropdown;