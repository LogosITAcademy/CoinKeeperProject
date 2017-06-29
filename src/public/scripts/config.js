 angular.module('CoinKeeperApp').config(function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    $urlRouterProvider.otherwise("/")
    $stateProvider

        .state('reglogpage', {
        url: "/reglogpages",
        templateUrl: "views/reglog.html",
        controller: "reglogCtrl as reglog"
    })

    .state('mainpage', {
        url: "/mainpage",
        templateUrl: "views/main.html"
    })

    .state('history', {
            url: "/history",

        })
        .state('statistic', {
            url: "/statistic",

        })

    $locationProvider.html5Mode(true);
    $qProvider.errorOnUnhandledRejections(false);

})

