angular.module('starter.controllers', [])

.controller('SearchCtrl', function ($scope, $http, $state) {

    $scope.search = function (bnetId) {

        $http.get('https://eu.api.battle.net/d3/profile/' + bnetId + '/?locale=en_GB&apikey=u5trkg9h53u2vv9rk6fwgxecwrkvgs8s')
           .success(function (data) {
               $state.go('tab.dash', { profile: data });
           })
           .error(function (err) {
               return err;
           });
    };
})

.controller('DashCtrl', function ($scope, $stateParams) {
    //profile.success(function (data) {
    //    $scope.profile = data;

    //    // This is needed to circumvent the issue of a JSON property containing a hyphen
    //    $scope.orderBy = function (property) {
    //        return function (item) {
    //            return item[property];
    //        };
    //    };
    //});

    $scope.profile = $stateParams.profile;

    $scope.orderBy = function (property) {
        return function (item) {
            return item[property];
        };
    };
})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
