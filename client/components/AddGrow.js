import React, {Component} from 'react'
import { getGrowItems, addGrowItem } from '../store'
import {connect} from 'react-redux'

//marketplace to have a few tabs 
    //food 
    //domestic labor
    //sell or give away goods 
        //each of these tabs should probably be a component that conditionally renders 

class AddGrow extends Component {
    constructor(){ 
        super(); 
        this.state = {
            item: '', 
            quantity: 0, 
            price: 0
        }
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(evt){ 
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit(){
        this.props.addGrowItem(this.state.item, this.state.quantity, this.state.price, this.props.user); 
        this.setState({item: '', quantity: '', price: ''})
    }

    render() { 
        return ( 
            <div>
                <form>
                    Item:
                    <input type="text" name="item" value={this.state.item} onChange={this.handleChange}/>
                    Quantity: 
                    <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                    Price: 
                    <input type="number" name="price" value={this.state.price} onChange={this.handleChange}/>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user.id
})

const mapDispatchToProps = dispatch => ({ 
    getGrowItems: () => dispatch(getGrowItems()), 
    addGrowItem: (item, quantity, price, userId) => dispatch(addGrowItem(item, quantity, price, userId))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddGrow); 

