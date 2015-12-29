//A separate file to define constants for use throughout the app

var BASE_URI = 'http://localhost:3000';
//Basic call to api to send XML requests to server for CRUD values
var API = {
    fetch: function (path, callback) {
        var uri = BASE_URI + '/' + path;
        var request = new XMLHttpRequest();

        request.open('GET', uri, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                callback(JSON.parse(request.response));
            }
        };

        request.onerror = function () {
            reject(new Error('Something Went wrong on the API'));
        };

        request.send();
    }
};
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
var ui = {
    renderPosts: function (posts) {
        //Set up array for templated posts
        var elements = [];

        //Loop through posts, getting desired values from each posts
        for (var i in posts) {
            var title = posts[i].title;
            var content = posts[i].content;
            var lastReply = posts[i].lastReply;

            //Send values to template to create HTML, and add to the elements array
            elements.push(articleTemplate(title, content, lastReply));
        }

        //Find the desired location on screen and fill it with the markdown
        var target = document.querySelector(".container");
        target.innerHTML = elements.join("");
    },
    renderUsers: function (users) {
        var elements = [];
        for (var i in users) {
            var name = users[i].name;
            var avatar = users[i].avatar;
            elements.push(userTemplate(name, avatar));
        }

        var target = document.querySelector(".sidebar-content");
        target.innerHTML = elements.join("");
    }
};

function articleTemplate(title, lastReply) {
    var template = "<article class ='post'>";
    template += "<h2 class='post-title'>" + title + "</h2>";
    template += "<p class='post-meta'>";
    template += "last reply on " + lastReply + "</p>";
    template += "</article>";

    return template;
}

function userTemplate(name, avatar) {
    var template = "<div class ='active-avatar'>";
    template += "<img width='54' src='http://hugify.me/52Folders/commonAssets/images/" + avatar + "' />";
    template += "<h5 class='post-author'>" + name;
    template += "</h5>";
    template += "</div>";

    return template;
}