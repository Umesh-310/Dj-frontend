import Link from "next/link";
import Style from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={Style.footer}>
      <p>Coptright &copy; DJ Events</p>
      <p>
        <Link href='/about'> About Page</Link>
      </p>
    </footer>
  );
};

export default Footer;
