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

// Päivitä itemin tiedot id:n perusteella
const updateItem = (req, res) => {
  console.log('updateItem request body: ', req.params.id, req.body);

  // muunnetaan id-parametri numero-tyyppiseksi
  const id = Number(req.params.id);
  const name = req.body.name;

  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  // typeof Number == number
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  } else if (!name) {
    //  Jos name-parametria ei löydy bodyn mukana tai se on tyhjä, palautetaan virheilmoitus
    return res
      .status(400)
      .json({message: 'Property to be updated is not found in the request.'});
  }

  // etsitään id:tä vastaava item. Jos ei löydy, niin item on undefined
  const item = items.find((item) => item.id === id);

  // Jos item löytyi id:n perusteella, päivitetään kyseisen id:n tietue uusilla bodyn tiedoilla
  if (item) {
    item.name = req.body.name;

    res.status(200);
    return res.json({
      message: `Record of id ${id} was updated.`,
      updatedItem: item,
    });
  } else {
    // Jos id:tä vastaavaa itemiä ei löydy, palautetaan virheilmoitus
    res.status(400);
    return res.json({message: 'No such item.'});
  }
};

// Poista item id:n perusteella
const removeItem = (req, res) => {
  console.log('removeItem request param: ', req.params.id);

  const id = Number(req.params.id);

  // Jos pyynnön parametri sisältää id:n ja se löytyy datasta, poistetaan kyseisen id:n tietue
  if (!isNaN(id)) {
    // etsitään pyyntöä vastaavan id:n taulukko-indeksi
    const itemIndex = items.findIndex((item) => item.id === id);

    // tarkastetaan, löytyikö id:tä (findIndex palauttaa -1, jos ehto ei täyty)
    if (itemIndex >= 0) {
      const removedItem = items.splice(itemIndex, 1);
      console.log('removedItem: ', removedItem);
      console.log('items after remove: ', items);

      res.status(204);
      return res.json({message: `Removed item ${id} succesfully.`});
    } else {
      // Jos id:tä ei löydy, palautetaan virheilmoitus
      res.status(404);
      return res.json({message: 'No such id'});
    }
  }

  // Jos parametrinä annettu id ei ole numero, palautetaan virheilmoitus
  res.status(404);
  return res.json({message: 'Request is missing id property.'});
};

// TODO: lisää users.js (ks.materiaali 04, 5.)
// TODO: EXTRA lähetä käyttäjänimi ja salasana palvelimelle ja vertaa (esim. find()), löytyykö

export {getItems, getItemById, addItem, updateItem, removeItem};

// default, vain yksi objekti (voisi käyttää, jos oliolla useita funktioita)
// export default getItems;
