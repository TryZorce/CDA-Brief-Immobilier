class SpaceHouse {
    constructor(id, titre, description, prix, adresse) {
      this.id = id;
      this.titre = titre;
      this.description = description;
      this.prix = prix;
      this.adresse = adresse;
    }
  
    afficherDetails() {
      console.log(`ID: ${this.id}`);
      console.log(`Titre: ${this.titre}`);
      console.log(`Description: ${this.description}`);
      console.log(`Prix: ${this.prix}`);
      console.log(`Adresse: ${this.adresse}`);
    }
  }
  
  module.exports = SpaceHouse;
  