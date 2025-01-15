import Button from "shared/ui/button";
import "./App.css";
import Text from "shared/ui/text";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Footer />
        <Button size={"lg"}>
          <Text size={"xl"} weight={"bold"} color={"#f3f4f6"}>
            구경하러 가기
          </Text>
        </Button>
        <Button size={"lg"} disabled={true}>
          <Text size={"xl"} weight={"bold"} color={"#f3f4f6"}>
            구경하러 가기
          </Text>
        </Button>
      </div>
    </BrowserRouter>
  );
}

export default App;
