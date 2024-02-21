const SpaceHouse = require('./SpaceHouse');

class SpaceShip extends SpaceHouse {
  constructor(id, titre, description, prix, adresse, compartiment, ascenseur) {
    super(id, titre, description, prix, adresse);
    this.compartiment = compartiment;
    this.ascenseur = ascenseur;
  }

  afficherDetails() {
    super.afficherDetails();
    console.log(`Compartiment: ${this.compartiment}`);
    console.log(`Ascenseur: ${this.ascenseur}`);
  }
}

module.exports = SpaceShip;
