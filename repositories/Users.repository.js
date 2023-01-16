const MongoStorage = require("./../db/MongoStorage");

module.exports = class UsersRepository {
  constructor() {
    this.storage = new MongoStorage("user");
  }

  find() {
    return this.storage.find();
  }

  retrieve(id) {
    return this.storage.retrieve(id);
  }

  retrieveByEmail(email) {
    return this.storage.retrieveEmail(email);
  }

  create(User) {
    const user = this.storage.create(User);
    return user;
  }

  update(id, User) {
    return this.storage.update(id, User);
  }

  delete(id) {
    return this.storage.delete(id);
  }
};
