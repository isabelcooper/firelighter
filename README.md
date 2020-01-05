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
GCLOUD_SERVICE_KEY(whole file, base64 encoded), GOOGLE_PROJECT_ID, GOOGLE_COMPUTE_ZONE, PROJECT_NAME
- add google vars locally via command line: 
    ```
    gcloud config set project firelighter
    GOOGLE_PROJECT_ID=SOMENUMBER
    GOOGLE_COMPUTE_ZONE=SOMECODE
    ```
    (NB can check env vars are set properly with `echo $GOOGLE_PROJECT_ID`)
Google sdk auth help here](https://circleci.com/docs/2.0/google-auth/)
- [Add permissions for service account](https://console.cloud.google.com/iam-admin/iam?authuser=1&project=firelighter)
```
App Engine Deployer
App Engine Service Admin
Cloud Build Editor
Editor
Storage Object Admin
```
- enable app engine admin api https://console.developers.google.com/apis/library/appengine.googleapis.com?project=firelighter&authuser=1

- push to Git: should now pass build
- app health should return 200 on https://firelighter.appspot.com/health


### Database
- [create DB using CloudSql > PostgresQL](https://console.cloud.google.com/sql/choose-instance-engine?authuser=1&project=firelighter)
- add correct config to prod.ts 
- add POSTGRES_PASSWORD to .env and circleCi, app.yaml, app.yaml.template
