function User() {
    this.users = [];
}

User.prototype.setUsers = function (data) {
    this.users = data;
};

User.prototype.getUsers = function () {
    return this.users;
};

User.prototype.findRecent = function (callback) {
    var context = this;
    API.fetch('activeUsers', function (data) {
        context.setUsers(data, callback(data));
    });
};

User.prototype.findAll = function (callback) {
    var context = this;
    API.fetch('users', function (data) {
        context.setUsers(data, callback(data));
    });
};