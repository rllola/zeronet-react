# ZeroNet/React starter kit

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Join the chat at https://gitter.im/rllola/zeronet-react](https://badges.gitter.im/rllola/zeronet-react.svg)](https://gitter.im/rllola/zeronet-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is an attempt to simplify ZeroNet website creation for react developer. So we can do more cool things !

Note: I am not a react developer. I am discovering the library while starting this project. Feel free to improve the react code.

## Start

Create zeronet website and save keys !

Need to add instructions to secure keys.

Start zeronet and access your address (keep it secret it will be your dev environnement).

## Add example project

Clone from github the example project

```
npm install
```

## Start gulp

We need to recreate the bundle.js file when one of our project file is modified.

```
gulp
```

## Setup

ZeroFrame module allow you to send query to the server to get database information.

First you need to create your dbschema.json and data/users/content.json file. See tutorial :
[http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:46:ZeroNet+site+development+tutorial+2](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:46:ZeroNet+site+development+tutorial+2)

You can also check the doc : [https://zeronet.readthedocs.io/en/latest/site_development/dbschema_json/](https://zeronet.readthedocs.io/en/latest/site_development/dbschema_json/)

You will also need to modify your root content.json file.

AND DONT FORGET TO SIGN YOUR data/users/content.json (YES, I HAVE LOST MANY HOURS BECAUSE I FORGOT TO DO IT).

Then you can use ZeroFrame API : [https://zeronet.readthedocs.io/en/latest/site_development/zeroframe_api_reference/](https://zeronet.readthedocs.io/en/latest/site_development/zeroframe_api_reference/)

This API is not only for database queries. See documentation for more information.

# NOTES

## Local Storage

```
Warning: [history] Unable to save state; sessionStorage is not available due to security settings
```

This bug comes from a [react-router](https://github.com/reactjs/react-router) dependency [ReactTraining/history](https://github.com/ReactTraining/history) trying to access the sessionStorage.
The only way I can currently think to fix this is to fork the repository and map it through a different namespace as Chrome currently bans anything to do with sessionStorage; even the attempt to override it.
