import icHeartImg from '../../../../../assets/ic_heart.png'
import '../../../../../styles/BestItem.css'
export function BestItem({ bestProducts }) {
  return (
    <>
      {bestProducts.map((bestProduct, key) => {
        return (
          <div className='bestItem' key={key}>
            <div className='imgArea'>
              <img className='bestProductImage' src={bestProduct.images[0]} />
            </div>
            <div>{bestProduct.name}</div>
            <div className='bestProductPrice'>{bestProduct.price}원</div>
            <div>
                <img src={icHeartImg} />{bestProduct.favoriteCount}
            </div>
          </div>
        );
      })}
    </>
  );
}
