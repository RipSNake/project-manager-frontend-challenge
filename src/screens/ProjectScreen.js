import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header/Header';
import ProjectForm from '../components/ProjectForm/ProjectForm';

export const ProjectScreen = () => {
	const [project, setProject] = useState({name:'',description:'',manager:'',assignedTo:'',status:''});
	const [title, setTitle] = useState('Create Project');
	const location = useLocation();

	useEffect(() => {
		if(location.state){
			setProject(location.state.project);
			setTitle('Edit Project');
		}
	}, [location]);

	return (
		<>
			<Header title={title}/>
			<ProjectForm project={project}/>
		</>
	)
};

export default ProjectScreen;