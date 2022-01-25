function btnHide() {
  $("#btn-modify").hide();
  $("#btn-delete").hide();
}

function btnShow() {
  $("#btn-modify").show();
  $("#btn-delete").show();
}

function getCheckboxValue() {
  let bnos = document.getElementsByName("checkBno");
  let arrBno = [];
  for (var i = 0; i < bnos.length; i++) {
    if (bnos[i].checked == true) {
      arrBno.push(bnos[i].value);
    }
  }
  return arrBno.length === 1 ? arrBno[0] : -1;
}

/* 0_1. read all article */
function getArticles() {
  $("#article-list").empty();
  $.ajax({
    type: "GET",
    url: "/api/articles",
    success: function (response) {
      console.log("[api : read all]");
      let articles = response["articels"];
      for (let i = 0; i < articles.length; i++) {
        addList(articles[i]);
      }
    },
  });
}

/* 0_2. read one article */
function getOneArticle() {
  let bno = getCheckboxValue();
  $("#btn-save").hide();
  btnShow();
  $("#new-form").empty();
  $.ajax({
    type: "GET",
    url: `/api/articles/${bno}`,
    success: function (response) {
      let article = response["article"];
      console.log("[api : read one]", article["bno"]);
      readOne(article);
    },
  });
}

/* 0_3. read many article */
// function getArticles(level, callback) {
//   $("#goodsList").empty();
//   $.ajax({
//     type: "GET",
//     url: `/api/articles${category ? "?category=" + category : ""}`,
//     success: function (response) {
//       callback(response["goods"]);
//     },
//   });
// }

/* 1_1. post new article | level, writer, title, url */
function addArticle() {
  let level = $("#level").val();
  let writer = $("#writer").val();
  let title = $("#title").val();
  let url = $("#url").val();
  $.ajax({
    type: "POST",
    url: "/api/articles",
    data: {
      level_give: level,
      writer_give: writer,
      title_give: title,
      url_give: url,
    },
    success: function (response) {
      alert("saved");
      window.location.reload();
    },
  });
}

/* 2. put | level, title, url */
function modifyArticle() {
  $("#btn-modify").show();
  $("#btn-delete").show();
  $("#btn-save").hide();

  let bno = getCheckboxValue();
  let level = $("#level").val();
  let title = $("#title").val();
  let url = $("#url").val();
  let comp_yn = $("#comp_yn").val();
  $.ajax({
    type: "PUT",
    url: `/api/articles/${bno}`,
    data: {
      level_give: level,
      title_give: title,
      url_give: url,
      comp_yn_give: comp_yn,
    },
    error: function (xhr, status, error) {
      if (status == 400) {
        alert("Cannot modify null data");
      } else {
        console.log(bno, error);
      }
    },
    success: function () {
      alert("save changes");
      window.location.reload();
    },
  });
}

function deleteArticle() {
  let bno = getCheckboxValue();
  $.ajax({
    type: "DELETE",
    url: `/api/articles/${bno}`,
    success: function () {
      alert("deleted");
      window.location.reload();
    },
  });
}
