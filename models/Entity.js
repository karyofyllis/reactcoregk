export default class Entity {
    init(entity) {
        for (let prop in entity) {
            this[prop] = entity[prop];
        }
    }
}
