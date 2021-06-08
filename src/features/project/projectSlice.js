import { createSlice } from '@reduxjs/toolkit';

const formatedDate = () => {
	let d = new Date();
	let day = d.getUTCDate();
	let month = d.getUTCMonth() + 1;
	let year = d.getUTCFullYear();
	let hr = d.getUTCHours();
	let min = d.getUTCMinutes();
	return `${day}/${month}/${year} ${hr}:${min}`;
}
export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		projects: [],
		status: 'idle'
	},
	// all reducers expect the payload element to be a project object
	reducers: {
		getProjects: (state, action) => {
			state.projects = state.projects.concat(action.payload);
			state.status = 'succeeded'
		},
		addProject: (state, action) => {	
			action.payload.createdAt = formatedDate();
			state.projects = state.projects.concat(action.payload);
		},
		editProject: (state, action) => {
			const index = state.projects.findIndex(
				project => project.id === action.payload.id
			)			
			state.projects = state.projects.filter(project => project.id !== action.payload.id);
			state.projects.splice(index, 0, action.payload);
		},
		deleteProject: (state, action) => {			
			state.projects = state.projects.filter(project => project.id !== action.payload.id);
		}
	}
});

export const { getProjects, addProject, editProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;