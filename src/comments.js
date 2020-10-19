//The Comment object class

function Comment() {
  this.comments = [];
}

Comment.prototype.setComments = function (data) {
  this.comments = data;
};

Comment.prototype.getComments = function () {
  return this.comments;
};

Comment.prototype.findAll = function (callback) {
  var context = this;
  API.fetch("comments", function (data) {
    context.setComments(data, callback(data));
  });
};

Comment.prototype.findByPostId = function (postId, callback) {
  var context = this;
  API.fetch(`posts/${postId}/comments`, function (data) {
    context.setComments(data, callback(data));
  });
};

Comment.prototype.findOne = function (id, callback) {
  var context = this;
  API.fetch(`comments/${id}`, function (data) {
    context.setComments(data, callback(data));
  });
};

Comment.prototype.create = (data, callback) => {
  API.post(`comments`, data, () => {
    if (callback) {
      callback();
    }
  });
};
