const buttonGet = document.querySelector("#get-button");
const buttonGetId = document.querySelector("#getid-button");
const buttonPost = document.querySelector("#post-button");
const buttonPatch = document.querySelector("#patch-button");
const buttonDelete = document.querySelector("#delete-button");

const inputPage = document.querySelector("#page");
const inputPageSize = document.querySelector("#pagesize");
const inputKeyword = document.querySelector("#keyword");
const inputId = document.querySelector("#id");

///Articles
const url = new URL("https://sprint-mission-api.vercel.app/articles");

//GET
function getArticleList(params) {
  const paramsA = url.searchParams;
  paramsA.set("page", inputPage.value);
  paramsA.set("pageSize", inputPageSize.value);
  paramsA.set("keyword", inputKeyword.value);
  console.log(url.toString());
  return fetch(url.toString())
    .then((responseGet) => {
      // 응답이 성공적이지 않으면 에러를 던짐
      if (!responseGet.ok) {
        throw new Error("API 호출 실패1");
      }
      return responseGet.json(); // JSON으로 변환
    })
    .then((resultGet) => {
      // 변환된 결과 처리
      return resultGet;
    })
    .catch((err) => {
      // 에러 처리
      console.log("에러가 있습니다.", err);
      return null; // 에러 발생 시 null 반환
    });
}
/*
//호출은 main에서만 하기
buttonGet.addEventListener("click", async function () {
  const page = inputPage.value || 1;
  const pageSize = inputPageSize.value || 100;
  const keyword = inputKeyword.value;

  const resultGet = await getArticleList(page, pageSize, keyword);
  // console.log("확인용", page, pageSize, keyword)
  if (resultGet) {
    console.log("GET 결과", resultGet);
  } else {
    console.log("API 호출 실패");
  }
});
*/

//GET-ID
function getArticle(id) {
  // const paramsAId = url.searchParams;
  // paramsAId.append("id", inputId.value );
  url.pathname = `/articles/${id}`;
  console.log(url.toString());
  return fetch(url.toString())
    .then((responseGetId) => {
      // 응답이 성공적이지 않으면 에러를 던짐
      if (!responseGetId.ok) {
        throw new Error("API 호출 실패");
      }
      return responseGetId.json(); // JSON으로 변환하여 반환
    })
    .then((resultGetId) => {
      // 변환된 결과를 반환
      return resultGetId;
    })
    .catch((err) => {
      // 에러 처리
      console.log("에러가 있습니다.", err);
      return null; // 에러 발생 시 null 반환
    });
}
/*
//GET-ID호출
buttonGetId.addEventListener("click", async function () {
  const id = inputId.value;
  const resultGetId = await getArticle(id);
  if (resultGetId) {
    console.log("GET ID 결과", resultGetId);
  } else {
    console.log("API 호출 실패");
  }
});
*/
//POST
const inputTitle = document.querySelector("#title");
const inputContent = document.querySelector("#content");
const inputImage = document.querySelector("#image");

// console.log("url확인1",url);
function createArticle(title, content, image) {
  // console.log("url확인2",url);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
    }),
  })
    .then((responsePost) => {
      if (!responsePost.ok) {
        throw new Error("API 호출 실패");
      }
      return responsePost.json();
    })
    .then((resultPost) => {
      return resultPost; // 반환된 결과를 호출한 곳으로 전달
    })
    .catch((err) => {
      console.log("에러가 있습니다.", err);
      return null;
    });
}
/*
//POST호출
buttonPost.addEventListener("click", async function () {
  const title = inputTitle.value;
  const content = inputContent.value;
  const image = inputImage.value;

  const resultPost = await createArticle(title, content, image);
  console.log("입력값확인", title, content, image);
  console.log("POST 결과:", resultPost);
  return resultPost;
});
*/
//PATCH
const changeId = document.querySelector("#changeid");
const changeTitle = document.querySelector("#changetitle");
const changeContent = document.querySelector("#changecontent");
const changeImage = document.querySelector("#changeimage");

function patchArticle(id, updateTitle, updateContent, updateImage) {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: updateTitle,
      content: updateContent,
      image: updateImage,
    }),
  })
    .then((responsePatch) => {
      if (!responsePatch.ok) {
        throw new Error("API 호출 실패");
      }
      return responsePatch.json();
    })
    .then((resultPatch) => {
      return resultPatch;
    })
    .catch((err) => {
      console.log("에러가 있습니다.", err);
      return null;
    });
}
/*
//PATCH 호출
buttonPatch.addEventListener("click", async function () {
  const updateId = changeId.value;
  const updateTitle = changeTitle.value;
  const updateContent = changeContent.value;
  const updateImage = changeImage.value;

  if (updateId && updateTitle && updateContent && updateImage) {
    patchArticle(updateId, updateTitle, updateContent, updateImage).then(
      (resultPatch) => {
        if (resultPatch) {
          console.log("수정결과", resultPatch);
        } else {
          console.log("수정 실패");
        }
      }
    );
  }
});
*/
//DELETE

const deleteId = document.querySelector("#xid");

function deleteArticle(id) {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((responseDelete) => {
      if (!responseDelete.ok) {
        throw new Error("API 호출 실패");
      }
      // 상태 코드 204 No Content는 응답 본문이 없지만 삭제가 성공적으로 이루어졌다는 의미
      if (responseDelete.status === 204) {
        return "삭제 성공"; // 삭제 성공 메시지를 반환
      }
      return responseDelete.json(); // 응답 본문이 있을 경우 JSON 반환
    })
    .then((resultDelete) => {
      return resultDelete; // 삭제 성공 메시지 또는 반환된 JSON 결과
    })
    .catch((err) => {
      console.log("에러가 있습니다.", err);
      return null; // 에러 발생 시 null 반환
    });
}
/*
// DELETE 호출
buttonDelete.addEventListener("click", async function () {
  const deleteIdNum = deleteId.value;

  if (deleteIdNum) {
    deleteArticle(deleteIdNum)
      .then((resultDelete) => {
        if (resultDelete === "삭제 성공") {
          console.log(`삭제 성공: ID ${deleteIdNum} 이(가) 삭제되었습니다.`);
        } else {
          console.log("삭제 실패");
        }
      })
      .catch((err) => {
        console.log("에러가 있습니다.", err);
      });
  } else {
    console.log("삭제할 ID를 입력하세요.");
  }
});
*/
export {
  buttonGet,
  buttonGetId,
  buttonPost,
  buttonPatch,
  buttonDelete,
  inputPage,
  inputPageSize,
  inputKeyword,
  inputId,
  url,
  getArticleList,
  getArticle,
  inputTitle,
  inputContent,
  inputImage,
  createArticle,
  changeId,
  changeTitle,
  changeContent,
  changeImage,
  patchArticle,
  deleteId,
  deleteArticle,
};
