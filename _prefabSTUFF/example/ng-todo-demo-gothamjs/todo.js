var todoApp = angular.module('todoApp', ['ngResource']);

todoApp.config(function($routeProvider) {
  $routeProvider.
      when('/', {
        controller: 'AppCtrl',
        templateUrl: 'todo.html',
        resolve: {
          items: function($q, Item) {
            var deferred = $q.defer();
            Item.query(function(items) {
              deferred.resolve(items);
            });
            return deferred.promise;
          }
        }
      }).
      when('/hello', {templateUrl: 'hello.html'}).
      otherwise({redirectTo: '/'});
});


todoApp.controller('AppCtrl', function AppCtrl($scope, items, Item) {

  $scope.userName = 'Igor';

  // publish model
  $scope.items = items;

  // computed property
  $scope.remaining = function() {
    return items.reduce(function(count, item) {
      return item.done ? count : count + 1;
    }, 0);
  };


  // event handler
  $scope.add = function(newItem) {
    var item = new Item({text: newItem.text});
    items.push(item);
    newItem.text = '';

    // save to mongolab
    item.$save();
  };


  // event handler
  $scope.archive = function() {
    items = $scope.items = items.filter(function(item) {
      if (item.done) {
        item.$remove();
        return false;
      }
      return true;
    });
  };
});


todoApp.constant('apiKey', '4fc27c99e4b0401bdbfd1741');


todoApp.factory('Item', function($resource, apiKey) {
  var Item = $resource('http://offline.api.mongolab.com/api/1/databases/ng-todo/collections/items/:id', {
    apiKey: apiKey
  }, {
    update: {method: 'PUT'}
  });

  Item.prototype.$remove = function() {
    Item.remove({id: this._id.$oid});
  };

  Item.prototype.$update = function() {
    return Item.update({id: this._id.$oid}, angular.extend({}, this, {_id: undefined}));
  };

  Item.prototype.done = false;

  return Item;
});


/*

todoApp.controller('AppCtrl', function($scope, Item) {

  // fetch model
  var items = $scope.items = Item.query();

  // computed property
  $scope.remaining = function() {
    return items.reduce(function(count, item) {
      return item.done ? count : count + 1;
    }, 0);
  };


  // event handler
  $scope.add = function(newItem) {
    var item = new Item({text: newItem.text});
    items.push(item);
    newItem.text = '';

    // save to mongolab
    item.$save();
  };


  // event handler
  $scope.archive = function() {
    items = $scope.items = items.filter(function(item) {
      if (item.done) {
        item.$remove();
        return false;
      }
      return true;
    });
  };
});


todoApp.constant('apiKey', '4fc27c99e4b0401bdbfd1741');


todoApp.factory('Item', function($resource, apiKey) {
  var Item = $resource('http://offline.api.mongolab.com/api/1/databases/ng-todo/collections/items/:id', {
    apiKey: apiKey
  }, {
    update: {method: 'PUT'}
  });

  Item.prototype.$remove = function() {
    Item.remove({id: this._id.$oid});
  };

  Item.prototype.$update = function() {
    return Item.update({id: this._id.$oid}, angular.extend({}, this, {_id: undefined}));
  };

  Item.prototype.done = false;

  return Item;
});

*/

/*

 todoApp.config(function($routeProvider) {
  $routeProvider.
      when('/', {controller: 'AppCtrl', template: 'todo.html'}).
      when('/hello', {template: 'hello.html'}).
      otherwise({redirectTo: '/'});
});



 <nav>
 [<a href="#/">Todo</a>] [<a href="#/hello">hello</a>]
 </nav>

 <ng-view></ng-view>

*/