"use strict";
describe('pomoDoro.config', function() {
  var $rootScope, $state, $injector, $templateCache, myServiceMock;

  beforeEach(function() {
    angular.mock.module('pomoDoro');

    inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
      $rootScope = _$rootScope_;
      $state = _$state_;
      $injector = _$injector_;

      // We need add the template entry into the templateCache if we ever
      // specify a templateUrl
      $templateCache.put('template.html', '');
    })
  });
  describe('home state', function() {
    it('should have a home state', function() {
      expect($state.get('home')).toBeDefined();
    });
    it('should have #/home url', function() {
      expect($state.href('home')).toEqual('#/home');
    });
    it('should use the _home template', function() {
      expect($state.get('home').templateUrl).toEqual('home/_home.html')
    });
    it('should use the sessionController', function() {
      expect($state.get('home').controller).toEqual('mainController')
    });
  });
  describe('signin state', function() {
    it('should have a signin state', function() {
      expect($state.get('signin')).toBeDefined();
    });
    it('should have a #/signin url', function() {
      expect($state.href('signin')).toEqual('#/signin');
    });
    it('should use the _signin template', function() {
      expect($state.get('signin').templateUrl).toEqual('session/_signIn.html')
    });
    it('should use the sessionController', function() {
      expect($state.get('signin').controller).toEqual('sessionController')
    });
  });
  describe('signup state', function() {
    it('should have a signup state', function() {
      expect($state.get('signup')).toBeDefined();
    });
    it('should have a #/signup url', function() {
      expect($state.href('signup')).toEqual('#/signup');
    });
    it('should use the _signup template', function() {
      expect($state.get('signup').templateUrl).toEqual('session/_signUp.html')
    });
    it('should use the sessionController', function() {
      expect($state.get('signup').controller).toEqual('sessionController')
    });
  });
  describe('user state', function() {
    it('should have a user state', function() {
      expect($state.get('user')).toBeDefined();
    });
    it('should have a #/users/{id} url', function() {
      expect($state.href('user', {id: 1})).toEqual('#/users/1');
    });
    it('should use the _user template', function() {
      expect($state.get('user').templateUrl).toEqual('user/_user.html')
    });
    it('should use the userController', function() {
      expect($state.get('user').controller).toEqual('userController')
    });
  });
  describe('todo state', function() {
    it('should have a todo state', function() {
      expect($state.get('todo')).toBeDefined();
    });
    it('should have a #/users/{id}/todo/{todoID} state', function() {
      expect($state.href('todo', {id: 1, todoID: 2})).toEqual('#/users/1/todos/2');
    });
    it('should use the _todo template', function() {
      expect($state.get('todo').templateUrl).toEqual('todo/_todo.html')
    });
    it('should use the todoController', function() {
      expect($state.get('todo').controller).toEqual('todoController')
    });
  });
  describe('new-todo state', function() {
    it('should have a new-todo state', function() {
      expect($state.get('new-todo')).toBeDefined();
    });
    it('should have a #/users/{id}/todo/{todoID} state', function() {
      expect($state.href('new-todo', {id: 1})).toEqual('#/users/1/create_todo');
    });
    it('should use the _todo template', function() {
      expect($state.get('new-todo').templateUrl).toEqual('todo/new/_new.html')
    });
    it('should use the mainController', function() {
      expect($state.get('new-todo').controller).toEqual('mainController')
    });
  });
  describe('edit-todo state', function() {
    it('should have a edit-todo state', function() {
      expect($state.get('edit-todo')).toBeDefined();
    });
    it('should have a #/users/{id}/todo/{todoID} state', function() {
      expect($state.href('edit-todo', {id: 1, todoID: 2})).toEqual('#/users/1/todos/2/edit');
    });
    it('should use the _todo template', function() {
      expect($state.get('edit-todo').templateUrl).toEqual('todo/edit/_edit.html')
    });
    it('should use the todoController', function() {
      expect($state.get('edit-todo').controller).toEqual('todoController')
    });
  });
})
