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

  res.status(400).send();
};

// Haetaan käyttäjä id:n perusteella
const getUserById = (req, res) => {
  console.log(req.body);

  res.status(400).send();
};

// Luodaan uusi käyttäjä
const addUser = (req, res) => {
  console.log(req.body);

  res.status(400).send();
};

// Exportoi moduulit
export {login, getUserById, addUser};
