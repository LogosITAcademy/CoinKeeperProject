angular.module('popUps', [])
    .controller('popupsController', function ($scope, $http) {
    $scope.USDtoUAH;
    $http.get("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").then(function (response) {
        $scope.USDtoUAH = response.data[0].buy;
        $scope.EURtoUAH = response.data[1].buy;
        return ($scope.EURtoUAH);
        
    });
    $scope.circles = [
        {
            savingsName: 'bla'
            , savingsAmmount: 555
            , currency: "UAH"
            , img: "../../img/popup-img/bar.png"
      }
    ];
    $scope.balance = 0;
    $scope.circlesSpend = [
        {
            spendName: 'girl'
            , img: "../../img/popup-img/bar.png"
      }


    ];
    $scope.addSpendCircle = function () {
        $('#myModal3').modal('hide');
        $scope.circlesSpend.push({
            spendName: $scope.spendName
            , img: $scope.img_icon
        });
        $scope.spendName = '';
        $scope.img = "img/bar.png";
    };
    $scope.addCircle = function () {
        $('#myModal').modal('hide');
        console.log($scope.EURtoUAH);
        if ($scope.savingsAmmount == undefined) {
            $scope.savingsAmmount = 0;
        }
        if ($scope.checked) {
            console.log($scope.data.selectedOption.name);
            if ($scope.data.selectedOption.name == 'USD') {
                $scope.balance += $scope.savingsAmmount * $scope.USDtoUAH;
            }
            else if ($scope.data.selectedOption.name == 'UAH') {
                $scope.balance += $scope.savingsAmmount;
            }
            else {
                $scope.balance += $scope.savingsAmmount * $scope.EURtoUAH;
            }
        }
        $scope.circles.push({
            savingsName: $scope.savingsName
            , savingsAmmount: $scope.savingsAmmount
            , currency: $scope.data.selectedOption.name
            , img: $scope.img_icon
        });
        $scope.savingsName = '';
        $scope.savingsAmmount = 0;
        $scope.currency = "UAH";
        $scope.submitted = false;
    };
    $scope.data = {
        availableOptions: [
            {
                id: '1',
                name: 'USD'
            }
            , {
                id: '2'
                , name: 'EUR'
            }
            , {
                id: '3'
                , name: 'UAH'
            }
    ]
        , selectedOption: {
            id: '3'
            , name: 'UAH'
        } //This sets the default value of the select in the ui
    };
    $scope.resetDropDown = function () {
        $scope.data = {
            availableOptions: [
                {
                    id: '1'
                    , name: 'USD'
                }
                , {
                    id: '2'
                    , name: 'EUR'
                }
                , {
                    id: '3'
                    , name: 'UAH'
                }
        ]
            , selectedOption: {
                id: '3'
                , name: 'UAH'
            } //This sets the default value of the select in the ui
        };
        $scope.img_icon = "../../img/popup-img/bar.png";
        $scope.submitted = false;
        $scope.checked = false;
    }
    $scope.setImg = function () {
        $scope.img_icon = "../../img/popup-img/bar.png";
        $scope.submitted = false;
    }
});