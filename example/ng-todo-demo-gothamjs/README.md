# Simple TODO App in [AngularJS](http://angularjs.org)

Using [MongoLab](https://mongolab.com/home) as a storage.

For presentation purposes we reimplemented subset of Mongolabs api as local-server.js,
which we use in case Internet connection is flaky during presentation. To use it start it
as `sudo node local-server.js` and add `127.0.0.1 offline.api.mongolab.com` mapping to
`/etc/hosts`. Otherwise change urls in `todo.js` to point to `https://api.mongolab.com`
(note that it's `https`).


### Unit tests
For running unit test, install [Testacular](http://vojtajina.github.com/testacular):

    sudo npm install -g testacular
