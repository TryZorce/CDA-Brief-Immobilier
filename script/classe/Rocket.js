const SpaceHouse = require('./SpaceHouse');

class Rocket extends SpaceHouse {
  constructor(id, titre, description, prix, adresse, reacteur, compartimentIndep) {
    super(id, titre, description, prix, adresse);
    this.reacteur = reacteur;
    this.compartimentIndep = compartimentIndep;
  }

  afficherDetails() {
    super.afficherDetails();
    console.log(`Réacteur: ${this.reacteur}`);
    console.log(`Compartiment Indépendant: ${this.compartimentIndep}`);
  }
}

module.exports = Rocket;
