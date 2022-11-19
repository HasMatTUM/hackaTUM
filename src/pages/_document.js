import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Create MERN App provides starter kits for building web, desktop and mobile apps in pure JavaScript."
          />
          <title>TUM Voices</title>
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://mernjs-reactjs.herokuapp.com"
          />
          <meta property="og:title" content="TUM Voices" />
          <meta
            property="og:description"
            content="A transparent and safe voting platforms to motivate TUM students participate in politics"
          />
          <meta
            property="og:image"
            content="https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/26/react-sticker.png"
          />
          <meta property="og:image:type" content="image/png" />

          <link rel="manifest" href="/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Brew" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
