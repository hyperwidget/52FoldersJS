//The Post object class

function Post() {
    this.posts = [];
}

Post.prototype.setPosts = function (data) {
    this.posts = data;
};

Post.prototype.getPosts = function () {
    return this.posts;
};

Post.prototype.findAll = function (callback) {
    var context = this;
    API.fetch('posts', function (data) {
        context.setPosts(data, callback(data));
    });
};