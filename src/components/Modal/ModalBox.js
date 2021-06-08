import { useState } from 'react';

import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
	modal: {
			position: 'absolute',
			width: '40vw',
			'min-height': '20vh',
			backgroundColor: 'white',
			border: '2px solid green',
			top:'50%',
			left:'50%',
			transform: 'translate(-50%, -50%)',
	}
}));

export const ModalBox = (title, message, history) => {
	const [modalOpen, setModalOpen] = useState(true);
	//stablish styles
	const modalStyles = useStyles();

	//modal open-close
	const modalToggle = () => {
		setModalOpen(!modalOpen)
		history.goBack();
	}

	// prepare modal body
	const ModalBody = (title,message) => {
		<div className={modalStyles.modal}>
			<h2>{title}</h2>
			<p>{message}</p>
			<button onClick={modalToggle}>Accept</button>
			<button onClick={modalToggle}>Cancel</button>
		</div>
	}

	return(
		<Modal
			  open={modalOpen}
			  onClose={modalToggle}
			>
			  <ModalBody />
			</Modal>

		
	)
}

export default ModalBox;