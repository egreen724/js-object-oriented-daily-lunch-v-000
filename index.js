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

  deliveries(){}
  customers(){}
  meals(){}

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries(){}
  meals(){}
  totalSpent(){}
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries(){}
  customers(){}
  byPrice(){}
}
