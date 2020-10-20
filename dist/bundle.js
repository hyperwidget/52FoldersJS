//A separate file to define constants for use throughout the app

var BASE_URI = window.location.pathname.includes("Documents")
  ? "http://localhost:3030"
  : "https://llnl1.herokuapp.com/";

//Basic call to api to send XML requests to server for CRUD values
var API = {
  fetch: function (path, callback) {
    var uri = BASE_URI + "/" + path;
    var request = new XMLHttpRequest();

    request.open("GET", uri, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        callback(JSON.parse(request.response));
      }
    };

    request.onerror = function () {
      reject(new Error("Something Went wrong on the API"));
    };

    request.send();
  },
  post: function (path, data, callback) {
    var uri = BASE_URI + "/" + path;
    var request = new XMLHttpRequest();

    request.open("POST", uri, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        callback(JSON.parse(request.response));
      }
    };

    request.onerror = function () {
      reject(new Error("Something Went wrong on the API"));
    };

    request.send(data);
  },
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
  API.fetch("posts", function (data) {
    context.setPosts(data, callback(data));
  });
};

Post.prototype.findArchived = function (callback) {
  var context = this;
  API.fetch("posts?archived=true", function (data) {
    context.setPosts(data, callback(data));
  });
};

Post.prototype.findOne = function (id, callback) {
  var context = this;
  API.fetch(`posts/${id}`, function (data) {
    context.setPosts(data, callback(data));
  });
};

Post.prototype.create = (data, callback) => {
  API.post(`posts`, data, () => {
    if (callback) {
      callback();
    }
  });
};

Post.prototype.archive = (id, callback) => {
  API.post(`posts/${id}/archive`, null, () => {
    if (callback) {
      callback();
    }
  });
};

Post.prototype.unarchive = (id, callback) => {
  API.post(`posts/${id}/unarchive`, null, () => {
    if (callback) {
      callback();
    }
  });
};

var post = new Post();
var comment = new Comment();

//Wait for page to load and then get all posts and recent users
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");
  getData();

  const form = document.getElementById("post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    if (postId) {
      data.append("post_id", postId);
    }

    const formData = convertFormDataToJson(data);
    const jsoned = JSON.parse(formData);

    if (jsoned.name.length > 0) {
      window.localStorage.setItem(name, jsoned.name);
    }
    if (jsoned.avatar.length > 0) {
      window.localStorage.setItem(avatar, jsoned.avatar);
    }

    if (postId) {
      comment.create(formData, getData);
    } else {
      post.create(formData, getData);
    }

    document.getElementById("content").value = "";
  });

  if (window.localStorage.getItem(name)) {
    document.getElementsByName("name")[0].value = window.localStorage.getItem(
      name
    );
  }
  if (window.localStorage.getItem(avatar)) {
    document.getElementsByName("avatar")[0].value = window.localStorage.getItem(
      avatar
    );
  }
};

const getData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");

  if (window.location.pathname.includes("archive")) {
    post.findArchived(function (data) {
      ui.renderPosts(data);
    });
  } else if (postId) {
    post.findOne(postId, function (postData) {
      ui.renderPostWithComments(postData);
    });
  } else {
    post.findAll(function (data) {
      ui.renderPosts(data);
    });
  }
};

//The Comment object class

function Comment() {
  this.comments = [];
}

Comment.prototype.setComments = function (data) {
  this.comments = data;
};

Comment.prototype.getComments = function () {
  return this.comments;
};

Comment.prototype.findAll = function (callback) {
  var context = this;
  API.fetch("comments", function (data) {
    context.setComments(data, callback(data));
  });
};

Comment.prototype.findByPostId = function (postId, callback) {
  var context = this;
  API.fetch(`posts/${postId}/comments`, function (data) {
    context.setComments(data, callback(data));
  });
};

Comment.prototype.findOne = function (id, callback) {
  var context = this;
  API.fetch(`comments/${id}`, function (data) {
    context.setComments(data, callback(data));
  });
};

Comment.prototype.create = (data, callback) => {
  API.post(`comments`, data, () => {
    if (callback) {
      callback();
    }
  });
};

const convertFormDataToJson = (formData) => {
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return JSON.stringify(object);
};

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
