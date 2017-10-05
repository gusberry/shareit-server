import times from 'lodash/times';
import Fakerator from 'fakerator';

const { names, internet, address, random } = new Fakerator();

export const users = times(4, () => ({
  name: names.firstName(),
  surname: names.lastName(),
  email: internet.email(),
}));

export const transactions = times(4, () => ({
  name: address.city(),
  amount: random.number(9999),
}));

export const groups = times(4, () => ({
  name: address.country(),
}));

export const fillDB = db =>
  Promise.all([
    db.User.bulkCreate(users),
    db.Transaction.bulkCreate(transactions),
    db.Group.bulkCreate(groups),
  ])
    .then(() =>
      Promise.all([
        db.User.findAll(),
        db.Transaction.findAll(),
        db.Group.findAll(),
      ]),
    )
    .then(([[us1, us2, us3, us4], [tr1, tr2, tr3, ...rest], [gr1, gr2]]) =>
      tr1
        .addUser(us1, { through: { isOwner: true } })
        // .then(() => tr1.addUsers([us2, us3, us4]))
        .then(() =>
          tr1.addUsers([2, 3, 4], { through: { isParticipant: true } }),
        )
        .then(() => gr1.addUsers([us1, us2, us4]))
        .then(() => tr1.setGroup(gr1))
        .then(() => tr3.setGroup(gr1))
        .then(() => gr2.addUsers([us1, us3, us4]))
        .then(() => tr2.addUser(us1, { through: { isOwner: true } }))
        .then(() => tr3.addUser(us1)),
    );
