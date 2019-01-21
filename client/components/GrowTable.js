import React, {Component} from 'react'
// import { getGrowItems, addGrowItem } from '../store'
// import {connect} from 'react-redux'

const GrowTable = (props) => {
    console.log(props)
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
                    
                    {props.grow ? props.grow.map(item =>(
                        <tr key={item.id}>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.user.name}</td>
                            <td>
                                {props.user === item.userId ? 
                                <button>remove listing</button> 
                                : 
                                <span>
                                    <input type="number" min="1" max={item.quantity}/>
                                    <button onClick={() => {
                                        props.sendMoney(props.address, item.user.ethAddress, item.price ); 
                                        //function that decrements amount in store 
                                    }}>buy</button>
                                    </span>
                                }
                            </td>
                        </tr>
                    )): null}
                    </tbody>
                </table>
        </div>
    )
}


export default GrowTable; 