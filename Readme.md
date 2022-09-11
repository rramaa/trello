# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
1. Node: `v14.17.0`
2. Yarn: `v1.22.10`
3. Best viewed in Chromium based browsers

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Flow
### File Structure
```
src/
    components/
        /* All components used in the development */
    constants/
        All constants
    data-models/
        All Data models
    helpers/
        Helper Functions
    hooks/
        Hooks definition
```
### Data Models
The data models are used for managing the state and provide some structure to the data types. Directly hooking up the base data to the components' state and updating the complete data would trigger multiple rerenders of the components even when nothing has changed. By ensuring only one place from where to update the data, keeping the storage and state in sync will be easy and bug free. Ideally, there would be an api call to sync data with the BE.

The data model is stored in a normalised fashion. Only the ids are referenced in different entities. It helps in moving the entity references from one entity to another, and also keeps updating the entities simple 

### Drag and Drop
1. When the drag starts, some data is inserted into the event
2. When the drag over event starts, the position of the card is calculated and the eventual position is shown visually to the user
3. When the drag event leaves, everything is restored to original
4. When the drop event occurs, data has already been calculated. That data is now synced to the Drag context.
5. After data has been pushed to the Drag context, the columns are notified that a drag/drop event has occurred, and they are expected to update their respective states.

### App Instantiation
When the app is opened for the first time, it is checked whether correct data is present or not. If it's not present, then app is instantiated and some default data is populated

### Title Edit
There is common component called `EditableTitle`. This component manages the title, and allows edit. The enter key and escape are supported. After changing the title, press `Enter` to save the new title or press `Escape` to reset.

## Enhancements Planned
If given ample time, here are some of the enhancements that could be done.
1. Design can definitely be improved. Ideally a design system can be used. That will ensure good browser compatibility and a modern look to the UI as well.
2. A way to add new boards and also to select a different board. Due to the normalised data structure used, a card can be moved from 1 board to another without much hassle
3. Support for labels, due date, and description can be added.. Need to hook up the data models and need to add support of design to add description and update labels/due date.
4. Test cases would be ideal for maintenance of the project 
