import React, {Component} from 'react'
import AddGrow from './AddGrow'
import GrowTable from './GrowTable'
import { getGrowItems } from '../store'
import {connect} from 'react-redux'

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
    componentDidMount(){ 
        this.props.getGrowItems();
        console.log('comp did mount props', this.props)

    }

    handleClick(evt){ 
        console.log('evttarget', evt.target.value)
        this.setState({display: evt.target.value})

    }

    render() { 
        console.log('its the marketplace!')
        console.log(this.props); 
        return ( 
            <div>
                <span><button type="button" value="Grow" onClick={this.handleClick}>Grow</button><button type="button" value="Labor" onClick={this.handleClick}>Labor</button><button type="button" value="Exchange" onClick={this.handleClick}>Exchange</button></span>
                {this.state.display === "Grow" ? (<div><GrowTable user={this.props.user} grow={this.props.grow}/> <AddGrow /></div>)  : null}
                {this.state.display === "Labor" ? (<div>labor</div>)  : null}
                {this.state.display === "Exchange" ? (<div>exchange</div>)  : null}
                
                
            </div>
        )
    }

}

const mapStateToProps = state => ({ 
    grow: state.grow.growItems,
    user: state.user.id
})

const mapDispatchToProps = dispatch => ({ 
    getGrowItems: () => dispatch(getGrowItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace); 

