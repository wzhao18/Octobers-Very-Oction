import { addOrder } from "./Order";

class Merchandise{
  constructor(itemId, itemName, itemCategory, itemDescription, itemImageSrc) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemDescription = itemDescription;
    this.itemImageSrc = itemImageSrc;
    this.bids = {};
    this.asks = {};
    this.orderHistory = [];
  }

  getLowestAsk = function (){

    const arr = Object.keys(this.asks);
    const data = []
    for (let i = 0; i< arr.length; i++){
      data.push(parseInt(arr[i]));

    }
    if (arr.length == 0){
      return "N/A"
    }
    const result =  Math.min.apply(null, data)

    return result
  }

  getLowestAskSeller = function (){
    const price = this.getLowestAsk();
    return this.asks[price][0]
  }

  getHighestBid = function(){

    const arr = Object.keys(this.bids);
    const data = []
    for (let i = 0; i< arr.length; i++){
      data.push(parseInt(arr[i]));
    }
    if (arr.length == 0){
      return "N/A"
    }

    const result =  Math.max.apply(null, data)

    return result
  }

  getHighestBidBuyer = function (){
    const price = this.getHighestBid();
    return this.bids[price][0]
  }

  addBid = function(price, user){
    if (Object.keys(this.asks).length > 0 && price >= this.getLowestAsk()){
      const seller = this.getLowestAskSeller();
      const price = this.getLowestAsk();
      for (let i = 0; i < this.asks[price].length; i++){
        if (this.asks[price][i] === seller){
          this.asks[price].splice(i, 1)
          break;
        }
      }
      if(this.asks[price].length == 0){
        delete this.asks[price]
      }
      const order = addOrder(this, user, seller, price)
      this.orderHistory.push(order)
      user.purchaseHistory.push(order)
      seller.sellingHistory.push(order)
    }
    else{
      if(price in this.bids){
        this.bids[price].push(user)
      }
      else{
        this.bids[price] = [user]
      }
    }    
 
  }

  addAsk = function(price, user){
    if (Object.keys(this.bids).length > 0 && price <= this.getHighestBid()){

      const buyer = this.getHighestBidBuyer();

      const price = this.getHighestBid();

      for (let i = 0; i < this.bids[price].length; i++){
        if (this.bids[price][i] === buyer){
          this.bids[price].splice(i, 1)
          break;
        }
      }
      if(this.bids[price].length == 0){
        delete this.bids[price]
      }
      const order = addOrder(this, buyer, user, price)
      this.orderHistory.push(order)
      buyer.purchaseHistory.push(order)
      user.sellingHistory.push(order)
    }
    else{
      if(price in this.asks){
        this.asks[price].push(user)
      }
      else{
        this.asks[price] = [user]
      }
    }  

  }

    getAllAsks = function () {
      const arr = Object.keys(this.asks);
      const result = [];
      for (let i = 0; i< arr.length; i++){
        for (let j = 0; j < this.asks[arr[i]].length; j++){
          result.push(parseInt(arr[i]));
        }
      }
      return result;
    }

    getAllBids = function () {
      const arr = Object.keys(this.bids);
      const result = [];
      for (let i = 0; i< arr.length; i++){
        for (let j = 0; j < this.bids[arr[i]].length; j++){
          result.push(parseInt(arr[i]));
        }
      }
      return result;
    }
}

let count = 0;
const allItems = [];


export function addItem(itemName, itemCategory, itemDescription, itemImageSrc){
  for (let i = 0; i < allItems.length; i++){
    if (allItems[i].itemName == itemName){
      return false;
    }
  }
  allItems.push(new Merchandise(count, itemName, itemCategory, itemDescription, itemImageSrc));
  count ++;
  return true;
}

export function getAllItems(){
  return allItems;
}

export function filterByKeyword(originalList, keyword){
  const result = []
  for (let i = 0; i < originalList.length; i++){

    if (originalList[i].itemName.includes(keyword)){
      result.push(originalList[i])
    }
  }
  return result;
}

export function filterByCategory(originalList, category){
  const result = []
  for (let i = 0; i < originalList.length; i++){
  
    if (originalList[i].itemCategory == category){
      result.push(originalList[i])
    }
  }
  
  return result;
}

export default Merchandise;