

class Production {
    readonly SITENAME = 'Authdemo';
    SITEURL = 'https://xxx.com';
    DEBUG = false;

    readonly paths = new RoutePath();
    readonly keys = new MapKeys();
}

class Development extends Production {
    readonly DEBUG = true;
    SITEURL = 'http://localhost:3500';
}


class Staging extends Production {
    readonly DEBUG = true;
}


class RoutePath {
    readonly register = '/auth/register';
    readonly lostpass = '/auth/lostpass';
    readonly signin = '/auth/signin';
    readonly signout = '/auth/signout';
}


class MapKeys {
    readonly token = 'authtoken';
}


const env = process.env.REACT_APP_ENV;
let Settings: Production = new Production();
if(env === 'development') {
    Settings = new Development();
}
else if(env === 'staging') {
    Settings = new Staging();
}

export default Settings;