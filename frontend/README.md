# fullstack-event-app frontend

> An app that shows events on a React leaflet map and tells the event details.

This project is developed as part of TAMK backend coursework. The aim is to make a functioning fullstack app that shows information about different kinds of events on a map. The app has a functioning API that can be used to get information about the events stored inside database.

## Current status

Currently the development has finished. I might return later to update this app with new features and improve the API.

## Documentation

Documentation can be found here:

- [Backend](https://petriirri.github.io/fullstack-event-app/)
- [Frontend](https://petriirri.github.io/fullstack-event-app/frontend/index.html)

## Tech

- Frontend with React
  - React Leaflet map
- Backend with Node.js
- Bootstrap 5

## Features

The app has the following features currently:

- Leaflet map with markers for events in finland.
  - Markers are clustered with [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster).
  - Marker popups have short description of the event in question.
- Marker popups have links to the event details page.
  - Shows all the information of the event.
  - Has link to event organizers page or another relevant page.
- Functioning API that has basic CRUD functionality.

## Planned features

These are all planned features that might be implemented or might not be implemented.

- Add possibility to get all tags from API.
- Add possibility to sort events based on end and start date. Also sort with tags.
- Add event calendar to the app.
- Authentication and autorization to the API.
- Pagination to the API
- Improve usability of the API and app.

## Credits

This app is made by Petri Irri: petri.irri@gmail.com.
