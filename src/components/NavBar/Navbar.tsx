import Link from "next/link";
import Styles from "./Navbar.module.css";
const Navbar = () => {
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
        </ul>
      </nav>

    </header>
  );
};
export default Navbar;
