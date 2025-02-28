import './css/ServSection.css'

export function ServSection ({userEnv, servSectionImg, servTag, servTitleOne, servTitleTwo, servDescriptionOne, servDescriptionTwo}) {

    return (
        <>
                  <div className={userEnv === "desktop"? "servSectionBoundary":"mobileServSectionBoundary"}>
        <div className={userEnv === "desktop"?"servSectionLeft":"mobileServSectionLeft"}>
        <img className={userEnv === "desktop"? "servSectionImg":"mobileServSectionImg"} src={servSectionImg} />
        </div>
        
        <div className={userEnv === "desktop"?"servSectionRight":"mobileServSectionRight"}>
            <div className='servTag'>{servTag}</div>
            <div className={userEnv === "tablet"? "tabletTitles":"titles"}>
                <div className={userEnv === "tablet" ? "tabletServTitle" : "servTitle"}>{servTitleOne}</div>
                <div className={userEnv === "tablet" ? "tabletServTitle" : "servTitle"}>{servTitleTwo}</div>
            </div>
            <div className='descriptions'>
            <div className='servDescription'>{servDescriptionOne}</div>
            <div className='servDescription'>{servDescriptionTwo}</div>
            </div>
        </div>
      </div>
      
        </>
    )
}