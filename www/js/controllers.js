angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {

    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(114, 23), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    function successCallback(data) {
      if(data.latitude && data.longitude)
      {
        var point = new BMap.Point(data.longitude,data.latitude);
        var mk = new BMap.Marker(point);
        map.addOverlay(mk);
        map.panTo(point);
      }
      console.log(data);
    }

    function failedCallback(data) {

      console.log(data);
    }

    $scope.onBtnClick = function (index) {
      switch (index) {
        case 0:
          baidu_location.getCurrentPosition(successCallback, failedCallback);
          break;
        case 1:
          baidu_location.watchPosition(successCallback, failedCallback, 5);
          break;
        case 2:
          baidu_location.clearWatch(successCallback, failedCallback);
          break;
      }
    }

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
