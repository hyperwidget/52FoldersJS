var ui = {
    renderPosts: function (posts) {
        //Set up array for templated posts
        var elements = [];

        //Loop through posts, getting desired values from each posts
        for (var i in posts) {
            //Send values to template to create HTML, and add to the elements array
            elements.push(articleTemplate(posts[i], true));
        }

        //Find the desired location on screen and fill it with the markdown
        var target = document.querySelector(".container");
        target.innerHTML = elements.join("");
    },
    renderUsers: function (users) {
        var elements = [];
        for (var i in users) {
            elements.push(userTemplate(users[i]));
        }

        var target = document.querySelector(".sidebar-content");
        target.innerHTML = elements.join("");
    }
};

function articleTemplate(post, isPreview) {
    var postContents, template;
    if (isPreview) {
        postContents = post.content.split('[--split--]')[0] + ' . . .'
    } else {
        postContents = post.content.split('[--split--]').join("")
    }

    template = "<article class ='post'>";
    template += "<h2 class='post-title'>" + post.title + "</h2>";
    template += "<p class='post-meta'>";
    template += "Posted on " + post.postTime.split(' ')[0] + " at " + post.postTime.split(' ')[1];
    template += " by: <img width='54' src='http://hugify.me/52Folders/commonAssets/images/" + post.author.avatar + "' />" + post.author.name + "</p>";
    template += "<p class='post-content'>" + postContents + "</p>";

    if (isPreview) {
        template += "<a href='#'>Read More</a>";
    }

    template += "</article>";

    return template;
}

function userTemplate(user) {
    var template = "<div class ='active-avatar'>";
    template += "<img width='54' src='http://hugify.me/52Folders/commonAssets/images/" + user.avatar + "' />";
    template += "<h5 class='post-author'>" + user.name;
    template += "</h5>";
    template += "</div>";

    return template;
}