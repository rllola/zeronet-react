# ZeroNet/React starter kit

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

## Router

Because in the url we have the adress of website we need to change the url base so it doesnt interfer with react-router.

Change the address in `app/router.js` for the one of your website.

## browserHistory

```
Warning: [history] Unable to save state; sessionStorage is not available due to security settings
```
No idea how to fix this.
