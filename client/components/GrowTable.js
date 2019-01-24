import React, {Component} from 'react'
import { getGrowItems, deleteGrowItem, buyGrowItem } from '../store'
import {connect} from 'react-redux'

class GrowTable extends Component {
    constructor(){
        super(); 
        this.state = {
            selectedItem: null, 
            selectedQuantity: null
        }
    }
    componentDidMount(){
        this.props.getGrowItems(); 
    }
    handleBuy(item, quantity){ 
        this.props.sendMoney(this.props.address, item.user.ethAddress, item.price ); 
        //decrement database 
        this.props.buyGrowItem(item, quantity); 
    }

    render(){
        console.log('selected item', this.state.selectedItem)
        console.log(this.props); 
        
        return (
            <div>
                <table>
                        <tbody>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sold By</th>
                                <th>Add to Cart</th>
                            </tr>
                        
                        {this.props.grow ? this.props.grow.map(item =>(
                            <tr key={item.id}>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                                <td>{(item.price/100).toFixed(2)}</td>
                                <td>{item.user.name}</td>
                                <td>
                                {this.props.user === item.userId ? 
                                <button onClick={()=>this.props.deleteGrowItem(item.id)}>remove listing</button> 
                                : 
                                ( 
                                this.state.selectedItem === item.item ? 
                                
                                    (<span>
                                        <input type="number" min="1" max={item.quantity} onChange={(evt)=> this.setState({selectedQuantity: evt.target.value})}/>
                                        <button onClick={() => handleBuy(item) }>buy {this.state.selectedQuantity} {this.state.selectedItem} for {((item.price/100)* this.state.selectedQuantity).toFixed(2)} CC</button>
                                    </span>) 
                                    : <button onClick={()=>{this.setState({selectedItem: item.item, selectedQuantity: 0})}}>Select</button>
                                )
                                }
                                </td>
                            </tr>
                        )): null}
                        </tbody>
                    </table>
            </div>
        
        )
    }
}


const mapStateToProps = state => ({ 
    grow: state.grow.growItems,
    user: state.user.id
})

const mapDispatchToProps = dispatch => ({ 
    getGrowItems: () => dispatch(getGrowItems()), 
    deleteGrowItem: (itemId) =>dispatch(deleteGrowItem(itemId)), 
    buyGrowItem: (itemId, quantity) => dispatch(buyGrowItem(itemId, quantity)); 
    
})

export default connect(mapStateToProps, mapDispatchToProps)(GrowTable); 