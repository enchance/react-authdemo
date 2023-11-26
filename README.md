AuthDemo
=============================

React front end for testing backend authentication services.

Authentication happens in the frontend using the Firebase package. Authorization is expected to happen in the 
backend. This is done by sending the `idtoken` on every request.

Usage
--------------------

It's wihthout saying that you need a [Firebase project][Firebase] to use this package as it uses Firebase 
Authentication to sign in users.

[firebase]: https://firebase.google.com/

### Settings

Update the settings file at **/src/app/settings.tsx** with your own values.

### Create .env File

This repo uses Firebase Authentication.

```env
REACT_APP_ENV=development

# Firebase config
REACT_APP_APIKEY=
REACT_APP_AUTHDOMAIN=
REACT_APP_PROJECTID=
REACT_APP_STORAGEBUCKET=
REACT_APP_MESSAGINGSENDERID=
REACT_APP_APPID=
```

Todo
------
[x] Google signin
[] Facebook signin
[] Email signin
[] Email registration
[] Change email password
[] Private page uses the `Authorization` header to access