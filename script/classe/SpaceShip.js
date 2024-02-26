class SpaceShip extends SpaceProperty {
  constructor(id, title, description, price, address, compartiment, ascenseur) {
      super(id, title, description, price, address);
      this.compartiment = compartiment;
      this.ascenseur = ascenseur;
  }

  afficherDetails() {
      super.afficherDetails();
      console.log(`Compartiment: ${this.compartiment}`);
      console.log(`Ascenseur: ${this.ascenseur}`);
  }
}
