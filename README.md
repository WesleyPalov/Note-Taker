Note-Taker

## Done

Starter code has been modifed to create an application called Note Taker that can be used to write and save notes. This application is using an Express.js back end and saves and retrieves note data from a JSON file.

The application’s front end has already been created. Back end has been build and connected to the front then deploy the entire application to Heroku.

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Getting Started

On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

The following HTML routes are created:

- `GET /notes` should return the `notes.html` file.

- `GET *` should return the `index.html` file.

The following API routes are created:

- `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

- `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

## Bonus has been done

- `DELETE /api/notes/:id` receives a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

## Screenshots
![Capturenote](https://user-images.githubusercontent.com/122843028/224572856-2c492fd7-99f4-4d19-8168-56b673883791.PNG)
![Capturenote2](https://user-images.githubusercontent.com/122843028/224572882-a12c12ed-5ac1-4465-baa2-68ba7ffe263b.PNG)
![Capturenote3](https://user-images.githubusercontent.com/122843028/224572908-6712b801-aa1a-4542-a731-10694c0c2658.PNG)



