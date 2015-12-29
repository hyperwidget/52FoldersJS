var User = {
    findRecent: function (callback) {
        API.fetch('activeUsers', function (data) {
            callback(data);
        });
    }
};