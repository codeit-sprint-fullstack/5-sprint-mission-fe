import { useState } from 'react'
import '../../../../../styles/OrderBy.css'
import arrowDownImg from '../../../../../assets/ic_arrow_down.png'
import arrowUpImg from '../../../../../assets/ic_arrow_up.png'
import sortImg from '../../../../../assets/ic_sort.png'

export function OrderBy ({order, setOrder, userEnv}) {
    const [hide,setHide] = useState(true);
    function handleShowClick(e){
        if(hide === true) setHide(false);
        else setHide(true);
    }
    function handleSetOrderFavorite(){
        setOrder('favorite');
        setHide(true);
    }
    function handleSetOrderRecent(){
        setOrder('recent');
        setHide(true);
    }
    return (
        <div className='orderArea'>
            {
                userEnv==='mobile'?
                <div className='nowOrderByMobile' onClick={handleShowClick}>
                    <img src={sortImg} />
                </div>:
                <div>
                {
                    hide ? (<div className='nowOrderBy' onClick={handleShowClick}>
                        {
                            order === 'recent'?
                            <div className='fontSizeSet'>
                                최신순
                            </div>:
                            <div className='fontSizeSet'>
                                좋아요 순
                            </div>
                        }
                        <div className='arrowImg'>
                            <img src={arrowDownImg} />
                        </div>
                    </div>)
                    : (<div className='nowOrderBy' onClick={handleShowClick}>
                        {
                            order === 'recent'?
                            <div className='fontSizeSet'>
                                최신순
                            </div>:
                            <div className='fontSizeSet'>
                                좋아요 순
                            </div>
                        }
                        <div className='arrowImg'>
                            <img src={arrowUpImg} />
                        </div>
                    </div>)
                }
                </div>
            }

            {
                !hide &&
                <div>
                    <div className={userEnv === 'mobile'? 'selectOrderByMobile':'selectOrderBy'}>
                        <div className={order === 'recent'?'recentOrderChecked':'recentOrder'} onClick={handleSetOrderRecent}>최신순</div>
                        <div className={order === 'favorite'?'favoriteOrderChecked':'favoriteOrder'} onClick={handleSetOrderFavorite}>좋아요순</div>
                    </div>
                </div>
            }

        </div>
    )
}