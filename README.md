# Dashboard


## Getting Started


1. `npm i`
1. [Generate firebase-admin Service credentials](https://console.firebase.google.com/u/0/project/pour-over-guides/settings/serviceaccounts/adminsdk)
1. Move and rename service key file to root as `firebase-admin-service-key.json`
1. `export GOOGLE_APPLICATION_CREDENTIALS=firebase-admin-service-key.json`
1. `npm run dev`

### Resources

See `npm run` for more options.

See [Instructions for firebase-admin setup](https://firebase.google.com/docs/admin/setup).


#### Warning `GOOGLE_APPLICATION_CREDENTIALS`

The error below:
 ```
 [2020-07-12T17:26:07.462Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo ENOTFOUND metadata.google.internal metadata.google.internal:80. Error code: ENOTFOUND\"."}
 ```
―is related to not having a firebase-admin service credential and it being set via the `GOOGLE_APPLICATION_CREDENTIALS`.

 ### CICD

 Pushes trigger cloud deployments.

 See [Google Cloud Console triggers](https://console.cloud.google.com/cloud-build/triggers).