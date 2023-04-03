"use strict";

class Utils {
  static isPositiveInteger(n) {
    return Number.isInteger(n) && n > 0;
  }

  static isNonNegativeFinite(n) {
    return Number.isFinite(n) && n >= 0;
  }

  static isPositiveFinite(n) {
    return Number.isFinite(n) && n > 0;
  }

  static validate(testFn, value, message) {
    if (!testFn(value)) {
      throw new Error(message);
    }

    return value;
  }
}

class CartItem {
  constructor(itemObj) {
    const {
      id,
      name,
      price,
      qty,
      taxRate,
      discountRate,
      discountAmt,
      additionalStuff,
    } = CartItem.validifyObj(itemObj);

    this.id = id;
    this.name = name;

    this.price = price;
    this.qty = qty;
    this.total = this._calculateTotal();

    this.taxRate = taxRate;
    this.taxAmt = this._calculateTax();

    this.discountRate = discountRate;
    this.discountAmt = discountAmt;
    this.finalDiscount = this._calculateDiscount(
      this.discountRate,
      this.discountAmt
    );

    this.finalPrice = this._calculateFinalPrice();

    this.additionalStuff = additionalStuff;
  }

  increaseQty(qty) {
    this.qty += Utils.validate(Utils.isPositiveInteger, qty, "Invalid Qty");
    this._recalculateTotals();
    return this;
  }

  decreaseQty(qty) {
    if (this.qty - qty <= 0) {
      throw new Error("Cannot decrease qty, as item's qty becomes <= 0");
    }

    this.qty -= Utils.validate(Utils.isPositiveInteger, qty, "Invalid Qty");
    this._recalculateTotals();

    return this;
  }

  _calculateTotal() {
    return this.price * this.qty;
  }

  _calculateTax() {
    return (this.taxRate / 100) * this.total;
  }

  _calculateDiscount() {
    return (
      (this.total + this.taxAmt) * (this.discountRate / 100) + this.discountAmt
    );
  }

  _calculateFinalPrice() {
    return this.total + this.taxAmt - this.finalDiscount;
  }

  _recalculateTotals() {
    this.total = this._calculateTotal();
    this.taxAmt = this._calculateTax();
    this.finalDiscount = this._calculateDiscount(
      this.discountRate,
      this.discountAmt
    );
    this.finalPrice = this._calculateFinalPrice();
  }

  static validifyObj({
    id,
    name,
    price,
    taxRate,
    discountRate = 0,
    discountAmt = 0,
    qty,
    additionalStuff = null,
  }) {
    const validObj = {};

    validObj.id = Utils.validate(Utils.isPositiveInteger, id, "Invalid Id");
    validObj.name = Utils.validate(Boolean, name, "Invalid Name").trim();
    validObj.qty = Utils.validate(Utils.isPositiveInteger, qty, "Invalid Qty");
    validObj.price = Utils.validate(
      Utils.isPositiveFinite,
      price,
      "Invalid Price"
    );
    validObj.taxRate = Utils.validate(
      Utils.isPositiveFinite,
      taxRate,
      "Invalid Tax Rate"
    );
    validObj.discountRate = Utils.validate(
      Utils.isNonNegativeFinite,
      discountRate,
      "Invalid Discount Rate"
    );
    validObj.discountAmt = Utils.validate(
      Utils.isNonNegativeFinite,
      discountAmt,
      "Invalid Discount Amount"
    );
    validObj.additionalStuff = additionalStuff;

    return validObj;
  }
}

class Cart {
  #cart = [];
  #name = "";

  constructor(name) {
    this.#name = name;
  }

  addToCart(...itemObjs) {
    itemObjs.forEach((itemObj) => {
      const existingItem = this.#cart.find((item) => item.id === itemObj.id);

      if (existingItem) {
        existingItem.increaseQty(itemObj.qty);
      } else {
        if (itemObj instanceof CartItem) {
          this.#cart.push(itemObj);
        } else {
          this.#cart.push(new CartItem(itemObj));
        }
      }
    });

    return this;
  }

  removeItemFromCart(itemId) {
    const itemIndex = this.#cart.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      console.log(`No item with id: ${itemId} found in cart!`);
    }

    this.#cart.splice(itemIndex, 1);

    return this;
  }

  getTotals() {
    const totalObj = this.#cart.reduce(
      (acc, item) => {
        acc.totalQty += item.qty;
        acc.totalPrice += item.total;
        acc.totalTaxAmt += item.taxAmt;
        acc.totalDiscountAmt += item.discountAmt;
        acc.totalFinalPrice += item.finalPrice;

        return acc;
      },
      {
        totalQty: 0,
        totalPrice: 0,
        totalTaxAmt: 0,
        totalDiscountAmt: 0,
        totalFinalPrice: 0,
      }
    );

    return totalObj;
  }

  getTotal() {
    return this.#cart.reduce((accTotal, item) => accTotal + item.finalPrice, 0);
  }

  getAllCartItems() {
    const cartCopy = [...this.#cart];
    return cartCopy;
  }

  clearCartData() {
    this.#cart = [];
    return this;
  }
}
