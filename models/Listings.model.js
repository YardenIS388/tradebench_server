const { Schema, model } = require("mongoose");

const ListingSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lon: { type: Number, requires: true },
    tags: { type: [String], required: false, unique: false },
    number_of_items: { type: Number, required: true, unique: false },
    images: { type: [String], required: false, unique: false }, // images url will be stored here refrencing their url in cloudinary
  },
  { collection: "listings" }
);

module.exports = model("Listing", ListingSchema);