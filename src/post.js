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
  API.fetch("posts", function (data) {
    context.setPosts(data, callback(data));
  });
};

Post.prototype.findArchived = function (callback) {
  var context = this;
  API.fetch("posts?archived=true", function (data) {
    context.setPosts(data, callback(data));
  });
};

Post.prototype.findOne = function (id, callback) {
  var context = this;
  API.fetch(`posts/${id}`, function (data) {
    context.setPosts(data, callback(data));
  });
};

Post.prototype.create = (data, callback) => {
  API.post(`posts`, data, () => {
    if (callback) {
      callback();
    }
  });
};

Post.prototype.archive = (id, callback) => {
  API.post(`posts/${id}/archive`, null, () => {
    if (callback) {
      callback();
    }
  });
};

Post.prototype.unarchive = (id, callback) => {
  API.post(`posts/${id}/unarchive`, null, () => {
    if (callback) {
      callback();
    }
  });
};
