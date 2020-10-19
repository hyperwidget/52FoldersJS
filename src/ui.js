var ui = {
  renderPosts: function (posts) {
    //Set up array for templated posts
    var elements = [];

    //Loop through posts, getting desired values from each posts
    for (var i in posts) {
      //Send values to template to create HTML, and add to the elements array
      elements.push(postTemplate(posts[i], true, i));
    }

    //Find the desired location on screen and fill it with the markdown
    var target = document.querySelector(".posts-container");
    target.innerHTML = elements.join("");
  },
};

var ui = {
  renderPosts: function (posts) {
    //Set up array for templated posts
    var elements = [];

    //Loop through posts, getting desired values from each posts
    for (var i in posts) {
      //Send values to template to create HTML, and add to the elements array
      elements.push(postTemplate(posts[i], false, i));
    }

    //Find the desired location on screen and fill it with the markdown
    var target = document.querySelector(".posts-container");
    target.innerHTML = elements.join("");

    bindArchivalFunctions(true);
  },
  renderPostWithComments: function (post) {
    const comments = post.Comments;
    var elements = [];
    elements.push(postTemplate(post, true, 0));

    for (var i in comments) {
      //Send values to template to create HTML, and add to the elements array
      elements.push(commentTemplate(comments[i], i));
    }

    var target = document.querySelector(".posts-container");
    target.innerHTML = elements.join("");
    bindArchivalFunctions(false);
  },
};

function postTemplate(post, isPostView, index) {
  var template;

  template = "<article class ='post" + (index % 2 === 0 ? "" : " odd") + `' >`;
  template += `<div class='post-title'>
    <img src="${post.avatar}"/>
    <div>
        <p><strong>${post.name}</strong>
        <i class="fui-cross" title="${post.archived ? "unarchive" : "archive"}"
        data-post-id="${post.id}"
        data-archived="${post.archived}"></i></p>
        <p class='post-meta'>${post.createdAt}</p>
    </div>
    </div>`;
  template += "<p class='post-content'>" + post.content + "</p>";

  if (!isPostView) {
    template += `<a href='post.html?post_id=${post.id}'>${
      post.Comments.length > 0 ? "Read More" : "Be the first to comment"
    }</a>`;
  }

  template += "</article>";

  return template;
}

function commentTemplate(comment, index) {
  var template;

  template =
    "<article class ='post comment" + (index % 2 === 0 ? " odd" : "") + "'>";
  template += `<div class='post-title'>
    <img src="${comment.avatar}"/>
    <div>
        <p><strong>${comment.name}</strong></p>
        <p class='post-meta'>${comment.createdAt}</p>
    </div>
    </div>
    `;
  template += "<p class='post-content'>" + comment.content + "</p>";

  template += "</article>";

  return template;
}

function bindArchivalFunctions(shouldArchive = false) {
  const targets = document.getElementsByClassName("fui-cross");

  Array.from(targets).forEach(function (element) {
    const id = element.getAttribute("data-post-id");
    const archived = element.getAttribute("data-archived");

    element.addEventListener("click", () => {
      if (archived == "true") {
        post.unarchive(id, getData);
      } else {
        post.archive(id, getData);
      }
    });
  });
}
