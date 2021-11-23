'use strict';

function Food() {
	this.getPrice = function() {
	    if (this instanceof Hamburger) {
      	    return Hamburger.SIZES[this.getSize()].price + Hamburger.STUFFINGS[this.getStuffing()].price;
        }
	    if (this instanceof Salad) {
      	    return Salad.TYPES[this.getType()].price * this.getWeight() / 100;
        }
	    if (this instanceof Drink) {
      	    return Drink.TYPES[this.getType()].price;
        }
	}
  
    this.getCalories = function() {
  	    if (this instanceof Hamburger) {
      	    return Hamburger.SIZES[this.getSize()].calories + Hamburger.STUFFINGS[this.getStuffing()].calories;
        }
	    if (this instanceof Salad) {
      	    return Salad.TYPES[this.getType()].calories * this.getWeight() / 100;
        }
	    if (this instanceof Drink) {
      	    return Drink.TYPES[this.getType()].calories;
        }
    }
    
	if (this instanceof Salad || this instanceof Drink) {
  	    this.getType = function() {
    	    return this._type;
        }
    }
}

function Hamburger(size, stuffing) {	
	Food.call(this);
    this._size = size;
    this._stuffing = stuffing;
} 

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE';
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO';

Hamburger.SIZES = {
    [Hamburger.SIZE_SMALL]: {
        price: 50,
        calories: 20
    },
    [Hamburger.SIZE_LARGE]: {
        price: 100,
        calories: 40
    }
}

Hamburger.STUFFINGS = {
    [Hamburger.STUFFING_CHEESE]: {
        price: 10,
        calories: 20
    },
    [Hamburger.STUFFING_SALAD]: {
        price: 20,
        calories: 5
    },
    [Hamburger.STUFFING_POTATO]: {
        price: 15,
        calories: 10
    }
}

Hamburger.prototype.getSize = function() {
    return this._size;
}
Hamburger.prototype.getStuffing = function() {
    return this._stuffing;
}

function Salad(type, weight) {
	Food.call(this);
    this._type = type;
    this._weight = parseInt(weight);
}

Salad.TYPE_CAESAR = 'CAESAR';
Salad.TYPE_OLIVIER = 'OLIVIER';

Salad.TYPES = {
    [Salad.TYPE_CAESAR]: {
        price: 100,
        calories: 20
    },
    [Salad.TYPE_OLIVIER]: {
        price: 50,
        calories: 80
    }
}

Salad.prototype.getWeight = function() {
	return this._weight;
}

function Drink(type) {
	Food.call(this);
    this._type = type;
}

Drink.TYPE_COLA = 'COLA';
Drink.TYPE_COFFEE = 'COFFEE';

Drink.TYPES = {
	[Drink.TYPE_COLA]: {
        price: 50,
        calories: 40
    },
    [Drink.TYPE_COFFEE]: {
        price: 80,
        calories: 20
    }
}

function Order() {
	this._items = [];
    this._paid = false;
}

Order.prototype.addItem = function(item) {
	if (this._paid) {
  	    throw new Error('Невозможно добавить позицию после оплаты заказа');
    }
	this._items.push(item);
}
Order.prototype.pay = function() {
	this._paid = true;
}
Order.prototype.removeItem = function(item) {
	if (this._paid) {
  	    throw new Error('Невозможно удалить позицию после оплаты заказа');
    }
    if (this._items.indexOf(item) >= 0) {
        this._items.splice(this._items.indexOf(item), 1);
    }
}

Order.prototype.getTotalPrice = function() {
    const totalPrice = this._items.reduce((acc, currentItem) => {
        acc += currentItem.getPrice();
        return acc;
    }, 0);
    console.log(`Стоимость заказа: ${totalPrice} тугриков`);
    return totalPrice;
}

Order.prototype.getTotalCalories = function() {
	const totalCalories = this._items.reduce((acc, currentItem) => {
        acc += currentItem.getCalories();
        return acc;
    }, 0);
    console.log(`Калорийность заказа: ${totalCalories} калорий`);
    return totalCalories;
}

const bigHamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
const smallHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
const caesarSalad = new Salad(Salad.TYPE_CAESAR, '150g');
const coffee = new Drink(Drink.TYPE_COFFEE);

const order = new Order();
order.addItem(bigHamburger);
order.addItem(smallHamburger);
order.addItem(smallHamburger);
order.addItem(caesarSalad);
order.addItem(coffee);

order.removeItem(smallHamburger);

order.getTotalPrice(); // 110 + 60 + 150 + 80 = 400
order.getTotalCalories(); // 60 + 40 + 30 + 20 = 150

order.pay();