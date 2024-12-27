export const productUrl = new URL("https://sprint-mission-api.vercel.app/products");

//상품 목록 조회
export const getProductList = async ({page, pageSize, keyword}) => {
    try {
        productUrl.searchParams.append("page", page);
        productUrl.searchParams.append("pageSize", pageSize);
        productUrl.searchParams.append("keyword", keyword);

        const response = await fetch(productUrl)
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//상품 상세 조회
export const getProduct = async (id) => {
    try {
        const response = await fetch((productUrl + `/${id}`))
        if (response.status !== 200) console.log("상품을 찾을 수 없습니다.");
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//상품 등록
export const createProduct = async ({name, description, price, tags, images}) => {
    try {
        const response = await fetch(productUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name,
                description,
                price,
                tags,
                images
            })
        })
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//상품 수정
export const patchProduct = async ({id, name, description, price, tags, images}) => {
    try {
        const response = await fetch((productUrl + `/${id}`), {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name,
                description,
                price,
                tags,
                images
            })
        })
        if (response.status !== 200) console.log("상품을 찾을 수 없습니다.");
        const data = await response.json();
        return data;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//상품 삭제
export const deleteProduct = async (id) => {
    try {
        const response = await fetch((productUrl + `/${id}`), {
            method: "DELETE",
            headers: {"Content-Type": "application/json",}
        })

        return response;

    } catch (err) {
        console.log("Err: ", err);
    }
}