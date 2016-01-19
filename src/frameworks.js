function Framework() {
    this.frameworks = [];
}

Framework.prototype.setFrameworks = function (data) {
    this.frameworks = data;
};

Framework.prototype.getFrameworks = function () {
    return this.frameworks;
};

Framework.prototype.findRecent = function (callback) {
    var context = this;
    API.fetch('recentFrameworks', function (data) {
        context.setFrameworks(data, callback(data));
    });
};

Framework.prototype.findAll = function (callback) {
    var context = this;
    API.fetch('frameworks', function (data) {
        context.setFrameworks(data, callback(data));
    });
};