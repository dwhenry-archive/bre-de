# User API

## GET '/login'

Logs the user into the game

### Arguments:

* **email**: The user email
* **password**: The user password

### Return data format:

JSON array of games items each with the following data:

* **name**: The user name
* **email**: The user email
* **auth_token**: The user token =>
  this is used (with the email/name) for all further communication with the server to authenticate the user

## GET '/logout'

Logs the user out of the system

## POST '/signup'

Creates a new user in the system

### Arguments:

* **name**: The user name
* **email**: The user email
* **password**: The user password
* **password_confirmation**: Copy of the user password for authenticaition varification

### Return data format:

JSON array of games items each with the following data:

* **name**: The user name
* **email**: The user email
* **auth_token**: The user token =>
  this is used (with the email/name) for all further communication with the server to authenticate the user

