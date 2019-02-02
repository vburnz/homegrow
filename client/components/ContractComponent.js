import React, { Component } from "react";
import {connect} from 'react-redux'
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Homegrow from './contracts/Homegrow.json'
import getWeb3 from "./utils/getWeb3";
import {compose} from 'redux'

// import "./App.css";

const ComposedContractComponent = OtherComponent => {
  return class Contract extends Component {
    state = { storageValue: 0, web3: null, accounts: null, contract: null, balance: null, ethAddress: this.props.user.ethAddress };

    componentDidMount = async () => {
      console.log('connected props', this.props)
      
      try {
        // Get network provider and web3 instance.
        console.log('here1');
        const web3 = await getWeb3();
         

        // Use web3 to get the user's accounts.
        console.log('here2');
        const accounts = await web3.eth.getAccounts();
        console.log('here3')
       

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Homegrow.networks[networkId];
        //console.log(deployedNetwork.address); 
        const instance = new web3.eth.Contract(
          Homegrow.abi,
          deployedNetwork && deployedNetwork.address,
        );
        // console.log(instance); 


        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance }, this.runExample);
        // if(instance){
        //   instance.Sent(function(err, result) {
        //     if (err) {return console.error(err)}
        //     console.log("It's been sent!")
        //   }
        // }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    runExample = async () => {
      const { accounts, contract } = this.state;

      // // Stores a given value, 5 by default.
      // await contract.methods.set(5).send({ from: accounts[0] });

      // // // Get the value from the contract to prove it worked.
      // const response = await contract.methods.get().call();

      
      
      //   const mint = await contract.methods.minter(); 
      // const balance =  await contract.methods.minter().call(); 
      // conso
      
      try { 
        const balance = await contract.methods.balances(this.state.address).call();
        this.setState({balance});

      } catch (err) { 
        this.setState({balance: 0 })
      }
     
      
    };

    sendMoney = async(buyer, seller, amount) => {
      const { accounts, contract } = this.state;
      await contract.methods.sendMoney(buyer, seller, amount).send({from: accounts[0]})
      const balance1 = await contract.methods.getBalance(buyer).call(); 
      const balance2 = await contract.methods.getBalance(seller).call();
        console.log(balance1, balance2); 
    }

    mintMoney = async() =>{
      const { accounts, contract } = this.state;
      console.log(this.state); 
      console.log('accounts', accounts); 
      await contract.methods.mint('0x67fd37f1078fDCB5FF9D85BacDb8a61aB9f89956', 10000).send({from: accounts[0]})
      const minter = await contract.methods.minter().call(); 
      console.log(minter); 
    }

    render() {
      
    
      console.log(this.state); 
      if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
      return (
        <div>
        <h3>current ethAddress: {this.state.ethAddress}</h3>
        <h4>current community coin balance: {this.state.balance}</h4>
        
        <OtherComponent 
          {...this.props}
          {...this.state}
          mintMoney = {this.mintMoney}
          sendMoney = {this.sendMoney}
        />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({ 
  user: state.user, 
  grow: state.grow.growItems
})
//refactor this later to grab just the ethAddress

// const ComposedContractComponent = compose( 
//   connect(mapStateToProps, null), 
//   ContractComponent
// )

export default ComposedContractComponent; 

