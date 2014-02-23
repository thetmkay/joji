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
            element.find("#postContent").html(post.content);
            element.find("#postTitle").html(post.title);
          });
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('homeSlideShowNav', [
    function() {
      return {
        templateUrl: 'home/slidenav',
        replace: true,
        restrict: 'E',
        require: ['^homeSlide', '^homeSlideShow'],
        scope: true,
        link: function(scope, element, attributes, parentCtrls) {
          var $elem;
          $elem = angular.element(element);
          $elem.children().each(function(index, navLink) {
            var $navLink;
            $navLink = angular.element(navLink);
            if (index === parentCtrls[0].slideIndex) {
              $navLink.addClass('full-opacity');
            }
            $navLink.on('click', function() {
              console.log('click');
              parentCtrls[1].changeIndex(index);
            });
          });
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('homeSlide', [
    function() {
      return {
        templateUrl: function(element, attributes) {
          return 'home/slides/' + attributes.templatename;
        },
        replace: true,
        restrict: 'E',
        scope: true,
        controller: function($scope, $attrs) {
          this.slideIndex = parseInt($attrs.index);
        },
        link: function(scope, element, attributes) {
          return scope.$watch('height', function() {
            element.css({
              'height': scope.height + 'px'
            });
          });
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('homeSlideShow', [
    '$document', '$window', function($document, $window) {
      return {
        templateUrl: 'home/slideshow',
        replace: true,
        scope: true,
        restrict: 'E',
        controller: function($scope) {
          $scope.slide_index = 0;
          this.changeIndex = function(index) {
            $scope.slide_index = index;
            $scope.changePage();
          };
          this.getIndex = function() {
            return $scope.slide_index;
          };
        },
        link: function(scope, element, attrs) {
          var $elem, $scrollElem, $scrollWindow, $this, changeIndex, changePage, clear, last_page, scrollStop;
          scope.setWindowSize = function() {
            scope.height = $window.innerHeight;
            scope.width = $window.innerWidth;
          };
          scope.setWindowSize();
          last_page = 3;
          $elem = angular.element($elem);
          $scrollWindow = angular.element($window);
          console.log($);
          $scrollElem = $("html,body");
          $this = angular.element(element);
          clear = function() {
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            return $this.data('scrollTimeout', null);
          };
          changeIndex = function(amount) {
            var target_index;
            if (amount) {
              target_index = scope.slide_index + amount;
              target_index = Math.min(target_index, last_page);
              target_index = Math.max(target_index, 0);
              scope.slide_index = target_index;
            }
          };
          changePage = function() {
            var current, target, time;
            current = $scrollWindow.scrollTop();
            target = scope.slide_index * scope.height;
            time = 250 * Math.ceil(Math.abs((current - target) / scope.height));
            $scrollElem.animate({
              'scrollTop': '' + target + 'px'
            }, time, clear);
          };
          scrollStop = function() {
            var amount_of_pages, end, start;
            start = $this.data('scrollStart');
            end = $scrollWindow.scrollTop();
            if (end - start > scope.height) {
              amount_of_pages = Math.round((end - start) / scope.height);
            } else if (end - start > 100) {
              amount_of_pages = 1;
            }
            if (end - start < -scope.height) {
              amount_of_pages = Math.round((end - start) / scope.height);
            } else if (end - start < -100) {
              amount_of_pages = -1;
            }
            changeIndex(amount_of_pages);
            changePage();
          };
          $scrollWindow.scroll(function() {
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            } else {
              $this.data('scrollStart', $scrollWindow.scrollTop());
            }
            return $this.data('scrollTimeout', setTimeout(scrollStop, 100, element));
          });
          angular.element($window).bind('resize', function() {
            scope.setWindowSize();
            scope.$apply();
          });
          scope.changePage = changePage;
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('scrollStop', [
    function() {
      return {
        restrict: 'A',
        compile: function(element, attrs) {
          var $this;
          console.log('hello');
          $this = angular.element(element);
          $.fn.scrollStopped = function(callback) {
            var self;
            self = this;
            $this = $(self);
            return element.scroll(function() {
              if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
              }
              return $this.data('scrollTimeout', setTimeout(callback, 250, element));
            });
          };
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
            return postalService.retrievePostData($stateParams.posturl);
          }
        ]
      });
      return $locationProvider.html5Mode(true);
    }
  ]);

}).call(this);
