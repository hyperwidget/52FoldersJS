var Post = {
    findAll: function (callback) {
        API.fetch('posts', function (data) {
            callback(data);
        });
    }
};