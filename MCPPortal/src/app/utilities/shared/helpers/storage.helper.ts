export class AyncLocalStorageHelper {
  constructor() {
  }

  static setItem<T>(key, value: T) {
    return Promise.resolve().then(function() {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  static getStringItem(key) {
    return Promise.resolve().then(function() {
      return localStorage.getItem(key);
    });
  }

  static getItem<T>(key) {
    return Promise.resolve().then(function() {
      return JSON.parse(localStorage.getItem(key)) as T;
    });
  }
}
