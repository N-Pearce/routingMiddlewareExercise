const ExpressError = require('./expressError');
const items = require('./fakeDb')

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this)
    }

    static getAll(){
        return items;
    }

    static find(name){
        const found = items.find(item => item.name === name)
        if (!found) throw new ExpressError('Not found', 404)
        return found
    }

    static update(name, data){
        const found = items.find(item => item.name === name)
        if (!found) throw new ExpressError('Not found', 404)
        found.name = data.name
        found.price = data.price        
        return found
    }

    static delete(name){
        let idx = items.findIndex(item => item.name === name)
        if (!idx) throw new ExpressError('Not found', 404)
        items.splice(idx,1)
    }
}

module.exports = Item;