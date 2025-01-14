import "./App.css";
import Page from "pages";
import Header from "widgets/Header";
import Footer from "widgets/Footer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Page></Page>
      <Footer></Footer>
    </div>
  );
}

export default App;
