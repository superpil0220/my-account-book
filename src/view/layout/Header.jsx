import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";

function Header() {
  console.log("Header Start!");
  return (
      <div className="py-5">
        <h1 className="text-2xl">
          <FontAwesomeIcon icon={faBook} />
          <span className="ml-3" >가계북</span>
        </h1>
        <ul className="flex mt-5">
          <li className="mr-3 bg-[#2d3748] px-3 py-1 rounded-md">
            <Link to="/">To Notion</Link>
          </li>
          <li className="bg-[#2d3748] px-3 py-1 rounded-md">
            <Link to="/use-description">사용법</Link>
          </li>
        </ul>
      </div>
  );
}

export default Header;
