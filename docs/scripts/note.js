export class Note {
  constructor (title, description, importance, duedate) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.duedate = duedate;
    this.finished = false;
  }  
}
