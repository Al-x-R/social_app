import React from 'react';
import { Container } from 'semantic-ui-react'
import HeadTags from './HeadTags';

const Layout = () => {
	return (
		<>
			<HeadTags />
			<Container style={{ paddingTop: '1rem'}} text></Container>
		</>
	);
};

export default Layout;
