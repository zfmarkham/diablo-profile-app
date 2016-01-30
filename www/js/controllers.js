angular.module('starter.controllers', [])

.controller('SearchCtrl', function ($scope, $http, $state) {

    $scope.search = function (bnetId) {

        $http.get('https://eu.api.battle.net/d3/profile/' + bnetId + '/?locale=en_GB&apikey=u5trkg9h53u2vv9rk6fwgxecwrkvgs8s')
           .success(function (data) {
               $state.go('tab.dash', { profile: data, bnetId: bnetId });
           })
           .error(function (err) {
               return err;
           });
    };
})

.controller('DashCtrl', function ($scope, $state, $stateParams, $http) {
    $scope.profile = $stateParams.profile;

    $scope.selectHero = function (heroId) {
        $http.get('https://eu.api.battle.net/d3/profile/' + $stateParams.bnetId + '/hero/' + heroId + '?locale=en_GB&apikey=u5trkg9h53u2vv9rk6fwgxecwrkvgs8s')
            .success(function (data) {
                $state.go('tab.hero', { heroData: data });
            })
            .error(function (err) {
                return err;
            });
    };

    $scope.orderBy = function (property) {
        return function (item) {
            return item[property];
        };
    };
})

.controller('HeroCtrl', function ($scope, $stateParams) {
    $scope.heroData = $stateParams.heroData;
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
