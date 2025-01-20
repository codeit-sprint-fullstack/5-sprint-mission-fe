import '../../../../styles/TagElement.css';
import imgX from '../../../../assets/ic_X.png';

export function TagElement({ children, setTag, tag }) {
    function handleDeleteClick (){
        setTag(tag.filter((element)=>element !== children));
    }
  return (
    <div className="tagElementDiv">
      <div>#{children}</div>
      <div>
        <img src={imgX} className="imgX" onClick={handleDeleteClick}/>
      </div>
    </div>
  );
}
