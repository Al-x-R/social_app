import React, { useState, useEffect } from 'react';
import { Form, Button, Message, Segment, Divider } from 'semantic-ui-react';

import { HeaderMessage, FooterMessage } from '../components/Common/WelcomeMessage';

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	return (
	  <div>
		  <HeaderMessage/>
		  login page
	  </div>
	);
};

export default Login;
