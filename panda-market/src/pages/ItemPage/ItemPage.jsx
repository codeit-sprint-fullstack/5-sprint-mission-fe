import { useParams } from "react-router-dom";

function ItemPage() {
  const { itemId } = useParams();
  return <div>{itemId}</div>;
}

export default ItemPage;
