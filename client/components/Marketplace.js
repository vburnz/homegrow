import React, {Component} from 'react'
import AddGrow from './AddGrow'
import GrowTable from './GrowTable'
import { getGrowItems, deleteGrowItem } from '../store'
import {connect} from 'react-redux'
import ComposedContractComponent from './ContractComponent'


//marketplace to have a few tabs 
    //food 
    //domestic labor
    //sell or give away goods 
        //each of these tabs should probably be a component that conditionally renders 

class Marketplace extends Component {
    constructor(){ 
        super(); 
        this.state={
            display: ''
        }
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick(evt){ 
        this.setState({display: evt.target.value})

    }

    render() { 
        console.log('marketplace props', this.props); 
        return ( 
            <div>
                {/* <h3>Account Balance: {this.props.}</h3> */}
                <span>
                    <button type="button" className="btn btn-success market-button" value="Grow" onClick={this.handleClick}>Grow</button>
                    <button type="button" className="btn btn-success market-button" value="Labor" onClick={this.handleClick}>Labor</button>
                    <button type="button" className="btn btn-success market-button" value="Exchange" onClick={this.handleClick}>Exchange</button>
                </span>
                {this.state.display === "Grow" ? 
                (<div>
                    <GrowTable 
                        user={this.props.user} 
                        sendMoney={this.props.sendMoney} 
                        address={this.props.address} 
                    /> 
                    <AddGrow />
                </div>)  : null}
                {this.state.display === "Labor" ? (<div>labor</div>)  : null}
                {this.state.display === "Exchange" ? (<div>exchange</div>)  : null}
                <button className="btn btn-success market-button" onClick={this.props.mintMoney}>Mint Money</button>
                
                
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user.id, 
    address: state.user.ethAddress
})

const mapDispatchToProps = dispatch => ({ 

    
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposedContractComponent(Marketplace)); 

