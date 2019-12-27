# Firelighter

### Using: 
- node
- typescript
- ts-node
- http4js (http framework)
- mocha, chai (testing frameworks)
- circle (ci) & google sdk auth
- GCP AppEngine

### Instructions: 
#### Basic
- Clone project to new repo
- change project name in package.json
- ./run version_check. Update to latest version on node if necessary (`nvm install 13.5.0` and `nvm use 13.5.0`). 
- ./run test to install dependencies and run sample test. Should pass.
- ./run start should start the server (via index.ts).

#### CI
- [add CircleCI project](https://circleci.com/add-projects/gh/isabelcooper)
- Select Linux, Node, Start Building. Should trigger a build (will fail until GCP is also set up)
- push a change to Git: should trigger new build.

#### GCP
- create a project 
- add PROJECT_NAME to deploy script 
- add AppEngine app - this creates a service account automatically
- on cmd line: `gcloud config set project firelighter` then `gcloud app deploy`

- [generate GCLOUD_SERVICE_KEY](https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=1&project=firelighter) 
- download service key and swap in file name in deploy script
- Add Env vars to circleCi for: 
GCLOUD_SERVICE_KEY, GOOGLE_PROJECT_ID, GOOGLE_COMPUTE_ZONE, PROJECT_NAME
- add google vars locally via command line: 
    ```
    gcloud config set project firelighter
    GOOGLE_PROJECT_ID=SOMENUMBER
    GOOGLE_COMPUTE_ZONE=SOMECODE
    ```
    (NB can check env vars are set properly with `echo $GOOGLE_PROJECT_ID`)
Google sdk auth help here](https://circleci.com/docs/2.0/google-auth/)
- push to Git: should now pass build
