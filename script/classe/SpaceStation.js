const SpaceHouse = require('./SpaceHouse');

class SpaceStation extends SpaceHouse {
  constructor(id, titre, description, prix, adresse, nombreModules) {
    super(id, titre, description, prix, adresse);
    this.nombreModules = nombreModules;
  }

  afficherDetails() {
    super.afficherDetails();
    console.log(`Nombre de modules: ${this.nombreModules}`);
  }
}

module.exports = SpaceStation;
