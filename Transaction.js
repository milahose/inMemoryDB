const Database = require('./Database');

class Transaction extends Database {
  constructor() {
    super();
    this.stack = [];
    this.database = null;
  }

  noTransaction() {
    return 'NO TRANSACTION';
  }

  begin() {
    this.stack.push({
      state: this.state,
      map: this.map
    });

    this.state = {};
    this.map = {};
  }

  get(key) {
    if (!this.state[key]) {
      return this.stack[this.stack.length - 1].state[key];
    }

    return this.state[key] || null;
  }

  unset(key) {
    if (!this.state.hasOwnProperty(key)) {
      this.state[key] = null;
      return;
    }
    
    let value = this.state[key];
    this.state[key] = null;

    if (this.map[value]) {
      this.map[value]--;
    }
  }

  rollback() {
    if (this.stack.length) {
      this.state = this.stack[this.stack.length - 1].state;
      this.map = this.stack[this.stack.length - 1].map;
      this.stack.pop();
    } else if (this.stack.length && Object.values(this.state).length) {
      this.state = {};
      this.map = {};
    } else {
      return this.noTransaction();
    }
  }

  commit() {
    if (!this.stack.length) {
      return this.noTransaction();
    }

    this.stack = [];
  }
}

module.exports = Transaction;
