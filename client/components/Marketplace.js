import React, {Component} from 'react'
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
        this.state = {}
    }

    componentDidMount(){ 
        this.props.getGrowItems();
        console.log('comp did mount props', this.props)

    }

    render() { 
        console.log('its the marketplace!')
        console.log(this.props); 
        return ( 
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    
                    {this.props.grow ? this.props.grow.map(item =>(
                        <tr key={item.id}>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    )): null}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = state => ({ 
    grow: state.grow.growItems
})

const mapDispatchToProps = dispatch => ({ 
    getGrowItems: () => dispatch(getGrowItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace); 

