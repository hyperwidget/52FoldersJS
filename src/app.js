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
