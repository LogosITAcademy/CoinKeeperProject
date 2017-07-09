angular.module('CoinKeeperApp').factory('PrivateApi',function($http){

	return {
		getSavings: function(){
			return $http.post('/getsavings').then(function(response){
				var result = response.data;	
					return result;			
			})
		},
		getSpends: function(){
			return	$http.post('/getspends').then(function(response){
				var result = response.data;
					return result;
			})
		},
		getIncome: function(){
			return $http.post('/getincome').then(function(response){
				var result = response.data;
				 	return result;	
			})
		},
		getBalance: function(){
			return $http.post('/getbalance').then(function(response){
				var result = response.data;
					return result;	
			})
		},
		addSavings: function(newSavings){
				return $http.post('/addsavings', newSavings).then(function (response) {
                	var result = response.data;
                    	return result;
				})
		},
		addSpends: function(newSpends){
			return $http.post('/addspends', newSpends).then(function (response) {
				var result = response.data;
					return result;
			})
		},
		setSpends: function(spends){
			return  $http.post('/setspends', spends).then(function (response) {
				var result = response.data;
					return result;
			})
		},
		setSavings:function(savings){
			return  $http.post('/setsavings', savings).then(function (response) {
				var result = response.data;
					return result;
			})
		}
	};
});