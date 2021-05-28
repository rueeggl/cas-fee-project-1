export class Note {
  constructor (id, title, description, importance, duedate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.duedate = duedate;
    this.finished = false;
  }  
}
