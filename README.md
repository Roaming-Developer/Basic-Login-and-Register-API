# Login and Register API
A REST API build for registering and login a user. It uses the Express for the routing, MongoDB as the database for storing the fields of an user along with fetching the user infor for authentication purpose, for the Authentication purpose we're using JWT(JSON Web Token).

### Fields for Registering User
```
{
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  }
```
View complete schema [here](./model/user.js)

### Login Flow
![login-flow](https://i.imgur.com/PsSSg8Z.png)

### Live API for Login and Registering
Free public API link is provided below where demonstration of this project can be seen
```
https://demo-api-ex.herokuapp.com/api/v1/register
https://demo-api-ex.herokuapp.com/api/v1/login
```

#### Registering using Postman

![json-data-postman-register](https://i.imgur.com/v4PNUAE.png)

#### Login using Postman

![json-data-postman-register](https://i.imgur.com/oQFNR2e.png)

***Note - All data created and saved through this API in the database will be temporary. Please do not rely on this.***
