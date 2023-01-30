import Head from "next/head";
import styles from "./index.module.sass";
import { useEffect, useState } from "react";
import AOS from "aos";
import getAllData from "../utils/fetchAllData";
import { useTheme } from "next-themes";
import Script from "next/script";

// COMPONENT
import Navbar from "../components/navbar";
import SocialLists from "../components/social-lists";
import Hero from "../components/hero";
import About from "../components/about";
import Education from "../components/education";
import Portfolio from "../components/portfolio";
import ModeSettings from "../components/mode-settings";
import Contact from "../components/contact";

export default function App(props) {
  const [slider, setSlider] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    typeof window !== "undefined" &&
      new kursor({
        type: 4,
        color: "#fff",
        removeDefaultCursor: true,
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 3000 });
    window.addEventListener("load", AOS.refresh);
    window.addEventListener("scroll", () => {
      AOS.refresh();
    });
  }, []);

  return (
    <>
      {/* Website Head Paet And Meta Tags Container */}
      <Head>
        <title>Ishav&#39;s Portfolio • 2002ishavs</title>
        <meta
          name="theme-color"
          content={theme === "dark" ? "#111119" : "#fff"}
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="2002ishavs • I'm Ishav, A Passionate Junior Developer. Interested in ReactJs, NextJs, CPP, DBMS, Javascript , and this is my portfolio • 2002ishavs"
        />
        <meta
          name="keyword"
          content=" Ishav, 2002ishavs, nextjs, reactjs, , portfolio, javascript, developer"
        ></meta>
        <meta
          property="og:title"
          content="Ishav | Web Developer • NextJs | ReactJs | NodeJs | CPP | DBMS | PostgresSQL"
        />
        <meta
          property="og:description"
          content="JavaScript, NextJs, ReactJS, CPP , DBMS"
        />
        <meta property="og:image" content="/me.jpg" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
      </Head>
      <Script
        src="https://unpkg.com/kursor"
        strategy="beforeInteractive"
      ></Script>
      {/* Actual Page Components Wrapper Area */}
      <SocialLists data={props.links} />
      <ModeSettings />
      <main id="app-main" className={styles.container}>
        <div className="row g-0">
          <div className="offset-1 col-10">
            <Navbar data={props.sections} />
            <Hero data={props.info} />
            <About data={props.about} />
            <Education data={props.education} />
            <Portfolio
              data={props.projects}
              slider={slider}
              setSlider={setSlider}
            />
            <Contact data={props.links} />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = getAllData();
  return {
    props: data,
  };
}
