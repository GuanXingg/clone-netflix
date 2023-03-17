import { faker } from '@faker-js/faker';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const generateUsers = (n) => {
  if (n <= 0 || typeof n !== 'number') return [];
  const userList = [];

  Array.from(new Array(n)).forEach(() => {
    const pass = faker.internet.password(15, true, /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/);
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(pass, salt);
    const randNum = Math.floor(Math.random() * 10 + 1);

    const user = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: hashPass,
      showPass: pass,
    };

    if (randNum > 5) {
      user.fullName = faker.name.fullName();
      user.gender = faker.name.sex();
      user.phone = faker.phone.number('+84 09# #### ###');
    }

    userList.push(user);
  });

  return userList;
};

(() => {
  const userList = generateUsers(5);

  const dbData = {
    users: userList,
  };

  fs.writeFile('db.json', JSON.stringify(dbData), () => {
    console.log('>>> Generate random data successfully!!! :)) ✨✨✨');
  });
})();
