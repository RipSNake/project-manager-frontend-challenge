import './ProjectForm.css';
import React, { useState, useEffect } from 'react';
import { Grid, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject } from '../../features/project/projectSlice';
// validation library
import * as yup from 'yup';

const useStyles = makeStyles( theme => ({
	modal: {
			position: 'absolute',
			width: '20vw',
			height: '20vh',
			backgroundColor: 'white',
			border: '2px solid rgba(40,40,40,0.4)',
			borderRadius: '5px',
			shadow: '2px 2px 2px rgba(50,50,50,0.4)',
			top:'50%',
			left:'50%',
			transform: 'translate(-50%, -50%)',
			display: 'flex',
			flexDirection: 'column'
	},
	title: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '1.5em 4px',
		fontWeight: '600'
	},
	btn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#D9D9D9',
		borderRadius: '5px',
		border: '1px solid rgba(0,0,0,0.2)',
		padding: '4px 8px',
		width: '60%'
	}
}));

const formStyles = {
	form: {'background-color':'#FFF','box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.15)','border-radius': '4px'},
	input: {border: '1px solid #D9D9D9', 'height':'40px','padding-left':'0.3em'},
	submit: {'color':'white','background-color': '#F5222D', 'border-radius':'4px',padding: '8px 16px',}
}


const ProjectForm = ({project}) => {
	const newId = useSelector(state => state.project.projects.length);
	const dispatch = useDispatch();
	const [isNew, setIsNew] = useState(true);
	const [validationError, setError] = useState();
	const [modalOpen, setModalOpen] = useState(false);

	const history = useHistory();
	
	const modalStyles = useStyles();

	//validation
	const projectSchema = yup.object().shape({
	  name: yup.string().min(3).required(),
	  description: yup.string().min(10).required(),
	  manager: yup.string().required(),
	  assignedTo: yup.string().required(),
	  status: yup.string().required(),
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const formProject = {
			id: project.id || newId,
			name: e.target.elements['name'].value,
			description: e.target.elements['description'].value,
			manager: e.target.elements['manager'].value,
		  assignedTo: e.target.elements['assignedTo'].value,
		  status: e.target.elements['status'].value,
		  createdAt: project.createdAt,
		}

		projectSchema.validate(formProject)
			.then(valid => {
				if(isNew) {
					dispatch(addProject(formProject))
					setModalOpen(true);
				} else {
					dispatch(editProject(formProject));
					setModalOpen(true);
				}
				
			})
			.catch(err => {
				console.log(err)
				setError(err);
			});
	}

	//modal open-close
	const modalToggle = () => {
		setModalOpen(!modalOpen)
		history.goBack();
	}

	useEffect(() => {
		if(project.name !== ''){
			setIsNew(false);
		}
	}, [isNew, project.name]);

	return (
		<>
		<Grid container justify="center" className="mt-4">

	<form onSubmit={handleSubmit} className="text-left w-full md:m-4 md:w-3/5" style={formStyles.form}>
			
			{ validationError ? 
				<>
					<span className="rounded bg-red-500 p-2 flex justify-center capitalize">
						{ validationError.message }
					</span>
				</> 
			
			: null }

			<div>
			<label className="font-medium" htmlFor="name">Project Name</label>
			<input 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="name" 
				name="name" 
				type='text' 
				placeholder='Proyect Name' 
				defaultValue={project.name} required/>
				
			</div>
			
			
			<div>
				<label className="font-medium mt-4" htmlFor="description">Description</label> 
				<input 
					className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
					style={formStyles.input} 
					id="description" 
					name="description" 
					type='text' 
					placeholder='Project description' 
					defaultValue={project.description} required/>
					
			</div>
				
				
				<div>
			<label className="font-medium mt-4" htmlFor="manager">Project Manager</label>
			<select 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="manager" 
				name="manager" 
				placeholder="Select a person" 				
				defaultValue={project.project_manager} required>

					<option value="Fulanito deTal">Fulanito deTal</option>
					<option value='Walt Cosani'>Walt Cosani</option>

			</select>
			
			</div>
			
			
			<div>
			<label className="font-medium mt-4" htmlFor="assignedTo">Assigned To</label>
			<select 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="assignedTo"
				name="assignedTo" 
				placeholder="Select a person" 
				defaultValue={project.assigned_to} required>

				<option value='Ignacio Truffa'>Ignacio Truffa</option>
				<option value='Ernestina Golik'>Ernestina Golik</option>

			</select>
			
			</div>
			
			
			<div>
			<label className="font-medium mt-4" htmlFor="status">Status</label>
			<select 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="status" name="status" 
				
				defaultValue={project.status}>

					<option value="Enabled">Enabled</option>
					<option value="Paused">Paused</option>
					<option value='Done'>Done</option>
					<option value='Cancelled'>Cancelled</option>
			</select>
			
			</div>
			

			<button type="submit" 
				className="mb-2" 
				style={formStyles.submit}
			>
				{ isNew ? 'Create project' : 'Save changes' }
			</button>
			
			</form>

			<Modal
			  open={modalOpen}
			  onClose={modalToggle}
			>
				<div className={modalStyles.modal} >
			  	<h3 className={modalStyles.title}>Project { isNew ? 'Created' : 'Updated'} </h3>
			  	<button className={modalStyles.btn} onClick={modalToggle}>OK</button>
			  </div>
			</Modal>


		</Grid>
		</>
		)
};

export default ProjectForm;