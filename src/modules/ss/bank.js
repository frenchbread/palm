import mongooseModel from './mongoose_model';
import { palm } from '../../server.js';

export default class Bank {

  constructor () {
    this.BankDB = mongooseModel;
    this.palm = palm;
  }

  changeBalance (amount, currency) {
    return new Promise((resolve, reject) => {
      this.BankDB.findOne({ isBank: true }, (err, item) => {
        if (err) reject(err);
        if (!currency || currency === 'eur') {
          item.eur += amount;
          item.save((err2) => {
            if (err2) reject(err2);
            resolve(item.eur);
          });
        } else if (currency === 'rub') {
          item.rub += amount;
          item.save((err2) => {
            if (err2) reject(err2);
            resolve(item.rub);
          });
        }
      });
    });
  }

  checkBalance () {
    return new Promise((resolve, reject) => {
      this.BankDB.findOne({ isBank: true }, (err, item) => {
        if (err) reject(err);
        resolve([item.eur, item.rub]);
      });
    });
  }
}
