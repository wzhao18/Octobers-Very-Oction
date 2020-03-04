import React from "react";

import "./styles.css";
import {getAllItems} from '../../Model/Merchandise';
import ItemData from '../ItemData';
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import PriceRow from "../PriceRow"
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PriceList from '../PriceList'


/* The ItemView Component */
class ItemView extends React.Component {

  state = {
    shown: false,
    bid: false,
    sell: false,
    showBids: false,
    showAsks: false
  };

  showPopUp = (e) => {
    if(e.target.classList.contains("buy-btn")){
      this.setState({
        shown: true,
        bid: true,
        sell: false
      });
    }
    else{
      this.setState({
        shown: true,
        bid: false,
        sell: true
      });
    }
  }


  closePopUp = () => {
    this.setState({
      shown: false,
      showBids: false,
      showAsks: false
    });
  }

  cancelPopUp = (e) => {
    console.log('shit');
    const backgroundDiv = document.querySelector("#background-div");
    if(e.target === backgroundDiv) {
      this.closePopUp()
    }
  }

  showTable = (e) => {
    console.log(e.target)
    console.log("aaaaaaahwekfbhjewfbhjewb")
    if(e.target.classList.contains("viewAsk")){
      console.log("good")
      this.setState({
        showAsks: true
      });
    }
    else{
      console.log("bad")
      this.setState({
        showBids: true
      });
    }
  }


  render() {
    let {
      item,
      currentUser
    } = this.props;

    if(item == null){
      item = getAllItems()[0];
    }

    const submit = (e) => {
      e.preventDefault();
      if(currentUser == null){
        alert("please log in")
        this.closePopUp()
        return
      }
      const price = parseInt(document.querySelector("#price").value);
      if(price <= 0){
        alert("invalid price")
      }
      if(this.state.bid){
        item.addBid(price, currentUser)
      }
      else{
        item.addAsk(price, currentUser)
      }
      alert("good");
      this.closePopUp()
    };

    let asksTable;
    let bidsTable;

    if(this.state.showAsks) {
      asksTable = (
        <div className="popup-background" id="background-div" onClick={this.cancelPopUp}>
          <Table>
          <TableBody className = "priceTable">
              <TableCell component="th" scope="row">
                All Asks 
              </TableCell>
              {item.getAllAsks().map(price => {return <PriceRow price={price}/>})}
            </TableBody>
        </Table>
        </div>
      );
    };

    if(this.state.showBids) {
      console.log('dasdasdasdasdasdsad')
      bidsTable = (
        <div className="table-background" id="background-div" onClick={this.cancelPopUp}>
          <Table>
            <TableBody className = "priceTable">
            <TableRow >
              <TableCell component="th" scope="row">
                All Bids 
              </TableCell>
              </TableRow>
              {/* <p>Shit</p> */}
                {item.getAllBids().map(price => {return <PriceRow price={price}/>})}
              </TableBody>
          </Table>
        </div>
      );
    };

    let popup;
    if(this.state.shown) {
      popup = (
        <div className="popup-background" id="background-div" onClick={this.cancelPopUp}>
          <div className="popup" id="login-div">
          <form onSubmit={submit}>
            <label htmlFor="price"><strong>Price</strong></label>
            <input type="text" id="price" name="price"></input><br/>
            <button class = "placeButton"type = "submit">Confirm</button>        
          </form>
        </div>
        </div>
      );
    };


    console.log(item.getAllAsks())
    console.log(item.getAllAsks())
    

    return (
      <div>
        <div className="container">
          <div className="left-column">
                  <img src={item.itemImageSrc}/>
              </div>
        
              
              <div className="right-column">
            
                  <div className="product-description">
                      <span>{item.itemCategory}</span>
                      <h1>{item.itemName}</h1>
                      <p>{item.itemDescription} </p>
                  </div>

              
                  <div className="product-price">
                      <span id = "bidPrice">{"$" + item.getLowestAsk()}</span>
                      <a className="buy-btn" onClick = {this.showPopUp}>Bid</a>
                      <span id = "sellPrice">{"$" + item.getHighestBid()}</span>
                      <a className="sell-btn" onClick = {this.showPopUp}>Sell</a>
                  </div>

                  
                  <div className="viewButton">
                    <a className="viewAsk" onClick = {this.showTable} >View All Asks</a>
                    <a className="viewBid" onClick = {this.showTable} >View All Bids</a>
                  </div>

                  <div>
                    <PriceList item={item} isBid={false} class="priceList"></PriceList>
                    <PriceList item={item} isBid={true} class="priceList"></PriceList>
                  </div>
              </div>
          

              {popup}
              {asksTable}
              {bidsTable}

        
        </div>
        <ItemData item = {item}
        />
      </div>

    );
  }
}

export default ItemView;
