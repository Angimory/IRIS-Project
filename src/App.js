import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Iris from "./Iris";
import LoginPage from "./LoginPage";
function App() {
 
  return (
    <Router>
      <div>

        <hr />

        <Routes>
          <Route exact path="/" element={<Iris/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
        </Routes>
      </div>
    </Router>
  );
}
//request.time < timestamp.date(2022, 6, 14);
export default App;
