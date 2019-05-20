// global datastore

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>
      delivery.neighborhoodId === this.id
    )
  }
  customers(){
    return store.customers.filter(customer =>
      customer.neighborhoodId === this.id)
  }


  meals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal()
    })

    const uniqMeals = [...new Set(meals)]
    return uniqMeals;
    // return this.deliveries().map(delivery => {
    //   return delivery.meal()
    // })
  }

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>
    delivery.customerId === this.id)
  }

  meals(){
    return this.deliveries().map( delivery => {
      return delivery.meal()
    })
  }

  totalSpent(){
    let prices = this.meals().map(meal => {
      return meal.price
    })

    let totalPrice = prices.reduce((a, b) => a + b, 0);
    return totalPrice;
  }
}

class Meal {
  constructor(title, price = 0){
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>
    delivery.mealId === this.id)
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  // static byPrice() {
  //   return store.meals.sort((a, b) => a.price - b.price;)
  // }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }
  customer(){
    return store.customers.find(
      function(customer){
        return customer.id === this.customerId
      }.bind(this)
    )
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood =>
      neighborhood.id === this.neighborhoodId
    )
  }
}
