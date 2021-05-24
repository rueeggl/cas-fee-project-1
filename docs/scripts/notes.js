let notes = [
    { id: '01', title: 'CAS FEE Selbststudium / Projekt Aufgabe erledigen', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergpsum dolor sit amet.', importance: 2, created: '2010-03-03', duedate: '1990-05-03', finished: false },
    { id: '02', title: 'Aufgabe 2', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', importance: 3, created: '1990-01-03', duedate: '2000-04-12', finished: false },
    { id: '03', title: 'Aufgabe 3', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', importance: 1, created: '2000-02-03', duedate: '2010-03-22', finished: true },
];

/****************/
/* Render Notes */
/****************/
const notesListElement = document.querySelector(".content-wrapper")
function createNotesHTML(notes) {
    return notes.map(note =>
        `<div class="todo-card">
          <div class="todo-due-date">
            <div class="todo-title">
              <p>Duedate: ${note.duedate}</p>
            </div>
            <div class="todo-title">
              <p>Created: ${note.created}</p>
            </div>
            <div class="checkbox">
              <input type="checkbox" name="checkbox" id="checkbox-${note.id}">
              <label for="checkbox-${note.id}">Finished</label>
            </div>
          </div>
          <div class="todo-content">
            <div class="todo-title">
              <p class="bold">${note.title}</p>
            </div>
            <div class="todo-content-txtarea">
              <textarea class="textarea-readonly" readonly>${note.description}</textarea>
            </div>
          </div>
          <div class="todo-edit-btn">
            <a href="#">
              <i class="fas fa-edit fa-lg"></i>
            </a>
          </div>
        </div>`
    ).join('');
}
function renderNotes() {
    notesListElement.innerHTML = createNotesHTML(notes);
}
//renderNotes()

/******************/
/* Sort Functions */
/******************/
function sortByDueDate() {
    const sortedByDueDate = [...notes].sort((a, b) => {
        let dateA = new Date(a.duedate);
        let dateB = new Date(b.duedate);
        return dateA - dateB;
    })
    notes = sortedByDueDate;
    renderNotes();

};
function sortByCreatedDate() {
    const sortedByCreatedDate = [...notes].sort((a, b) => {
        let dateA = new Date(a.created);
        let dateB = new Date(b.created);
        return dateA - dateB;
    });
    notes = sortedByCreatedDate;
    renderNotes();
};
function sortByImportance() {
    const sortedByImportance = [...notes].sort((a, b) => {
        let importanceA = a.importance
        let importanceB = b.importance
        return importanceA - importanceB
    })
    notes = sortedByImportance;
    renderNotes();
}
