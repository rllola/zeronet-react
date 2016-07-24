import ZeroFrame from './zeroframe';

// unfinished.. can't get around the security error for accessing sessionStorage in a sandbox

var LocalStorage = (function() {
  this.storage = {};

  window.sessionStorage.removeItem = function(key) {
    this.storage[key] = undefined;
    this.saveSession();
  };
  window.sessionStorage.setItem = function(key, value) {
    this.storage[key]= value;
    this.saveSession();
  };

  this.saveSession = function() {
    ZeroFrame.cmd("wrapperSetstorage", this.storage);
  };
});

module.exports = new LocalStorage;
