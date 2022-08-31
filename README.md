# React App for open coding of qualitative Data

This app is a prototype that was part of my bachelor thesis 2021. The goal was to create an interactive app to analyze qualitative data with open coding. \
The app features: 
- flexable import of csv data
- displaying data on notes, witch can be manipulated via drag and drop 
- tagging data 
- creat, edit and delete nodes and tags 
- order tags in a hierarchy
- highlight nodes marked with specified tag(s)
- save and load the state of the app


## Running the App
The app was written with NodeJS version 5.14.0, but it may also work with newer version.

In the project directory, run `npm install`, to install all the needed packages. Afterwards you can run the app with `npm start` in development mode. You can access it in the browser on [http://localhost:3000](http://localhost:3000).

To create an optimized build run `npm run build`. The app will be build to the `build` folder. 

## Used Packages
- react-draggable
- redux
- redux-persist
- react-papaparse
- nanoid
- react-hammerjs
- materialize-css
- @material-ui/icons
- @fontsource/roboto



