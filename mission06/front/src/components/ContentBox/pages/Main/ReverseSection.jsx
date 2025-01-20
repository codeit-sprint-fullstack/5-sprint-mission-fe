import './css/ReverseServSection.css'

export function ReverseServSection ({userEnv, servSectionImg, servTag, servTitleOne, servTitleTwo, servDescriptionOne, servDescriptionTwo}) {

    return (
        <>
                  <div className={userEnv === "desktop"? "servSectionBoundary":"mobileReverseServSectionBoundary"}>
        <div className={userEnv === "desktop"?"reverseServSectionRight":"mobileReserveServSectionRight"}>
            <div className='servTag'>{servTag}</div>
            <div className={userEnv === "tablet"? "tabletTitles":"titles"}>
                <div className={userEnv === "tablet" ? "tabletServTitle" : "servTitle"}>{servTitleOne}</div>
                <div className={userEnv === "tablet" ? "tabletServTitle" : "servTitle"}>{servTitleTwo}</div>
            </div>
            <div className='servDescription'>{servDescriptionOne}</div>
            <div className='servDescription'>{servDescriptionTwo}</div>
        </div>
        <div className={userEnv === "desktop"?"servSectionLeft":"mobileServSectionLeft"}>
        <img className={userEnv === "desktop"? "servSectionImg":"mobileServSectionImg"} src={servSectionImg} />
        </div>
      </div>
      
        </>
    )
}