beforeEach(module('todoApp'));

describe('AppCtrl', function() {
  var scope;

  beforeEach(module('mocks.Item'));

  beforeEach(inject(function($controller, $rootScope) {
    // store reference to scope, so that we can access it from the specs
    scope = $rootScope.$new();

    // instantiate the controller
    $controller('AppCtrl', {$scope: scope, items: []});
  }));


  describe('add', function() {
    it('should add new task', function() {
      expect(scope.items.length).toBe(0);

      scope.add({text: 'FAKE TASK'});

      expect(scope.items.length).toBe(1);
      expect(scope.items[0].text).toBe('FAKE TASK');
    });


    it('should reset newText', function() {
      expect(scope.newItem).not.toBeDefined();

      scope.newItem = {text: 'remove me'};
      scope.add(scope.newItem);

      expect(scope.newItem.text).toBe('');
    });
  });


  describe('remaining', function() {

    it('should return number of tasks that are not done', function() {

      ['item1', 'item2', 'item3', 'item4'].forEach(function(itemText) {
        scope.add({text: itemText});
      });

      expect(scope.remaining()).toBe(4);

      scope.items[0].done = true;
      expect(scope.remaining()).toBe(3);
    });
  });


  describe('archive', function() {

    it('should remove tasks that are done', function() {
      ['item1', 'item2', 'item3', 'item4'].forEach(function(itemText) {
        scope.add({text: itemText});
      });
      scope.items[1].done = true;
      scope.items[3].done = true;
      expect(scope.items.length).toBe(4);

      scope.archive();
      expect(scope.items.length).toBe(2);
    });
  });
});
