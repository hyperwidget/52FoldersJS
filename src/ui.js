var ui = {
    renderPosts: function (posts) {
        //Set up array for templated posts
        var elements = [];

        //Loop through posts, getting desired values from each posts
        for (var i in posts) {
            //Send values to template to create HTML, and add to the elements array
            elements.push(articleTemplate(posts[i], true, i));
        }

        //Find the desired location on screen and fill it with the markdown
        var target = document.querySelector(".posts-container");
        target.innerHTML = elements.join("");
    },
    renderUsers: function (users) {
        var elements = [];
        for (var i in users) {
            elements.push(userTemplate(users[i]));
        }

        var target = document.querySelector(".sidebar-content");
        target.innerHTML = elements.join("");
    },
    renderFrameworks: function (frameworks) {
        var elements = [];
        for (var i in frameworks) {
            elements.push(frameworksTemplate(frameworks[i]));
        }
        //var target = document.querySelector(".sidebar-content");
        //target.innerHTML = elements.join("");
    },
    renderRecentFrameworks: function (frameworks) {
        var elements = [];
        for (var i in frameworks) {
            elements.push(recentFrameworksTemplate(frameworks[i]));
        }

        var target = document.querySelector(".sidebar-content");
        target.innerHTML = elements.join("");
    }
};

function articleTemplate(post, isPreview, index) {
    var postContents, template;
    if (isPreview) {
        postContents = post.content.split('[--split--]')[0] + ' . . .'
    } else {
        postContents = post.content.split('[--split--]').join("")
    }

    template = "<article class ='post" + (index % 2 === 0 ? '' : ' odd') + "'>";
    template += "<h2 class='post-title'><img src='http://hugify.me/52Folders/commonAssets/images/" + post.author.avatar + "'>" + post.title + "</h2>";
    template += "<p class='post-meta'>" + post.postTime + "</p>";
    template += "<p class='post-content'>" + postContents + "</p>";

    if (isPreview) {
        template += "<a href='#'>Read More</a>";
    }

    template += "</article>";

    return template;
}

function userTemplate(name, avatar) {

    var template = "<div class ='active-avatar'>";
    template += "<img width='54' src='http://hugify.me/52Folders/commonAssets/images/" + avatar + "' />";
    template += "<h5 class='post-author'>" + name + "";
    template += "</h5>";
    template += "</div>";

    return template;
}

function recentFrameworksTemplate(framework) {
    var template = "<div class ='active-avatar'>";
    template += "<img width='54' src='http://hugify.me/52Folders/commonAssets/images/" + framework.avatar + "' />";
    template += "<h5 class='post-author'>" + framework.name;
    template += "</h5>";
    template += "</div>";

    console.log(framework.name);

    return template;
}

function frameworksTemplate(framework) {
    var template = "<div class ='active-avatar'>";
    template += "<img width='54' src='http://hugify.me/52Folders/commonAssets/images/" + framework.avatar + "' />";
    template += "<h5 class='post-author'>" + framework.name;
    template += "</h5>";
    template += "</div>";

    return template;
}