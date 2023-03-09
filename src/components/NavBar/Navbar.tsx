import Link from "next/link";
import Styles from "./Navbar.module.css";
import Search from "../Search/Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <header className={Styles.header}>
      <div className={Styles.logo}>
        <Link href={"/"}> Home</Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href='/events'> Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href='/events/add'>Add Events</Link>
              </li>
              <li>
                <Link href='/account/dashboard'>Dashboard</Link>
              </li>
              <li>
                <Link
                  onClick={() => logOut()}
                  className='btn-secondary btn-icon'
                  href='/account/login'
                >
                  <FaSignOutAlt />
                  LogOut
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link className='btn-secondary btn-icon' href='/account/login'>
                <FaSignInAlt />
                Log-in
              </Link>
            </li>
          )}

          <li>
            <Search />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
