import { useHistory } from 'react-router-dom';

export const PageNotFound = () => {
	const history = useHistory();

	return (
		<>
			<h1>404 - Page Not Found</h1>
			<p>The requested page does not exists. If you think this is a mistake please contact our support team</p>
			<button onClick={() => history.goBack()}>Go Back</button>
		</>
	)
};

export default PageNotFound;