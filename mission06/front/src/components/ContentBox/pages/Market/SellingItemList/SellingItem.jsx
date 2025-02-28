import icHeartImg from '../../../../../assets/ic_heart.png'
import '../../../../../styles/SellingItem.css'
import imgDefault from '../../../../../assets/img_default.png'
export function SellingItem ({product}) {
    function handleImgError (e) {
        e.target.src = imgDefault;
    }
    return(
        <div className='sellingItem'>
            <div className='imgArea'>
            <img className='productImage' src={product.images[0]?product.images[0]:imgDefault} onError={handleImgError}/>
            </div>
            <div className='productName'>
                {product.name}
            </div>
            <div className='productPrice'>
                {product.price}원
            </div>
            <div className='productFavoriteCount'>
                <img src={icHeartImg} />{product.favoriteCount}
            </div>
        </div>
    );
}