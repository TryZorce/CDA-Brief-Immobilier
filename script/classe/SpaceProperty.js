class SpaceProperty {
  constructor(id, title, description, price, address) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.address = address;
  }

  afficherDetails() {
      console.log(`ID: ${this.id}`);
      console.log(`Titre: ${this.title}`);
      console.log(`Description: ${this.description}`);
      console.log(`Prix: ${this.price}`);
      console.log(`Adresse: ${this.address}`);
  }
}