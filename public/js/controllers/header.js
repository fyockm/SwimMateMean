angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Admin",
        "link": "",
        "dropdown": true,
        "sub": [{
            "title": "Teams",
            "link": "admin/teams"
        }, {
            "title": "Events",
            "link": "admin/events"
        }, {
            "title": "",
            "link": "divider"
        }, {
            "title": "Meets",
            "link": "admin/meets"
        }, {
            "title": "Roster",
            "link": "admin/roster"
        }, {
            "title": "",
            "link": "divider"
        }, {
            "title": "Import",
            "link": "admin/import"
        }, {
            "title": "Export",
            "link": "admin/export"
        }]
    }, {
        "title": "Assignments",
        "link": "assignments",
        "dropdown": false
    }, {
        "title": "Times",
        "link": "times",
        "dropdown": false
    }, {
        "title": "Reports",
        "link": "",
        "dropdown": true,
        "sub": [{
            "title": "Cards",
            "link": "reports/cards"
        }, {
            "title": "Roster",
            "link": "reports/roster"
        }, {
            "title": "Score Sheets",
            "link": "reports/scoreSheets"
        }, {
            "title": "Most Improved",
            "link": "reports/mostImproved"
        }]
    }];

    $scope.init = function() {

    };

    $scope.itemClass = function(item) {
        if (item.dropdown) {
            return "dropdown";
        }
        if (item.link == "divider") {
            return "divider";
        }
        if ($location.path() == "/"+item.link) {
            return "active";
        }
        else return "";
    };
}]);
