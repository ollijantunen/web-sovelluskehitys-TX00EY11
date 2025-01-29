const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

// Mock login
const login = (req, res) => {
  console.log(req.body);
  const userName = req.body.username;
  const passWord = req.body.password;

  if (!userName || !passWord) {
    res.status(400);
    return res.json({message: 'Missing needed login data'});
  }

  const foundUser = users.filter((user) => user.username === userName);
  console.log(foundUser);

  if (foundUser.length > 0) {
    console.log(foundUser[0].password, passWord);

    if (foundUser[0].password === passWord) {
      res.status(200);
      return res.json({message: 'login successful'});
    } else {
      return res.status(400).json({message: 'login not successful'});
    }
  } else {
    res.status(400).json({message: 'No such user'});
  }

  res.status(400).json({message: 'login attempt not successful'});
};

// Haetaan kaikki käyttäjät
const getUsers = (req, res) => {
  res.status(200).json(users);
};

// Haetaan käyttäjä id:n perusteella
const getUserById = (req, res) => {
  console.log('getUserById', req.params.id);
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property'});
  }

  const foundUser = users.filter((user) => user.id === id);
  console.log(foundUser);
  if (foundUser.length > 0) {
    res.status(200);
    return res.json(foundUser);
  }

  res.status(400).json({message: 'No such id'});
};

// Luodaan uusi käyttäjä
const addUser = (req, res) => {
  console.log('addUser req.body', req.body);

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username && password && email) {
    const newId = users[users.length - 1].id + 1;

    const newUser = {
      id: newId,
      username: username,
      password: password,
      email: email,
    };
    console.log(newUser);

    users.push(newUser);

    res.status(201);
    return res.json({message: 'User added'});
  }

  res.status(400);
  return res.json({message: 'Request is missing required attributes.'});
};

// Päivitetään käyttäjän tietoja
const updateUser = (req, res) => {
  console.log('updateUser request body: ', req.params.id, req.body);

  // muunnetaan id-parametri numero-tyyppiseksi
  const id = Number(req.params.id);
  const newUserName = req.body.username;
  const newPassword = req.body.password;
  const newEmail = req.body.email;

  console.log(newEmail);

  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  // typeof Number == number
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  }

  if (newUserName || newPassword || newEmail) {
    // etsitään id:tä vastaava user. Jos ei löydy, niin user on undefined
    const user = users.find((user) => user.id === id);

    // Jos item löytyi id:n perusteella, päivitetään kyseisen id:n tietue uusilla bodyn tiedoilla
    if (user) {
      if (newUserName) {
        user.username = newUserName;
      }

      if (newPassword) {
        user.password = newPassword;
      }

      if (newEmail) {
        user.email = newEmail;
      }

      res.status(200);
      return res.json({
        message: `Record of id ${id} was updated.`,
        updatedUser: user,
      });
    } else {
      // Jos id:tä vastaavaa useria ei löydy, palautetaan virheilmoitus
      res.status(400);
      return res.json({message: 'No such user.'});
    }
  } else {
    //  Jos jotakin vaadittavaa parametria ei löydy bodyn mukana tai se on tyhjä, palautetaan virheilmoitus
    res.status(400);
    return res.json({
      message: 'Property to be updated is not found in the request.',
    });
  }
};

// Poistetaan käyttäjä id:n perusteella
const removeUser = (req, res) => {
  const id = Number(req.params.id);
  console.log('id: ', id);

  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property'});
  }

  // etsitään pyyntöä vastaavan id:n taulukko-indeksi
  const userIndex = users.findIndex((user) => user.id === id);

  // tarkastetaan, löytyikö id:tä (findIndex palauttaa -1, jos ehto ei täyty)
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    res.status(200);
    return res.json({message: `User ${id} deleted`});
  } else {
    // Jos id:tä ei löydy, palautetaan virheilmoitus
    res.status(404);
    return res.json({message: 'No such id'});
  }
};

// Exportoi moduulit
export {login, getUsers, getUserById, addUser, removeUser, updateUser};
