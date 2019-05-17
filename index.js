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
    return this.deliveries().filter(delivery =>
      delivery.meal()
    )
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
    return this.meals().reduce(function (agg, price) {
      return agg + price
    })
  }
}

class Meal {
  constructor(title, price){
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
  byPrice(){}
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
