import { Link } from 'react-router-dom';
import mainSectionImg from '../../../../assets/Img_home_top.png';
export function MainSection({userEnv}) {
  return (
    <>
      <div className="mainSectionBoundary">
        <div
          className={
            userEnv === 'desktop' ? 'mainSection' : 'mobileMainSection'
          }
        >
          <div
            className={
              userEnv === 'desktop'
                ? 'mainSectionLeft'
                : (userEnv === 'tablet' ? 'tabletMainSectionLeft':'mobileMainSectionLeft')
            }
          >
            <div className={userEnv === 'tablet' ? "tabletMainSectionTitle":"mainSectionTitle"}>
              일상의 모든 물건을 거래해 보세요
            </div>
            <Link to="/items">
              <button className={userEnv === 'desktop'?"caliber":"mobileCaliber"}>구경하러 가기</button>
            </Link>
          </div>
          <div
            className={
              userEnv === 'desktop'
                ? 'mainSectionRight'
                : 'mobileMainSectionRight'
            }
          >
            <img className="mainSectionImg" src={mainSectionImg} />
          </div>
        </div>
      </div>
    </>
  );
}
