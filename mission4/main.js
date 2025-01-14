import {
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
} from "./ArticleService.js";

import {
  urlProduct,
  btnProductGet,
  inputProductPage,
  inputProductPageSize,
  inputProductKeyword,
  getProductList,
  inputProductId,
  btnProductGetId,
  getProduct,
  inputName,
  inputDescription,
  inputPrice,
  inputTags,
  inputImages,
  createProduct,
  btnProductPost,
  changeProductId,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  changeProductTags,
  changeProductImages,
  patchProduct,
  btnProductPatch,
  deleteProductId,
  deleteProduct,
  btnProductDelete,
} from "./ProductService.js";

//Article: GET
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

//Article: GET ID
buttonGetId.addEventListener("click", async function () {
  const id = inputId.value;
  const resultGetId = await getArticle(id);
  if (resultGetId) {
    console.log("GET ID 결과", resultGetId);
  } else {
    console.log("API 호출 실패");
  }
});

//Article: POST
buttonPost.addEventListener("click", async function () {
  const title = inputTitle.value;
  const content = inputContent.value;
  const image = inputImage.value;

  const resultPost = await createArticle(title, content, image);
  console.log("입력값확인", title, content, image);
  console.log("POST 결과:", resultPost);
  return resultPost;
});

//Article: PATCH
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

//Article: DELETE
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

//Product: GET
btnProductGet.addEventListener("click", async function () {
  const page = inputProductPage.value;
  const pageSize = inputProductPageSize.value;
  const keyword = inputProductKeyword.value;
  const resultProductGet = await getProductList(page, pageSize, keyword);
  if (resultProductGet) {
    console.log("GET 결과", resultProductGet);
  } else {
    console.log("API 호출 실패");
  }
});

//Product: GET ID
btnProductGetId.addEventListener("click", async function () {
  const id = inputProductId.value;
  const resultGetId = await getProduct(id);
  if (resultGetId) {
    console.log("GET ID 결과", resultGetId);
  } else {
    console.log("API 호출 실패");
  }
});

//Product: POST
btnProductPost.addEventListener("click", async function () {
  const name = inputName.value;
  const description = inputDescription.value;
  const price = Number(inputPrice.value);
  const tags = inputTags.value.split(",");
  const images = inputImages.value.split(",");

  const resultProductPost = await createProduct(
    name,
    description,
    price,
    tags,
    images
  );
  console.log("입력값 확인", name, description, price, tags, images);
  console.log("POST 결과:", resultProductPost);
  return resultProductPost;
});

//Product: PATCH
btnProductPatch.addEventListener("click", async function () {
  const updateProductId = changeProductId.value;
  const updateProductName = changeProductName.value;
  const updateProductDescription = changeProductDescription.value;
  const updateProductPrice = Number(changeProductPrice.value);
  const updateProductTags = changeProductTags.value.split(",");
  const updateProductImages = changeProductImages.value.split(",");
  if (
    updateProductId &&
    updateProductName &&
    updateProductDescription &&
    updateProductPrice &&
    updateProductTags &&
    updateProductImages
  ) {
    const resultProductPatch = await patchProduct(
      updateProductId,
      updateProductName,
      updateProductDescription,
      updateProductPrice,
      updateProductTags,
      updateProductImages
    );
    if (resultProductPatch) {
      console.log("수정결과", resultProductPatch);
    } else {
      console.log("수정 실패");
    }
  }
});

//Product: DELETE
btnProductDelete.addEventListener("click", async function () {
  const deleteProductIdNum = deleteProductId.value;
  console.log("id확인용", deleteProductIdNum);
  if (deleteProductIdNum) {
    try {
      const resultProductDelete = await deleteProduct(deleteProductIdNum);
      if (resultProductDelete) {
        console.log(
          `삭제 성공: ID ${deleteProductIdNum}이(가) 삭제되었습니다.`
        );
      } else {
        console.log("삭제 실패");
      }
    } catch (err) {
      console.log("에러가 있습니다.", err);
    }
  } else {
    console.log("삭제할 ID를 입력하세요.");
  }
});
