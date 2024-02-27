class SpaceStation extends SpaceProperty {
  constructor(id, title, description, price, address, nombreModules) {
      super(id, title, description, price, address);
      this.nombreModules = nombreModules;
  }

  afficherDetails() {
      super.afficherDetails();
      console.log(`Nombre de modules: ${this.nombreModules}`);
  }

  saveSpecificValues() {
    this.specificValues = {
      nombreModules: this.nombreModules,
    };
}}
