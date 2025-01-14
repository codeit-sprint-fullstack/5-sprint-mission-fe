import { useState } from 'react';
import '../../../styles/PostItem.css'

export function PostItem({setMod}) {
    const [imageUrl,setImageUrl] = useState(['']);
    const [tag,setTag] = useState(['기본 태그']);
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("기본 설명");
    const [productName,setProductName] = useState("상품 이름");
    function handleGetModClick(e) {
        setMod('get');
    }
    async function postProduct() {
        await fetch(`https://panda-market-api.vercel.app/products`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                images : imageUrl,
                tags : tag,
                price : price,
                description : description,
                name : productName,
            })
        })
    }
    function handleImgInput (e) {
        setImageUrl([e.target.value]);
    }
    function handleTagInput (e) {
        setTag([e.target.value]);
    }
    function handlePriceInput (e) {
        setPrice(e.target.value);
    }
    function handleDescriptionInput (e) {
        setDescription(e.target.value);
    }
    function handelProductNameInput (e) {
        setProductName(e.target.value);
    }
    // console.log("price",price);
    
    return(
        <div>
            <h3>상품 등록</h3>
            <button onClick={handleGetModClick}>돌아가기</button>
            <div className="inputBox">
                이미지 주소: <input onChange={handleImgInput} />
                태그: <input onChange={handleTagInput}/>
                가격: <input onChange={handlePriceInput}/>
                설명: <input onChange={handleDescriptionInput}/>
                상품명: <input onChange={handelProductNameInput}/>
            </div>
            <button onClick={postProduct}>상품 등록</button>
        </div>

    );
}