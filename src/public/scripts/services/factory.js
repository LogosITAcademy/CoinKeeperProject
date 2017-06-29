angular.module('CoinKeeperApp').factory("CoinKeeperAPI", function ($http) {
    return {
        registrationUser: function (signUpData) {
           return $http.post('/registration', signUpData).then(function (response) {
                    var result = response.data;
                    return result;
            })
        },
         autorizationUser: function (signInData) {
            $http.post('/autorization', signInData).then(function (response) {
                if (response.data == "done") {
                    console.log(response.data);
                    window.location.replace("/");
                }
            })
        },
        getUserData: function () {
           return $http.post('/userdata').then(function(response){
            var result = response.data;
            return result;
            })
        }
    }
});