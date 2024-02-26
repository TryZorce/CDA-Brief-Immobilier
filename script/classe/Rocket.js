class Rocket extends SpaceProperty {
  constructor(id, title, description, price, address, reacteur, compartimentIndep) {
      super(id, title, description, price, address);
      this.reacteur = reacteur;
      this.compartimentIndep = compartimentIndep;
  }

  afficherDetails() {
      super.afficherDetails();
      console.log(`Réacteur: ${this.reacteur}`);
      console.log(`Compartiment Indépendant: ${this.compartimentIndep}`);
  }
}
