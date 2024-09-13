import './App.css';
import Header from "./view/layout/Header";
import Footer from "./view/layout/Footer";
import {BrowserRouter} from "react-router-dom";
import Router from "./router/Router";


function App() {
  console.log("App.js Start!");
  return (
      <div className="App">
        <BrowserRouter>
          <div className="m-auto px-4 max-w-[1000px]">
            <Header></Header>
            <div className="min-h-[1000px] my-10">
              <Router></Router>
            </div>
            <Footer></Footer>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
