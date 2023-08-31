

class Production {
    readonly SITENAME = 'Awesome Site';
    SITEURL = 'https://aaa.com';
    DEBUG = false;

    readonly path = new RoutePath();
}

class Development extends Production {
    readonly DEBUG = true;
}


class Staging extends Production {
    readonly DEBUG = true;
}


class RoutePath {
    readonly register = '/auth/register';
    readonly signin = '/auth/signin';
    readonly lostpass = '/auth/lostpass';
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