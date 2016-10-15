import mongooseModel from './mongoose_model';
import { palm } from '../../server.js';

export default class Bank {

  constructor () {
    this.BankDB = mongooseModel;
    this.palm = palm;
  }

  changeBalance (amount) {
    return new Promise((resolve, reject) => {
      this.BankDB.findOne({ isBank: true }, (err, item) => {
        if (err) reject(err);
        item.balance += amount;
        item.save((err2) => {
          if (err2) reject(err2);
          resolve(item.balance);
        });
      });
    });
  }

  checkBalance () {
    return new Promise((resolve, reject) => {
      this.BankDB.findOne({ isBank: true }, (err, item) => {
        if (err) reject(err);
        resolve(item.balance);
      });
    });
  }
}
