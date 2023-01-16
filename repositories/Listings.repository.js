const MongoStorage = require("./../db/MongoStorage");

module.exports = class ListingsRepository {
  constructor() {
    this.storage = new MongoStorage("listing");
  }

  find() {
    return this.storage.find();
  }

  retrieve(id) {
    return this.storage.retrieve(id);
  }

  retrieveByLoction(lat,lon) {
    return this.storage.retrieveLocation(lat,lon);
  }

  create(Listing) {
    const listing = this.storage.create(Listing);
    return listing;
  }

  update(id, Listing) {
    return this.storage.update(id, Listing);
  }

  delete(id) {
    return this.storage.delete(id);
  }
};
