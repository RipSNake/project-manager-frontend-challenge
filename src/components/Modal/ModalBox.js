
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
	modal: {
			position: 'absolute',
			minWidth: '40vw',
			minHeight: '40vh',
			backgroundColor: 'white',
			border: '2px solid rgba(40,40,40,0.4)',
			borderRadius: '5px',
			boxShadow: '2px 2px 2px rgba(50,50,50,0.4)',
			top:'50%',
			left:'50%',
			transform: 'translate(-50%, -50%)',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '0.5rem',
	},
	title: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '1.5em 4px',
		fontWeight: '600'
	},
	message: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'space-evenly',
		padding: '1rem 0',
	},
	button: {
		backgroundColor: '#D9D9D9',
		borderRadius: '5px',
		border: '1px solid rgba(0,0,0,0.2)',
		padding: '4px 8px',
		width: '35%'
	},
	acceptBtn: {
		backgroundColor: '#F5222D',
		color: 'white'
	}
}));

export const ModalBox = ({title, message, history, acceptFn, cancelFn, setModal}) => {

	const modalStyles = useStyles();

	return(
		<Modal
			  open
			  onClose={() => setModal(null) }

			>
			  <div className={`${modalStyles.modal} w-full md:w-2/5 xl:1/5`}>
			  	<h3 className={modalStyles.title}>{title}</h3>
			  	<p className={modalStyles.message}>{message}</p>
			  	<buttongroup className={modalStyles.buttons}>
				  	{ acceptFn ? 
				  		<button className={`${modalStyles.button} ${modalStyles.acceptBtn}`} onClick={() => {acceptFn(); setModal(null); if(history){history.goBack()}}}>Aceptar</button> 
				  		: 
				  		<button className={modalStyles.button} onClick={setModal(null)}>OK</button> 
				  	}
				  	
				  	{ cancelFn ? 
				  		<button className={modalStyles.button} onClick={() => {cancelFn(); setModal(null);}}>Cancelar</button> 
				  		: 
				  		null 
				  	}
			  	</buttongroup>
			  </div>
			</Modal>

		
	)
}

export default ModalBox;