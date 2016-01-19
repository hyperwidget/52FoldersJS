var post = new Post();
var user = new User();
var framework = new Framework();
var recentFrameworks = new Framework();

//Wait for page to load and then get all posts and recent users
window.onload = function () {
    post.findAll(function (data) {
        ui.renderPosts(data);
    });

    framework.findAll(function(data){
       ui.renderFrameworks(data);
    });

    framework.findRecent(function(data){
        ui.renderRecentFrameworks(data);
    });

    //user.findAll(function (data) {
    //    ui.renderUsers(data);
    //});
};