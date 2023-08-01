export class EntityBase {
  id?: string;
  name?: string;
  translatedName?: string;
  code?: string;

  constructor({id, name, code}: { id?: string; name?: string; code?: string; } = {}) {
    this.id = id;
    this.name = name;
    this.code = code;
  }
}


