import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Form, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';

import { FooterMessage, HeaderMessage } from '../components/Common/WelcomeMessage';
import CommonInputs from '../components/Common/CommonInputs';
import ImageDropDiv from '../components/Common/ImageDropDiv';
import baseUrl from '../utils/baseUrl';
import { registerUser } from '../utils/authUser';

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

let cancel;

const Signup = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		bio: '',
		facebook: '',
		youtube: '',
		twitter: '',
		instagram: '',
	});

	const { name, email, password, bio } = user;

	const [showSocialLinks, setShowSocialLinks] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [formLoading, setFormLoading] = useState(false);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const [username, setUsername] = useState('');
	const [usernameLoading, setUsernameLoading] = useState(false);
	const [usernameAvailable, setUsernameAvailable] = useState(false);

	const [media, setMedia] = useState(null);
	const [mediaPreview, setMediaPreview] = useState(null);
	const [highlighted, setHighlighted] = useState(false);
	const inputRef = useRef();

	const handleChange = e => {
		const { name, value, files } = e.target;

		if (name === 'media') {
			setMedia(files[0]);
			setMediaPreview(URL.createObjectURL(files[0]));
		}

		setUser(prev => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		const isUser = Object.values({ name, email, password, bio }).every(item =>
		  Boolean(item),
		);
		isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
	}, [user]);

	const checkUsername = async () => {
		setUsernameLoading(true);

		try {
			cancel && cancel();

			const CancelToken = axios.CancelToken;

			const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
				cancelToken: new CancelToken(canceler => {
					cancel = canceler;
				}),
			});

			if (errorMsg !== null) setErrorMsg(null);

			if (res.data === 'Available') {
				setUsernameAvailable(true);
				setUser(prev => ({ ...prev, username }));
			}
		} catch (error) {
			setErrorMsg('Username Not Available');
			setUsernameAvailable(false);
		}

		setUsernameLoading(false);
	};

	useEffect(() => {
		username === '' ? setUsernameAvailable(false) : checkUsername();
	}, [username]);

	const handleSubmit = async e => {
		e.preventDefault();
		setFormLoading(true);

		let profilePicUrl;
		if (media !== null) {
			profilePicUrl = await uploadPic(media);
		}

		if (media !== null && !profilePicUrl) {
			setFormLoading(false);
			return setErrorMsg('Error Uploading Image');
		}

		await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
	};

	return (
	  <div>
		  <HeaderMessage/>
		  <Form loading={formLoading} error={errorMsg !== null} onSubmit={handleSubmit}>
			  <Message
				error
				header="Oops!"
				content={errorMsg}
				onDismiss={() => setErrorMsg(null)}
			  />

			  <Segment>
				  <ImageDropDiv
					mediaPreview={mediaPreview}
					setMediaPreview={setMediaPreview}
					setMedia={setMedia}
					inputRef={inputRef}
					highlighted={highlighted}
					setHighlighted={setHighlighted}
					handleChange={handleChange}
				  />
				  <Form.Input
					required
					label="Name"
					placeholder="Name"
					name="name"
					value={name}
					onChange={handleChange}
					fluid
					icon="user"
					iconPosition="left"
				  />

				  <Form.Input
					required
					label="Email"
					placeholder="Email"
					name="email"
					value={email}
					onChange={handleChange}
					fluid
					icon="envelope"
					iconPosition="left"
					type="email"
				  />

				  <Form.Input
					label="Password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={handleChange}
					fluid
					icon={{
						name: 'eye',
						circular: true,
						link: true,
						onClick: () => setShowPassword(!showPassword),
					}}
					iconPosition="left"
					type={showPassword ? 'text' : 'password'}
					required
				  />

				  <Form.Input
					loading={usernameLoading}
					error={!usernameAvailable}
					required
					label="Username"
					placeholder="Username"
					value={username}
					onChange={e => {
						setUsername(e.target.value);
						if (regexUserName.test(e.target.value)) {
							setUsernameAvailable(true);
						} else {
							setUsernameAvailable(false);
						}
					}}
					fluid
					icon={usernameAvailable ? 'check' : 'close'}
					iconPosition="left"
				  />

				  <CommonInputs
					user={user}
					showSocialLinks={showSocialLinks}
					setShowSocialLinks={setShowSocialLinks}
					handleChange={handleChange}
				  />

				  <Divider hidden/>
				  <Button
					icon="signup"
					content="Signup"
					type="submit"
					color="orange"
					disabled={submitDisabled || !usernameAvailable}
				  />
			  </Segment>
		  </Form>
		  <FooterMessage/>
	  </div>
	);
};

export default Signup;
