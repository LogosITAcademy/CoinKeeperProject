angular.module('UserData', [])
    .controller("userdataCtrl", function(CoinKeeperAPI) {
        var self = this; 
        this.header_data = true;
        this.hamburger_state = true;
        this.CoinKeeperAPI = CoinKeeperAPI;
        this.CoinKeeperAPI.getUserData().then(function(result) {
            self.balance = result.balance;
            self.username = result.name;
            self.usersurname = result.surname;
            self.currency = result.currency;
            
            //hamburger btn
            if (self.username != undefined) {
                self.hamburger_state = false;
                self.header_data = false;
            };
        });
    });
