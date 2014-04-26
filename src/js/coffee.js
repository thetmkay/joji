(function() {
  var app, controllers, directives, services;

  if (!services) {
    services = angular.module('joji.services', []);
  }

  services.service('getPostService', [
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
          console.log('retrieved');
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

  if (!services) {
    services = angular.module('joji.services', []);
  }

  services.service('getPostsService', [
    '$http', '$q', function($http, $q) {
      var _deferred, _posts,
        _this = this;
      _posts = [];
      _deferred = void 0;
      this.getPosts = function() {
        _deferred = $q.defer();
        $http.get('/api/getposts/').success(function(data, status) {
          console.log('posts');
          console.log(data);
          _posts = data;
          return _deferred.resolve(_posts);
        });
        return _deferred.promise;
      };
      return this;
    }
  ]);

  if (!services) {
    services = angular.module('joji.services', []);
  }

  services.service('linkPostService', [
    function() {
      this.setSloppyNotesLinkFn = function(linkFn) {
        this.linkSloppyNotes = linkFn;
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

  directives.directive('blogList', [
    'getPostsService', function(getPostsService) {
      return {
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: 'blog/list',
        link: function(scope, elem, attrs) {
          var _this = this;
          scope.posts = [];
          getPostsService.getPosts().then(function(posts) {
            console.log('deferred');
            scope.posts = posts;
          });
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('joji.directives', []);
  }

  directives.directive('blogNav', [
    'getPostService', '$stateParams', function(postalService, $stateParams) {
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
    'getPostService', '$stateParams', function(postalService, $stateParams) {
      return {
        restrict: 'E',
        scope: true,
        replace: false,
        templateUrl: 'blog/post',
        link: function(scope, element, attrs) {
          var $elem, $parent, note_selector, _linkSloppyNotes,
            _this = this;
          note_selector = '.sloppy-note';
          $parent = angular.element(element.context.parentNode);
          $elem = angular.element(element);
          _linkSloppyNotes = function() {
            var $content, $index, $notes, $target;
            $target = $parent.find('sloppy-note');
            $content = $target.find('#target-sloppy-note-content');
            $index = $target.find('#target-sloppy-note-index');
            $notes = element.find(note_selector);
            console.log($notes);
            angular.forEach($notes, function(note, index) {
              var $note;
              $note = angular.element(note);
              $note.data('index', index);
              $note.on('click', function() {
                $content.html($note.data('content'));
                $index.html(index);
                return $target.show();
              });
            });
          };
          postalService.getPost($stateParams.posturl).then(function(post) {
            var postContent;
            postContent = '<a class="sloppy-note" data-content="hihihih">yoyoyo</div>';
            element.find("#postContent").html(postContent);
            element.find("#postTitle").html(post.title);
            _linkSloppyNotes();
          });
        }
      };
    }
  ]);

  if (!directives) {
    directives = angular.module('directives', []);
  }

  directives.directive('sloppyNote', [
    function() {
      return {
        replace: false,
        restrict: 'E',
        templateUrl: 'blog/sloppynote',
        link: function(scope, elem, attrs) {
          var $content, $index, $notes, $target, note_selector;
          note_selector = '.sloppy-note';
          $target = angular.element(elem);
          $content = $target.find('#target-sloppy-note-content');
          $index = $target.find('#target-sloppy-note-index');
          $notes = $target.parent().children(note_selector);
          angular.forEach($notes, function($note, index) {
            $note.data('index').data(index);
            return $note.on('click', function() {
              $content.html($note.data('content'));
              $index.html(index);
              return $target.show();
            });
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
            $scope.$apply();
          };
          this.getIndex = function() {
            return $scope.slide_index;
          };
        },
        link: function(scope, element, attrs) {
          var $this, changeIndex, changePage, clear, last_page, roundedScrolling, scrollStop, scroll_pos, stayOnPage;
          $this = angular.element(element);
          console.log(element);
          scope.setWindowSize = function() {
            scope.height = $window.innerHeight;
            scope.width = $window.innerWidth;
            $this.height(scope.height);
            $this.width(scope.width);
            stayOnPage();
          };
          last_page = 3;
          scroll_pos = 0;
          $this.data('scrolling', 0);
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
              scope.$apply();
            } else {
              changePage();
            }
          };
          changePage = function() {
            var current, target, time;
            current = $this.scrollTop();
            target = scope.slide_index * scope.height;
            time = 250 * Math.ceil(Math.abs((current - target) / scope.height));
            $this.animate({
              'scrollTop': '' + target + 'px'
            }, time, clear);
          };
          stayOnPage = function() {
            var target;
            target = scope.slide_index * scope.height;
            $this.scrollTop(target);
          };
          roundedScrolling = function(start, end, height) {
            if (end - start > height) {
              return Math.round((end - start) / height);
            } else if (end - start > 100) {
              return 1;
            }
            if (end - start < -height) {
              return Math.round((end - start) / height);
            } else if (end - start < -100) {
              return -1;
            }
            return 0;
          };
          scrollStop = function() {
            var amount_of_pages, end, start;
            start = $this.data('scrollStart');
            end = $this.scrollTop();
            amount_of_pages = roundedScrolling(start, end, scope.height);
            changeIndex(amount_of_pages);
          };
          $this.scroll(function() {
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            } else {
              $this.data('scrollStart', $this.scrollTop());
            }
            return $this.data('scrollTimeout', setTimeout(scrollStop, 100, element));
          });
          angular.element($window).bind('resize', function() {
            scope.setWindowSize();
            scope.$apply();
          });
          angular.element($window).bind('keydown', function(event) {
            event.stopPropagation();
            if (event.which === 40 || event.which === 34) {
              changeIndex(1);
            }
            if (event.which === 38 || event.which === 33) {
              return changeIndex(-1);
            }
          });
          scope.$watch('slide_index', function() {
            return changePage();
          });
          scope.setWindowSize();
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
      $urlRouterProvider.otherwise('/blog');
      $stateProvider.state('blog', {
        url: '/blog',
        abstract: true,
        template: "<ui-view/>"
      }).state('blog.list', {
        url: '',
        parent: 'blog',
        templateUrl: 'blog/home'
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
