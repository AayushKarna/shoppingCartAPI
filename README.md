# Introduction to this Shopping Cart API
Shopping Cart API is an interface that allows website to manage cart in the client side (data only).

## Cart Item
| Methods | Description | Parameters | Returns | Throws |
| --- | --- | --- | --- | --- |
| `constructor` | Constructs a new `CartItem` instance with validated properties from the `itemObj` parameter | `itemObj`: an object containing the properties `id`, `name`, `price`, `qty`, `taxRate`, `discountRate`, `discountAmt`, `additionalStuff` | A new `CartItem` instance | N/A |
| `increaseQty` | Increases the quantity of the cart item by a given amount and recalculates totals | `qty`: the amount to increase the quantity by | The updated `CartItem` instance | `Error` with message "Invalid Qty" if `qty` is not a positive integer |
| `decreaseQty` | Decreases the quantity of the cart item by a given amount and recalculates totals | `qty`: the amount to decrease the quantity by | The updated `CartItem` instance | `Error` with message "Invalid Qty" if `qty` is not a positive integer or `Error` with message "Cannot decrease qty, as item's qty becomes <= 0" if the new quantity would be less than or equal to zero |
|**Static Methods (Helper)**|Validate schema of Object of `CartItem`
| `validifyObj` | Validates an object containing properties for a `CartItem` instance and returns an object with the validated properties | `itemObj`: an object containing the properties `id`, `name`, `price`, `qty`, `taxRate`, `discountRate`, `discountAmt`, `additionalStuff` | An object containing the validated properties `id`, `name`, `price`, `qty`, `taxRate`, `discountRate`, `discountAmt`, and `additionalStuff` | `Error` with message "Invalid Id" if `id` is not a positive integer, `Error` with message "Invalid Name" if `name` is not a string, `Error` with message "Invalid Qty" if `qty` is not a positive integer, `Error` with message "Invalid Price" if `price` is not a positive finite number, `Error` with message "Invalid Tax Rate" if `taxRate` is not a positive finite number, `Error` with message "Invalid Discount Rate" if `discountRate` is not a non-negative finite number, or `Error` with message "Invalid Discount Amount" if `discountAmt` is not a non-negative finite number |

## Cart

| Methods | Description | Parameters | Returns | Throws |
| --- | --- | --- | --- | --- |
| `constructor` | Constructs a new `Cart` instance with the given name | `name`: a string representing the name of the cart | A new `Cart` instance | N/A |
| `addToCart` | Adds one or more `CartItem` instances to the cart, increasing the quantity of an existing item if found, or adding a new item otherwise | `...itemObjs`: one or more `CartItem` instances or objects containing the properties `id`, `name`, `price`, `qty`, `taxRate`, `discountRate`, `discountAmt`, `additionalStuff` | The updated `Cart` instance | N/A |
| `removeItemFromCart` | Removes a `CartItem` instance from the cart by its `id` | `itemId`: a positive integer representing the `id` of the item to remove | The updated `Cart` instance | N/A |
| `getTotals` | Calculates the total quantities and amounts of all items in the cart, including total quantity, total price, total tax amount, total discount amount, and total final price | N/A | An object containing the calculated totals `{totalQty, totalPrice, totalTaxAmt, totalDiscountAmt, totalFinalPrice}` | N/A |
| `getTotal` | Calculates the total final price of all items in the cart | N/A | The total final price as a positive finite number | N/A |
| `getAllCartItems` | Returns a copy of all `CartItem` instances in the cart | N/A | An array containing copies of all `CartItem` instances in the cart | N/A |
| `clearCartData` | Removes all `CartItem` instances from the cart | N/A | The updated `Cart` instance | N/A |

## Utility Class (Helpers)
| Methods | Description | Parameters | Returns | Throws |
| --- | --- | --- | --- | --- |
| `isPositiveInteger` | Checks if a given number is a positive integer | `n`: a number | `true` if `n` is a positive integer, otherwise `false` | N/A |
| `isNonNegativeFinite` | Checks if a given number is a non-negative finite number | `n`: a number | `true` if `n` is a non-negative finite number, otherwise `false` | N/A |
| `isPositiveFinite` | Checks if a given number is a positive finite number | `n`: a number | `true` if `n` is a positive finite number, otherwise `false` | N/A |
| `validate` | Validates a value against a given test function, throws an error with a message if the test fails | `testFn`: a function that takes a value and returns a boolean, `value`: the value to validate, `message`: the error message to throw if the test fails | The validated `value` | `Error` with the given `message` if the test fails |
