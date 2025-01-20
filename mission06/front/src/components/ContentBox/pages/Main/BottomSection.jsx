import { Link } from 'react-router-dom';
import bottomSectionImg from './assets/Img_home_bottom.png';
export function BottomSection({userEnv}) {
  return (
    <>
      <div className="bottomSectionBoundary">
        <div
          className={
            userEnv === 'desktop' ? 'mainSection' : 'mobileMainSection'
          }
        >
          <div
            className={
              userEnv === 'desktop'
                ? 'bottomSectionLeft'
                : (userEnv === 'tablet' ? 'tabletMainSectionLeft':'mobileMainSectionLeft')
            }
          >
            <div className={userEnv==="desktop"? "titles": "tabletBottomTitles"}>
              <div className='bottomSectionTitle'>
                믿을 수 있는
              </div>
              <div className='bottomSectionTitle'>
                판다마켓 중고거래
              </div>
            </div>
          </div>
          <div
            className={
              userEnv === 'desktop'
                ? 'mainSectionRight'
                : 'mobileMainSectionRight'
            }
          >
            <img className="mainSectionImg" src={bottomSectionImg} />
          </div>
        </div>
      </div>
    </>
  );
}
