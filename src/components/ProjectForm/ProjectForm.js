import './ProjectForm.css';
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ModalBox from '../Modal/ModalBox';

import { useHistory } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject } from '../../features/project/projectSlice';
// validation library
import * as yup from 'yup';

//constants
import { 
	PROJECT_NAME_LABEL, PROJECT_NAME_PLACEHOLDER,
	PROJECT_DESCRIPTION_LABEL, PROJECT_DESCRIPTION_PLACEHOLDER,
	PROJECT_MANAGER_LABEL,
	PROJECT_ASSIGNEDTO_LABEL,
	PROJECT_STATUS_LABEL,
	PROJECT_CREATED_TITLE, PROJECT_CREATED_MESSAGE,
	PROJECT_EDITED_TITLE, PROJECT_EDITED_MESSAGE,
} from '../../constants';

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
	const [modal, setModal] = useState(null);

	const history = useHistory();

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
					setModal(<ModalBox title={PROJECT_CREATED_TITLE} message={PROJECT_CREATED_MESSAGE} acceptFn={() => dispatch(addProject(formProject))} setModal={setModal} history={history}/>)
				} else {
					setModal(<ModalBox title={PROJECT_EDITED_TITLE} message={PROJECT_EDITED_MESSAGE} acceptFn={() => dispatch(editProject(formProject))} setModal={setModal} history={history}/>)
				}
				
			})
			.catch(err => {
				console.log(err)
				setError(err);
			});
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
			<label className="font-medium" htmlFor="name">{PROJECT_NAME_LABEL}</label>
			<input 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="name" 
				name="name" 
				type='text' 
				placeholder={PROJECT_NAME_PLACEHOLDER} 
				defaultValue={project.name} required/>
				
			</div>
			
			
			<div>
				<label className="font-medium mt-4" htmlFor="description">{PROJECT_DESCRIPTION_LABEL}</label> 
				<input 
					className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
					style={formStyles.input} 
					id="description" 
					name="description" 
					type='text' 
					placeholder={PROJECT_DESCRIPTION_PLACEHOLDER} 
					defaultValue={project.description} required/>
					
			</div>
				
				
				<div>
			<label className="font-medium mt-4" htmlFor="manager">{PROJECT_MANAGER_LABEL}</label>
			<select 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="manager" 
				name="manager" 
				defaultValue={project.project_manager} required>

					<option value="Fulanito deTal">Fulanito deTal</option>
					<option value='Walt Cosani'>Walt Cosani</option>

			</select>
			
			</div>
			
			
			<div>
			<label className="font-medium mt-4" htmlFor="assignedTo">{PROJECT_ASSIGNEDTO_LABEL}</label>
			<select 
				className="w-full mt-1 mb-4 md:mb-4 rounded-md shadow-sm" 
				style={formStyles.input} 
				id="assignedTo"
				name="assignedTo" 
				defaultValue={project.assigned_to} required>

				<option value='Ignacio Truffa'>Ignacio Truffa</option>
				<option value='Ernestina Golik'>Ernestina Golik</option>

			</select>
			
			</div>
			
			
			<div>
			<label className="font-medium mt-4" htmlFor="status">{PROJECT_STATUS_LABEL}</label>
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

			{modal}
			
		</Grid>
		</>
		)
};

export default ProjectForm;