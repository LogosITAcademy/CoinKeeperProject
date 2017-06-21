angular.module('RegLog', [])
.controller("reglogCtrl", function(CoinKeeperAPI) {
    var self = this;
    this.registration_aler_box = true;
    this.danger_registration_aler_box = true;
    this.CoinKeeperAPI = CoinKeeperAPI;
    this.SignUp = function() {
        this.signUpData = {
            signupName: this.signupName,
            signupsurname: this.signupsurname,
            signupEmail: this.signupEmail,
            signupPassword: this.signupPassword,
            signupbalance: this.signupbalance,
            signupCurrency: this.signupCurrency
        }
        this.CoinKeeperAPI.registrationUser(this.signUpData).then(function(result) {
            if (result == "OK") {
                console.log(result);
                self.registration_aler_box = false;
            } else {
                self.danger_registration_aler_box = false
            };
        })
    }

    this.signIn = function() {

        this.signInData = {
            signinEmail: this.signinEmail,
            signinPassword: this.signinPassword
        }
        
        this.CoinKeeperAPI.autorizationUser(this.signInData);
    };
})
