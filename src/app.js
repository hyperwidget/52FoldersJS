var post = new Post();
var user = new User();

//Wait for page to load and then get all posts and recent users
window.onload = function () {
    post.findAll(function (data) {
        ui.renderPosts(data);
    });

    user.findRecent(function (data) {
        ui.renderUsers(data);
    });
};