(function() {
  var app, controllers, directives, services;

  if (!services) {
    services = angular.module('joji.services', []);
  }

  services.service('postalService', [
    '$http', '$q', function($http, $q) {
      var _deferred, _post,
        _this = this;
      _post = {};
      _deferred = void 0;
      this.getPost = function(url) {
        if (url !== _post.url) {
          _this.testPageContent(url);
        }
        return _deferred.promise;
      };
      this.retrievePostData = function(url) {
        _deferred = $q.defer();
        _post.url = url;
        $http.get('/api/getpost/' + url).success(function(data, status) {
          _post = {
            url: data.url,
            content: data.content,
            title: data.title,
            prev_url: data.prev_url,
            prev_title: data.prev_title,
            next_url: data.next_url,
            next_title: data.next_title
          };
          return _deferred.resolve(_post);
        });
      };
      return this;
    }
  ]);

  if (!controllers) {
    controllers = angular.module('joji.controllers', []);
  }

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('blogNav', [
    'postalService', '$stateParams', function(postalService, $stateParams) {
      return {
        restrict: 'E',
        scope: true,
        replace: false,
        templateUrl: 'blog/navmenu',
        link: function(scope, element, attrs) {
          var _this = this;
          console.log('bbbbbbb');
          postalService.getPost($stateParams.posturl).then(function(post) {
            console.log(post);
            if (post.prev_url) {
              scope.prev_url = post.prev_url;
              scope.prev_title = post.prev_title;
            }
            if (post.next_url) {
              scope.next_url = post.next_url;
              scope.next_title = post.next_title;
            }
          });
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('blogPost', [
    'postalService', '$stateParams', function(postalService, $stateParams) {
      return {
        restrict: 'E',
        scope: true,
        replace: false,
        templateUrl: 'blog/post',
        link: function(scope, element, attrs) {
          var _this = this;
          console.log('dddddd');
          postalService.getPost($stateParams.posturl).then(function(post) {
            scope.content = post.content;
            scope.title = post.title;
          });
        }
      };
    }
  ]);

  app = angular.module('joji', ['joji.controllers', 'joji.services', 'joji.directives', 'ui.router', 'ngResource']);

  app.config([
    '$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home/main'
      }).state('blog', {
        url: '/blog',
        abstract: true,
        template: "<ui-view/>"
      }).state('blog.list', {
        url: '',
        parent: 'blog',
        templateUrl: 'blog/list'
      }).state('blog.post', {
        url: '/post/:posturl',
        parent: 'blog',
        templateUrl: 'blog/page',
        onEnter: [
          '$stateParams', 'postalService', function($stateParams, postalService) {
            console.log($stateParams.posturl);
            return postalService.retrievePostData($stateParams.posturl);
          }
        ]
      });
      return $locationProvider.html5Mode(true);
    }
  ]);

}).call(this);
