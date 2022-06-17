// This file only generates and maintains the cart items Information using a constructor function.
// All the items details are stored in the local storage.

class Products {
    constructor(id, image, description,
        unitprice, quantity, totalprice) {
        this.id = id;
        this.image = image;
        this.description = description;
        this.unitprice = unitprice;
        this.quantity = quantity;
        this.totalprice = totalprice;
    }
}

const productsList = [{
        id: 'item1',
        image: './images/Computers and Electronics/ASUS Gaming Rig.jpg',
        description: 'ASUS Gaming Rig',
        unitprice: 'R7999',
        quantity: 1,
        totalprice: 'R7999',
    },
    {
        id: 'item2',
        image: './images/Computers and Electronics/Graphics Card RTX3070.jpg',
        description: 'Graphics Card RTX3070',
        unitprice: 'R10999',
        quantity: 1,
        totalprice: 'R10999',
    },
    {
        id: 'item3',
        image: './images/Computers and Electronics/Graphics Card RTX3080.jpeg',
        description: 'Graphics Card RTX3080',
        unitprice: 'R11999',
        quantity: 1,
        totalprice: 'R11999',
    },
    {
        id: 'item4',
        image: './images/Computers and Electronics/LED Monitor.jpg',
        description: 'LED Monitor',
        unitprice: 'R3999',
        quantity: 1,
        totalprice: 'R3999',
    },
    {
        id: 'item5',
        image: './images/Computers and Electronics/LG 50-inch.jpg',
        description: 'LG 50-inch',
        unitprice: 'R14999',
        quantity: 1,
        totalprice: 'R14999',
    }
];

function set() {
    localStorage.setItem("productsList", JSON.stringify(productsList));
}

set();