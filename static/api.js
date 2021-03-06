function btnHide() {
  $("#btn-modify").hide();
  $("#btn-delete").hide();
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

function getAllCheckboxValue() {
  let bnos = document.getElementsByName("checkBno");
  let arrBno = [];
  for (var i = 0; i < bnos.length; i++) {
    if (bnos[i].checked == true) {
      arrBno.push(bnos[i].value);
    }
  }
  return arrBno;
}

/* 0_1. read all article */
function getArticles() {
  $("#article-list").empty();
  $.ajax({
    type: "GET",
    url: "/api/articles",
    success: function (response) {
      console.log("[api : read all]");
      let articles = response["articles"];
      let currentPage = response["currentPage"];
      let maxPage = response["maxPage"];
      pagination(currentPage, maxPage);
      for (let i = 0; i < articles.length; i++) {
        addList(articles[i]);
      }
    },
  });
}

/* 0_2. read one article */
function getOneArticle() {
  $("#new-form").empty();
  let bno = getCheckboxValue();
  $.ajax({
    type: "GET",
    url: `/api/article/${bno}`,
    success: function (response) {
      let article = response["article"];
      console.log("[api : read one]", article["bno"]);
      readOne(article);
    },
  });
}

/* 0_3. read many article | level, order, comp_yn */
function searchArticles(page) {
  if (page === 0) page = 1;
  $("#article-list").empty();
  let orderByLevel = $("#orderByLevel").val();
  let orderBySolve = $("#orderBySolve").val();
  let orederByDate = $("#orederByDate").val();
  $.ajax({
    type: "GET",
    url: `/api/filter?level=${orderByLevel}&comp_yn=${orderBySolve}&ins_date=${orederByDate}&page=${page}`,
    success: function (response) {
      let filtered = response["filtered"];
      let currentPage = response["currentPage"];
      let maxPage = response["maxPage"];
      for (let i = 0; i < filtered.length; i++) {
        console.log("[api : read filtered article]");
        addList(filtered[i]);
      }
      pagination(currentPage, maxPage);
    },
  });
}

/* 1_1. post new article | level, writer, title, url */
function addArticle() {
  let level = $("#level").val();
  let writer = $("#writer").val();
  let title = $("#title").val();
  let url = $("#url").val();
  if(url==="" || title==="") {
    alert("????????? ????????? ?????? ??????????????????");
    return false;
  }
  const val = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
  if(!val.test(url)) {
    alert("????????? URL ????????? ????????????.");
    return false;
  }
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
      alert("?????????????????????.");
      window.location.reload();
    },
  });
}

/* 2. put | level, title, url */
function modifyArticle() {
  let bno = getCheckboxValue();
  let level = $("#level").val();
  let title = $("#title").val();
  let url = $("#url").val();
  let comp_yn = $("#comp_yn").val();
  if(url==="" || title==="") {
    alert("????????? ????????? ?????? ??????????????????");
    return false;
  }
  const val = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
  if(!val.test(url)) {
    alert("????????? URL ????????? ????????????.");
    return false;
  }
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
        alert("????????? ????????? ???????????? ????????????.");
      } else {
        console.log(bno, error);
      }
    },
    success: function () {
      alert("????????? ????????? ?????????????????????.");
      window.location.reload();
    },
  });
}

/* 2_2. put | comp_yn*/
function makeItComp() {
  let arrBno = getAllCheckboxValue();
  if (arrBno.length) {
    for (let i = 0; i < arrBno.length; i++) {
      let bno = arrBno[i];
      $.ajax({
        type: "PUT",
        url: `/api/make-it-comp/${bno}`,
      });
    }
    alert("???????????? ???????????????.");
    window.location.reload();
  } else {
    alert("???????????? ??? ???????????? ????????????.");
  }
}

function deleteArticle() {
  let bno = getCheckboxValue();
  $.ajax({
    type: "DELETE",
    url: `/api/articles/${bno}`,
    success: function () {
      alert("?????????????????????.");
      window.location.reload();
    },
  });
}

function pagination(currentPage, maxPage) {
  $("#pagingNav").empty();
  let prevPage = currentPage - 1;
  let nextPage = currentPage + 1;
  let prevClass = "", nextClass = "";
  if (currentPage === 1) prevClass = "disabled";
  if (currentPage === maxPage) nextClass = "disabled";
  let temp_html = `<li class="page-item ${prevClass}">
                    <a class="page-link" onclick="searchArticles('${prevPage}')">???? ?????? </a>
                  </li>
                  <li class="page-item">
                    <span class="page-link"> [ ${currentPage} ] <span class="sr-only">(current)</span>
                    </span>
                  </li>
                  <li class="page-item ${nextClass}">
                    <a class="page-link" onclick="searchArticles('${nextPage}')"> ?????? ????</a>
                  </li>`;
  $("#pagingNav").append(temp_html);
}
