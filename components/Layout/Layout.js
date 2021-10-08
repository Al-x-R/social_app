import React from 'react';
import { Container } from 'semantic-ui-react';
import HeadTags from './HeadTags';
import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
	  <>
		  <HeadTags/>
		  <Navbar/>
		  <Container style={{ paddingTop: '1rem' }} text>
			  {children}
		  </Container>
	  </>
	);
};

export default Layout;
