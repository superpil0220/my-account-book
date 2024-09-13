import {Route, Routes} from "react-router-dom";
import AccountRegisterView from "../view/account/AccountRegisterView";
import UseDescriptionView from "../view/account/UseDescriptionView";

function Router() {
  return (
      <>
        <Routes>
          <Route path="/" element={<AccountRegisterView/>}/>
          <Route path="/use-description" element={<UseDescriptionView/>}/>
        </Routes>
      </>
  );
}

export default Router;
