# reactcoregk

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

React core gk libary is a set of generic functions designed to work with redux and sagas. You can manage all your async actions and your state with a few lines of code.

## Installation

Use npm to install.

```bash
npm install reactcoregk
```

## Project setup
To create async requests **reactcoregk** requires some kind of mapping of your controllers and their endpoints. So in order to make it work property you have to create two objects first before creating any controller: 
- **EntityType**
- **ApiEndpoint**

You can name these objects as you want, but it is recommended to use these ones for consistency.

## EntityType
Entity type is an object that describes the controllers of your app.
```js
export const EntityType = {
   Entity: "Entity"
}
```
## ApiEndpoint
Api endpoint is the mapping of your controllers and their endpoints. So for all CRUD operations of each controller we define what is the endpoint.
```js
export const EntityType = {
   [EntityType.Entity]: API_URL + "/api/entities",
}
```
## Controllers
A controller consists of four parts:  
  - **sagas**, the actions of the controller
  - **action** creators, the actions that will trigger sagas
  - **reducer**, the state of the controller
  - **module**, the definition and rules of the controller

## Action creators
Action creators are functions and according to given params they return an object that will trigger sagas to create your async requests. There are kind of action methods.
 - **createGetAllMethod**, returns an array of entities
 - **createGetAllPageableMethod**, returns an paginated object with entities
 - **createGetMethod**, returns an entity for the given id
 - **createPostMethod**, creates an entity
 - **createPutMethod**, updates an entity
 - **createDeleteMethod**, deletes an entity

Each of the above actions have on success action and one failure action. You don't have to write these by yourself, they are triggered automatically for you.

## The module
In the module section you define the operations that you to accomplish. You can user the **Operation** object to get define your operations. 
```js
export const Operation = {
    get: "get",
    getAll: "getAll",
    update: "update",
    create: "create",
    delete: "delete",
    custom: "custom",
    getAllPageable: "getAllPageable"
}

```
These are all the operations can managed by action creators and sagas.

## Reducers
The structure of the  basic reducer is described bellow:
```js
{
   getAll: {
     result: {},
     error: "",
     isLoading: false,
     all: [], // not used
   },
   getAllPageable: {
     result: {},
     error: "",
     isLoading: false,
     all: [] // this will handle all 
             // the results of all the pages you search 
             // and will remove duplicates.
   },
   get: {
     result: {},
     error: "",
     isLoading: false,
     all: [] // not used
   },
   update: {
     result: {},
     error: "",
     isLoading: false,
     all: [] // not used
   },
   create: {
     result: {},
     error: "",
     isLoading: false,
     all: [] // not used
   },
   delete: {
     result: {},
     error: "",
     isLoading: false,
     all: [] // not used
   },
}

```
So you know for each action, the error, the result and if it is loading. Notice that the property names match the action names.

## Sagas
You don't have to write anything in sagas unless you want to add you own custom sagas. You can combine both core sagas and you own sagas.

**Dont forget to delcare you operations inside module otherwise sagas will not work**

## Usage
Lets create an example of a controller from scratch. Suppose we have a **USERS API** and we want to create actions for creating, updating, deleting and retrieving users.

First things first, we are going to define our EntityTpe object as well as ApiEnpoint.

```js
import API_URL from "config"

export const EntityType = {
   User: "User"
}

export const EntityType = {
   [EntityType.User]: API_URL + "/api/users",
}
```
Then create a folder with the name user. This file will be the controller folder of user. Then create 4 files inside user folder:
  - actions.js
  - module.js
  - reducer.js
  - saga.js

On the main module we want to define the entity and the operations.

```js
// module.js

import {EntityType} from "../core/entityType";
import {Operation} from "reactcoregk";

// define the entity.
export const entityType = EntityType.User;

// define the operations.
export const entityOperations = [
  Operation.getAll,
  Operation.create,
  Operation.delete,
  Operation.update,
];

```


```js
// reducer.js

import {entityType} from "./module";
import {getCommonState, handleCommonState} from "reactcoregk/store/reducer";

// On the reducer file you need to define your initial state
const initialState = getCommonState();

const User = (state = initialState, action) => {

  // Action types are generated by action creators according to the entity type and the action method (GET, POST, etc). 
  // They are strings seperated with dots. 
  // If you want to read the values you need to do the following.
  const actionEntity = action.type.split(".")[0]

  if (actionEntity !== entityType) return state
  const actionType = action.type.split(".")[1]

  // Finally you need to declare the **identifier property** of this entity. 
  // This is very importand for actions and reducers to work properly because under the hood they use this identifier for the crud operations and the state management.
  return  handleCommonState(state, actionType, action, entityType, "id");
};

export default User;

```

```js
// saga.js

import {all} from "redux-saga/effects";
import {entityOperations, entityType} from "./module";
import getCoreSagas from "reactcoregk/store/saga";
import {ApiEndpoint} from "../core/endpoint";

// You can use core sagas as they are or combine them with your own.
const coreSagas = getCoreSagas(entityType, ApiEndpoint, entityOperations)

function* sagas() {
    yield all(coreSagas);
}

export default sagas;

```
```js
// actions.js

import {entityType} from "./module";
import {createDeleteMethod, createGetAllMethod, createPostMethod, createPutMethod} from "reactcoregk/store/actions";

// This handler will manage the path of update and the state once the action was succesfull
const apiHandler = new ApiHandler(
                                    appendId: true, // if true then the path would be users/{id} else the path would be /users
                                    refreshId: false, // if true then after saving or updating the user the GET /users/{id} will be called and pass the new user to sate otherwise will pass the response to the state
                                    headers: {}, // custom headers
                                    method: "default" // is used for updates only with POST request method. If you want to update your entity use everytime createPutMethod()
                                                      // if you want to update with POST method then pass the apiHandler.method = "POST"
                                )
// method is used for updates only with POST request method. If you want to update your entity use everytime createPutMethod()
// if you want to update with POST method then pass the apiHandler.method = "POST"

export const getAllUsers = (params) => createGetAllMethod(entityType, params)
export const deleteUser = (payload) => createDeleteMethod(entityType, payload)
export const createUser = (payload) => createPostMethod(entityType, payload, apiHandler)
export const updateUser = (payload) => createPutMethod(entityType, payload, apiHandler) 



```

Finaly on you App.js
```js
function App(props) {

  const {context, getAllUsers} = props
  const users = context.User.getAll.result
  const isLoading = context.User.getAll.isLoading

  if (isLoading) {
    return <div>Loading..</>
  }

  React.useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
   <div>
     {
       users.map(user => <div key={user.id}>{user.name}</div>)
     }
   </div>
  )

}

const mapStateToProps = (state) => {
  return {
    context: state,
  };
};

export default connect(mapStateToProps, {
  getAllUsers
})(App);

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
