import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Button } from "react-bootstrap";
import Account from "./component/input";
import Header from "./component/header/header";
function App() {
  return (
    <div className="App">
      <div className="app-wrap">
        <Header />
        <Account />
      </div>
    </div>
  );
}

export default App;
