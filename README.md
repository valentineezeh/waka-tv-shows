# TV Show Dashboard

This is a Vue.js application that allows users to browse and search for TV shows based on different genres. The application fetches data from the TVMaze API ( http://www.tvmaze.com/api) and displays TV shows in a user-friendly dashboard.

# Features

- Genre-based TV Show Lists : The application displays horizontal lists of TV shows categorized by genre (e.g., drama, comedy, sports).
- Show Details : When a user selects a particular show from the dashboard, they are redirected to a detailed screen that provides comprehensive information about the show.
- Search Functionality : Users can search for TV shows by name using the search feature.
- Responsive Design : The application is designed to be responsive and mobile-friendly.

# Technologies Used

- Vue.js (Vue3) : The application is built using the Vue.js framework, which provides a reactive and efficient way to build user interfaces.
- Vue Router : Vue Router is used for handling client-side routing and navigation within the application.
- Fetch: The native fetch API is used to make HTTP requests to the TVMaze API and retrieve TV show data.
- Vitest : Vitest is a modern test runner for Vue.js applications, and it is used for writing and running unit tests.
- Node.js (v21.6.1) : The application is built and run using Node.js version 21.6.1.
- npm (v10.2.4) : npm is the package manager used for installing and managing project dependencies.
- Pinia : Pinia is a state management library used for managing the application's state and data flow.

# Architecture Decisions

1. Vue.js (Vue3) : Vue.js was chosen as the primary framework for this project because it is a popular and widely-used framework for building modern web applications. Vue.js provides a reactive and efficient way to build user interfaces, making it a suitable choice for this project.
2. Vue Router : Vue Router was chosen for handling client-side routing and navigation within the application. It provides a seamless way to navigate between different views and components, which is essential for the TV show dashboard.
3. Fetch: The native fetch API was chosen for making HTTP requests to the TVMaze API because it is a modern and widely-supported way of making network requests in JavaScript. It provides a simple and straightforward way to fetch data from the API.
4. Vitest : Vitest was chosen as the test runner for this project because it is a modern and efficient testing solution specifically designed for Vue.js applications. It provides a fast and reliable way to write and run unit tests, ensuring the quality and reliability of the codebase.
5. Pinia : Pinia was chosen as the state management library for this project because it is a modern and lightweight solution for managing the application's state and data flow. It provides a simple and intuitive API for managing state, making it easier to maintain and scale the application as it grows.

# To Install

- Download or clone the repository
- Open terminal and CD into the folder.
- Type `npm install` to install all dependencies
- Type `npm run dev` to run frontend app locally
- Type `npm run test:unit` to run unit test

## AUTHOR

[Valentine Ezeh](https://github.com/valentineezeh/waka-tv-shows)
