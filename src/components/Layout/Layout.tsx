import Head from "next/head";
import { LayoutProps } from "##";
import styles from "./Layout.module.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Showcase from "../Showcase/Showcase";
import { useRouter } from "next/router";
const Layout = ({ children, title, description, keywords }: LayoutProps) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "DJ Events",
  description: "WelCome to DJ events",
  keywords: "hello , DJ , dj , Events , music , party",
};
export default Layout;
//
