const productUrl = new URL("https://sprint-mission-api.vercel.app/products");

/** 상품 목록 조회
 * @param params 객체 {page: integer(1), pageSize: integer(100), keyword: "string"}
 * @descrtipion page, pageSize, keyword -> query
 * @returns 상품 객체 목록 배열 반환
 */
const getProductList = async (params) => {
    try {
        const getProductUrl = new URL(productUrl);

        for (const [key, value] of Object.entries(params)) {
            getProductUrl.searchParams.append(key, value);
        }

        const response = await fetch(getProductUrl)
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("error: ", err);
    }
}

/** 상품 상세 조회
 * @param id 게시글 ID: integer
 * @description id -> path
 * @returns response 객체 {id, name, description, price, manufacturer, tags, images, favoriteCount}
 */
const getProduct = async (id) => {
    try {
        const response = await fetch((productUrl + `/${id}`))
        if (!response.ok) {
            throw new Error(`${response.status}: 상품을 찾을 수 없습니다.`);
        }
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("error: ", err);
    }
}

/** 상품 등록
 * @param params 객체 {name: "string", description: "string", price: integer, tags: ["string"], images: ["string"]}
 * @description name, description, price, tags, images -> body
 * @returns 등록된 객체 {id, name, description, price, manufacturer, tags, images, favoriteCount}
 */
const createProduct = async (params) => {
    try {
        const response = await fetch(productUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name: params.name,
                description: params.description,
                price: params.price,
                tags: params.tags,
                images: params.images
            })
        })
        if (!response.ok) {
            throw new Error(`${response.status}: 유효성 검사 오류`);
        }
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("error: ", err);
    }
}

/** 상품 수정
 * @param params 객체 {id: integer, name: "string", description: "string", price: integer, tags: ["string"], images: ["string"]}
 * @description id -> path / name, description, price, tags, images -> body
 * @returns 수정된 객체 {id, name, description, price, manufacturer, tags, images, favoriteCount}
 */
const patchProduct = async (params) => {
    try {
        const response = await fetch((productUrl + `/${params.id}`), {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name: params.name,
                description: params.description,
                price: params.price,
                tags: params.tags,
                images: params.images
            })
        })
        if (!response.ok) {
            throw new Error(`${response.status}: 수정할 상품을 찾을 수 없습니다.`);
        }
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("error: ", err);
    }
}

/** 상품 삭제
 * @param id 게시글 ID: integer
 * @description id -> path
 * @returns 상품 삭제 성공 시 성공 메시지 콘솔에 출력
 */
const deleteProduct = async (id) => {
    try {
        const response = await fetch((productUrl + `/${id}`), {
            method: "DELETE",
            headers: {"Content-Type": "application/json",}
        })

        if (!response.ok) {
            throw new Error(`${response.status}: 삭제할 상품을 찾을 수 없습니다.`);
        }

        console.log("상품을 삭제했습니다.")

    } catch (err) {
        console.log("error: ", err);
    }
}

export { productUrl, getProductList, getProduct, createProduct, patchProduct, deleteProduct } 