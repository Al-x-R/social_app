import React from 'react';
import App from "next/app";
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

class MyApp extends App  {

  render() {
    const { Component, pageProps } = this.props;

    return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
    )
  }
}

export default MyApp
