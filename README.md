# Firelighter

### Using: 
- node
- typescript
- ts-node
- http4js (http framework)
- mocha, chai (testing frameworks)
- circle (ci)

### Instructions: 
- Clone project to new repo
- ./run version_check. Update to latest version on node if necessary (`nvm install 13.5.0` and `nvm use 13.5.0`). 
- ./run test to install dependencies and run sample test. Should pass.
- ./run start should start the server (via index.ts).

- [add CircleCI project](https://circleci.com/add-projects/gh/isabelcooper)
- Select Linux, Node, Start Building. Build should succeed.
- push to Git: should trigger new build (and pass)
