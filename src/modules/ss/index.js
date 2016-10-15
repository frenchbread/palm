import Bank from './bank';

export default (text) => {
  const bank = new Bank();
  const res = text.split(' ');
  const operation = res[1];
  const amount = parseInt(res[2], 10);
  let initial = 0;

  switch (operation) {
    case 'add':
      initial += amount;
      break;
    case 'minus':
      initial -= amount;
      break;
    case 'status':
      bank.checkBalance()
        .then((balance) => bank.palm.send({
          to: bank.palm._parent,
          text: `Your current balance is ${balance} eur.`,
        }));
      return 'Here you go.';
    default:
      return 'Usage:\n - ss add <amount> \n - ss minus <amount>';
  }

  bank.changeBalance(initial)
    .then((finalBalance) => bank.palm.send({
      to: bank.palm._parent,
      text: `Your current balance is ${finalBalance} eur.`,
    }));

  return 'Done.';
};
