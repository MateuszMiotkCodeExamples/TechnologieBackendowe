// views/view.js
const movies = require('../data/movies');

function render() {
    return `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <title>Lista Filmów</title>
      <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
      <h1>Lista Filmów</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tytuł</th>
            <th>Rok</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${movies
        .map(
            (movie) => `
                <tr>
                  <td>${movie.id}</td>
                  <td>${movie.title}</td>
                  <td>${movie.year}</td>
                  <td><a href="/api/movies/delete/${movie.id}">Usuń</a></td>
                  <td><a href="/movie/form?id=${movie.id}">Edytuj</a></td>
                </tr>`,
        )
        .join('')}
        </tbody>
      </table>
      <a href="/movie/form">Dodaj nowy</a>
    </body>
    </html>
  `;
}

module.exports = { render };