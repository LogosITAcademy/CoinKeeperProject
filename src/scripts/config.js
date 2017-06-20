 angular.module('CoinKeeperApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
     $urlRouterProvider.otherwise("/")
     $stateProvider.state('/', {
         url: "/"
         , templateUrl: "/main.html"
     }).state('history', {
         url: "/history"
         , templateUrl: "/history.html"
     }).state('statistic', {
         url: "/statistic"
         , templateUrl: "/statistic.html"
     })
     .state('settings', {
         url: "/settings"
         , templateUrl: "/settings.html"
     })
     $locationProvider.html5Mode(true);
     $qProvider.errorOnUnhandledRejections(false);
 })