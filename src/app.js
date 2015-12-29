window.onload = function () {
    Post.findAll(function (data) {
        ui.renderPosts(data);
    });

    User.findRecent(function (data) {
        ui.renderUsers(data);
    });
};