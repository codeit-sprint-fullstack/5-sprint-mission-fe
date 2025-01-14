// import axios from "axios";
const urlProduct = new URL("https://sprint-mission-api.vercel.app/products");
const btnProductGet = document.querySelector("#product-get-button");
const inputProductPage = document.querySelector("#product-page");
const inputProductPageSize = document.querySelector("#product-pagesize");
const inputProductKeyword = document.querySelector("#product-keyword");

///GET
async function getProductList(params) {
  try {
    const paramsProductGet = urlProduct.searchParams;
    paramsProductGet.set("page", inputProductPage.value);
    paramsProductGet.set("pageSize", inputProductPageSize.value);
    paramsProductGet.set("keyword", inputProductKeyword.value);
    // console.log(url.toString());
    console.log("url확인", urlProduct.toString());
    const responseProductGet = await axios.get(urlProduct.toString());
    return responseProductGet.data;
  } catch (err) {
    console.log("에러가 있습니다.", err);
    console.log("url확인", urlProduct.toString());
    return false;
  }
}
/*
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
*/
///GET-ID
const inputProductId = document.querySelector("#product-id");
const btnProductGetId = document.querySelector("#product-getid-button");

async function getProduct(id) {
  try {
    //const id = inputProductId.value;
    urlProduct.pathname = `/products/${id}`;
    console.log(urlProduct.toString());
    const responseProductGetId = await axios.get(urlProduct.toString());
    return responseProductGetId.data;
  } catch (err) {
    console.log("에러가 있습니다.", err);
    console.log("url확인", urlProduct.toString());
    return false;
  }
}
/*
//GET-ID 호출
btnProductGetId.addEventListener("click", async function () {
  const id = inputProductId.value;
  const resultGetId = await getProduct(id);
  if (resultGetId) {
    console.log("GET ID 결과", resultGetId);
  } else {
    console.log("API 호출 실패");
  }
});
*/
///POST
const inputName = document.querySelector("#product-name");
const inputDescription = document.querySelector("#product-description");
const inputPrice = document.querySelector("#product-price");
const inputTags = document.querySelector("#product-tags");
const inputImages = document.querySelector("#product-images");

async function createProduct(name, description, price, tags, images) {
  try {
    const responseProductPost = await axios.post(
      urlProduct.toString(),
      {
        name: name,
        description: description,
        price: price,
        tags: tags,
        images: images,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return responseProductPost.data;
  } catch (err) {
    console.log("에러가 있습니다.", err);
    console.log("서버 응답:", err.response ? err.response.data : null);
    return false;
  }
}
const btnProductPost = document.querySelector("#product-post-button");
/*
//POST호출
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
*/
///PATCH
const changeProductId = document.querySelector("#product-changeid");
const changeProductName = document.querySelector("#product-changename");
const changeProductDescription = document.querySelector(
  "#product-changedescription"
);
const changeProductPrice = document.querySelector("#product-changeprice");
const changeProductTags = document.querySelector("#product-changetags");
const changeProductImages = document.querySelector("#product-changeimages");

async function patchProduct(
  id,
  updateName,
  updateDescription,
  updatePrice,
  updateTags,
  updateImages
) {
  try {
    urlProduct.pathname = `/products/${id}`;
    const responseProductPatch = await axios.patch(
      urlProduct.toString(),
      {
        name: updateName,
        description: updateDescription,
        price: updatePrice,
        tags: updateTags,
        images: updateImages,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return responseProductPatch.data;
  } catch (err) {
    console.log("에러가 있습니다.", err);
    return false;
  }
}
const btnProductPatch = document.querySelector("#product-patch-button");
/*
//PATCH 호출
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
*/
///DELETE
const deleteProductId = document.querySelector("#product-xid");

async function deleteProduct(id) {
  try {
    urlProduct.pathname = `/products/${id}`;
    const responseProductDelete = await axios.delete(urlProduct.toString(), {
      headers: { "Content-Type": "applicaton/json" },
    });
    if (responseProductDelete.status === 204) {
      return "삭제 성공";
    }
    return responseProductDelete.data;
  } catch (err) {
    console.log("에러가 있습니다.", err);
    return null;
  }
}

//DELETE 호출
const btnProductDelete = document.querySelector("#product-delete-button");
/*
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
*/
export {
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
};
