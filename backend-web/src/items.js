const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
  {id: 3, name: 'Item3'},
  {id: 4, name: 'Item4'},
];

const getItems = (req, res) => {
  res.json(items);
};

// TODO: add getByID, post, put, delete

export {getItems};

// default, vain yksi objekti (voisi käyttää, jos oliolla useita funktioita)
// export default getItems;
