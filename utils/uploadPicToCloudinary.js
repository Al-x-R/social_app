import axios from 'axios';

const uploadPic = async (media) => {
	try {
		const form = new FormData();
		form.append('file', media);
		form.append('upload_preset', 'social_app');
		form.append('cloud_name', 'dceanctyl');

		const res = await axios.post(process.env.CLOUDINARY_URL, form);
		return res.data.url;
	} catch (error) {
		return console.error(error);
	}
};

export default uploadPic;
