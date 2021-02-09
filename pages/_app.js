import { GlobalStyles } from "twin.macro";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
