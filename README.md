# fullstack-event-app

> An app that shows events on a React leaflet map and tells the event details.

This project is developed as part of TAMK backend coursework. The aim is to make a functioning fullstack app that shows information about different kinds of events on a map. The app has a functioning API that can be used to get information about the events stored inside database.

The app can be found running in heroku. [https://eventfin.herokuapp.com/](https://eventfin.herokuapp.com/)

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

### Screenshots

![Home screen of the app picture](/pictures/Home-screen.png)
![Marker popup picture](/pictures/Marker-popup.png)
![Event details page picture](/pictures/details.png)

### Youtube video

[![Youtube video](https://img.youtube.com/vi/HrM7JpUrbGU/0.jpg)](https://www.youtube.com/watch?v=HrM7JpUrbGU)

## API

This app has a working API with basic CRUD functionality. The API can be found at: https://eventfin.herokuapp.com/events/.

Currently the API has support for the following:

- **GET** all events from database along with their tags.
- **GET** an event by id from database and its associated tags.
- **POST** a new event to be added to the database.
- **PUT** update an event in the database based on its id.
- **DELETE** Delete and event based on its id.

### How to use

#### Get event data

To get data on all events make a GET request to https://eventfin.herokuapp.com/events/. This returns data of all events in database. On success the response will have status 200 and contain JSON of the events data. On error the database was not found and response will have status 404 and an error message.

To get a single events data append the id of the event to the request url. For example to get data on an event with id 22: https://eventfin.herokuapp.com/events/22. On success the response will have status code of 200 and JSON output of the event requested. If the requested id is not valid, ex. not number and > 0, the request will return with status 400 and error message. When an event with the given id is not found the response will have staus 404 and message telling a record with given id is not found.

Example of JSON output.

```
  {
    "id": 22,
    "event_name": "Trish Morrissey: Autofiktiot",
    "event_organizer": "Serlachius museot",
    "event_url": "https://serlachius.fi/n%C3%A4yttely/trish-morrissey-autofiktiot/",
    "short_description": "Kaksikymment?? vuotta kuvakerrontaa",
    "full_description": "Irlantilaistaiteilija Trish Morisseyn (s. 1967) laaja n??yttely esittelee yli kaksikymmenvuotisen ty??n tuloksia. Teoksissaan taiteilija nostaa esiin naisten kokemuksia ja heid??n huomiotta j????vi?? tarinoitaan. Mukana on my??s Sissi ja Ruth Serlachiuksen el??m??nkohtaloiden inspiroima uusi teoskokonaisuus. Trish Morissey syntyi Dublinissa ja asuu ja ty??skentelee Britanniassa. Performanssia, valokuvaa ja liikkuvaa kuvaa yhdist??v??ss?? tuotannossaan Morissey rakentaa ja esitt???? todellisia ja fiktiivisi?? hahmoja l??ht??kohtanaan arkistotutkimukset ja omael??m??kerrallinen aineisto. Samalla h??n tutkii k??sityksi?? perheest??, naisen rooleista ja naisvartalosta. H??n osallistui Serlachius-museoiden Kaukainen kosketus -n??yttelyyn 2015 toteuttamalla sarjan valokuvia Serlachiuksen taides????ti??n valokuva-arkiston pohjalta. Nyt h??nen ensimm??inen yksityisn??yttelyns?? Suomessa tuo h??net j??lleen M??ntt????n. N??yttelyn on kuratoinut Kate Best.",
    "start_date": "2022-02-04T22:00:00.000Z",
    "end_date": "2023-01-07T22:00:00.000Z",
    "latitude": 62.0278,
    "longitude": 24.6267,
    "address": "Serlachius-museo Gustaf, R. Erik Serlachiuksen katu",
    "city": "M??ntt??",
    "tags": "Museot, Taide, N??yttelyt"
  }
```

#### Post event data

To post a new event to database: make a POST request to https://eventfin.herokuapp.com/events/. The request content-type needs to be application/json and contain json of the event to be added. Example of json body:

```
  {
    "event_name": "Event name here",
    "event_organizer": "events organizer here",
    "event_url": "url to the organizers page.",
    "short_description": "short description of the event",
    "full_description": "full description that can be very long",
    "start_date": "2022-01-19",
    "end_date": "2022-01-19",
    "latitude": 66.4980250416848,
    "longitude": 25.75247616962397,
    "address": "Address of the location where event is held",
    "city": "city where event is held",
    "tags": [13]
  }
```

To learn more about what is valid. Go [here](https://petriirri.github.io/fullstack-event-app/module-routes_events-newEventSchema.html) to see the schema that the json is validated against.
The tag field has specific values that work.

| Tag id | Tag name               |
| ------ | ---------------------- |
| 1      | Testi                  |
| 2      | Musiikki               |
| 3      | Kaupunki & kulttuuri   |
| 4      | Teatteri               |
| 5      | Museot                 |
| 6      | Lapsille               |
| 7      | Viihde                 |
| 8      | Taide                  |
| 9      | N??yttelyt              |
| 10     | Urheilu & liikunta     |
| 11     | Festivaalit            |
| 12     | Messut                 |
| 13     | Kokoukset & kongressit |
| 14     | Luonto                 |
| 15     | Retkeily ja patikointi |
| 16     | Muu                    |

#### Update event data

To update an events details make a PUT request to https://eventfin.herokuapp.com/events/:id with the id of the event to be updated. In the request body it is optional what fields you place. for example:

```
{
    "event_name": "test"
}
```

and

```
{
"event_name": "test",
"event_url": "Url here"
}
```

are both valid.
To read more about the schema used to validate the request go [here](https://petriirri.github.io/fullstack-event-app/module-routes_events-updateEventSchema.html)

#### Delete an event

To delete an event make a DELETE request to https://eventfin.herokuapp.com/events/:id with the id of the event to be deleted. On success the response returns status 204. On fail the response returns status 404.

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
