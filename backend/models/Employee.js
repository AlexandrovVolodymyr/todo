const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and Schema
let Employee = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  phoneNumber: {
    type: Number
  }
}, {
  collection: 'employees'
});

module.exports = mongoose.model('Employee', Employee);
