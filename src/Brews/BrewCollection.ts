import Brew from "./Brew";

class BrewCollection extends Array {

  constructor(brews: [Brew]) {
    super();
    this.push(...brews);
  }

}

export default BrewCollection;
