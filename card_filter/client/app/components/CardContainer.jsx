var React = require('react');
var FontAwesome = require('react-fontawesome');
var axios = require('axios');

var CardContainer = React.createClass({
	getInitialState: function() {
	    return {
	      cards: [],
	      options: [],
	      filter:''
	    }
	},
	componentDidMount: function() {
    var _this = this;
    var cardUrl = 'http://127.0.0.1:4000/cards';

        this.serverRequest = 
	      axios
	        .get(cardUrl)
	        .then(function(result) {
	          _this.setState({
	            cards: result.data
	          });
	        });

	    var cardUrl = 'http://127.0.0.1:4000/campaigns';

      this.serverRequest = 
      axios
        .get(cardUrl)
        .then(function(result) {    
          
          _this.setState({
            options: result.data
          });
        })    
  	},
  	dpChangeHandler: function(e){
  		console.log(e.target.value);
  		var val = e.target.value;
  		this.setState({filter: val});
  	},
	render: function () {
		let filteredCards = this.state.cards.filter(
			(card) =>{
				if(this.state.filter == '') return true;
				return card.campaignId == this.state.filter;
			}
		);
	    return (
	      <div>
	      	<div className="top-bar">
		        <div className="top-bar-left">
		          <ul className="menu">
		            <li className="menu-text">  
		            <div className="">
		              <label>
		              <select id="dp" value={this.state.filter} onChange={this.dpChangeHandler}>
		                <option value="">All</option>
		                {this.state.options.map(function(option) {
		                  return (
		                    <option value={option.id}>{option.campaignName}</option>
		                  );
		                })}
		              </select>
		            </label>
		            </div>
		            </li>
		            <li className="menu-text">
		              <FontAwesome name='list'/> Pending
		            </li>
		          </ul>
		        </div>
		        <div className="top-bar-right">
		          <ul className="menu">
		          	<li className="menu-text">
		              <FontAwesome name='search'/>
		            </li>
			        <li className="menu-text txt-red">
		              <FontAwesome name='angle-left'/>
		            </li>
		            <li className="menu-text txt-red">
		              <FontAwesome name='calendar-o'/> 
		                &nbsp; Today, Jan 10th
		            </li>
		            <li className="menu-text txt-red">
		              <FontAwesome name='angle-right'/>
		            </li>
		            <li className="menu-text">
		                <span className="label alert">1d</span>
		            </li>
		          </ul>
		        </div>
		      </div>
        	<div className="row">
        		{filteredCards.map(function(card) {
		          return (		            
	        		<div className="medium-4 small-12 large-3 columns">
						<div className="card">
						  <img src="http://www.learningwithkevin.com/uploads/2/1/7/3/21730526/9745553.png?591" />
						  <div className="card-section">
						    <h4>{card.cardTitle}</h4>
							  <div className="row">
								<div className="float-left">
									{card.listOfPlans[0].price.currency}
									&nbsp;
									{card.listOfPlans[0].price.amount}
								</div>
							  	<div className="float-right">
							  			{card.currentWorkflow}
							  		<span className="led led-green"></span>
							  	</div>
							  </div>
						    <div className="warning progress">
							  <div className="progress-meter"></div>
							</div>
						  </div>
						  <div className="card-footer">
						  	<div className="row p-n">
						  		<div className="small-4 columns p-n">
						  			<FontAwesome name='database' /> {card.likes}
						  		</div>
						  		<div className="small-4 columns p-n">
						  			<FontAwesome name='users' />  {card.shares}
						  		</div>
						  		<div className="small-4 columns p-n">
						  			<FontAwesome name='eye' /> {card.views}
						  		</div>
						  	</div>
						  </div>
						</div>
					</div>
		          );
		        })}
				<div className="medium-3 columns">
					<div className="card create-new">
					  
					  	<div className="add">
					  	 	<div>
					  	 		<FontAwesome name='plus-circle' size="4x"/>
					  	 	</div>
					  		<h6>Create a Service Card</h6>
					  	</div>
					</div>
				</div>
        	</div>
	      </div>
	    )
	}
});

module.exports = CardContainer;