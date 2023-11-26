

class Production {
    readonly SITENAME = 'Authdemo';
    SITEURL = 'https://xxx.com';
    DEBUG = false;

    readonly paths = new RoutePath();
    readonly keys = new MapKeys();
}

class Development extends Production {
    readonly DEBUG = true;
    SITEURL = 'http://localhost:9000';
}


class Staging extends Production {
    readonly DEBUG = true;
}


class RoutePath {
    readonly signin = '/auth/signin';
    readonly signout = '/auth/signout';
    readonly register = '/auth/register';
    readonly lostpass = '/auth/lostpass';
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