var BASE_URI = 'http://localhost:3000';
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
var Post = {
    findAll: function (callback) {
        API.fetch('posts', function (data) {
            callback(data);
        });
    }
};
var User = {
    findRecent: function (callback) {
        API.fetch('activeUsers', function (data) {
            callback(data);
        });
    }
};
window.onload = function () {
    Post.findAll(function (data) {
        ui.renderPosts(data);
    });

    User.findRecent(function (data) {
        ui.renderUsers(data);
    });
};
//class FlashMessage{
//    constructor(message){
//        this.message = message;
//    }
//    display(){
//        alert(this.message);
//    }
//}
var ui = {
    renderPosts: function (posts) {
        var elements = [];
        for (var i in posts) {
            var title = posts[i].title;
            var lastReply = posts[i].lastReply;
            elements.push(articleTemplate(title, lastReply));
        }

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