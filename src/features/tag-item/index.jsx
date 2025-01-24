import "./style.css";
import { Text } from "shared/ui";
import icX from "shared/assets/images/ic_X.png";

const TagItem = ({ children, handleClick }) => {
  return (
    <div className="tag-item">
      <Text size={"lg"} weight={"regular"} style={{ color: "#1f2937" }}>
        #{children}
      </Text>
      <button onClick={handleClick}>
        <img src={icX} alt=""></img>
      </button>
    </div>
  );
};

export default TagItem;
