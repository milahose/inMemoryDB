class Database {
  constructor() {
    this.state = {};
    this.map = {};
  }

  set(key, value) {
    if (this.state.hasOwnProperty(key)) {
      let oldValue = this.state[key];
      this.map[oldValue]--;
    }

    this.state[key] = value;
    
    if (this.map[value]) {
      this.map[value]++;
    } else {
      this.map[value] = 1;
    }

    return;
  }

  get(key) {
    return this.state[key] || null;
  }

  unset(key) {
    let value = this.state[key];
    this.state[key] = null;

    if (this.map[value]) {
      this.map[value]--;
    }
  }

  numequalto(value) {
    return this.map[value] || 0;
  }
}

module.exports = Database;
