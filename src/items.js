// mock data (tilapäistä testidataa)
const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
  {id: 3, name: 'Item3'},
  {id: 4, name: 'Item4'},
];

// Hae kaikki itemit
const getItems = (req, res) => {
  res.json(items);
};

// Hae item id:n perusteella
const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);

  // Alla sama asia lyhempänä versiona
  // const item2 = items.find((item2) => item2.id == req.params.id);
  const item = items.find((item) => {
    return item.id == req.params.id;
  });

  console.log('item found:', item);

  // jos item löytyi eli arvo ei ole undefined
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'Item not found.'});
  }
};

// Lisää uusi item
const addItem = (req, res) => {
  console.log('addItem request body:', req.body);

  // Jos pyynnössä sisältää name-ominaisuuden(property), lisätään uusi asia items-taulukkoon
  if (req.body.name) {
    // generoidaan id-numero uudelle asialle (yhtä suurempi kuin viimeisimmän asian ID)
    const latestId = items[items.length - 1].id;

    // Luodaan uusi asia-olio ja lisätään se items-taulukkoon
    const newItem = {id: latestId + 1, name: req.body.name};
    console.log(newItem);

    items.push(newItem);
    console.log(items);

    res.status(201);
    return res.json({message: 'Item added.'});
  }

  res.status(400);
  // return ei pakko, koska funktion suoritus loppuisi kuitenkin.
  return res.json({message: 'Request is missing name property'});
};

// TODO: add put, delete
// TODO: lisää users.js (ks.materiaali 04, 5.)
// TODO: EXTRA lähetä käyttäjänimi ja salasana palvelimelle ja vertaa (esim. find()), löytyykö

export {getItems, getItemById, addItem};

// default, vain yksi objekti (voisi käyttää, jos oliolla useita funktioita)
// export default getItems;
