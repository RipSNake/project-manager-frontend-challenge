import './ProjectsList.css';
import { useEffect } from 'react';
import { Table, Grid } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../features/project/projectSlice';

// mock up projects
import fake from '../../features/project/projectMockUps';
import logo from '../../logo.svg';

import IndividualMenu from '../IndividualMenu/IndividualMenu';

// styles
const styles = {
	tableStyles: {'box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.15)','border-radius': '4px'},
	tHead: {'background-color':'rgba(0,0,0,0.02)','height':'4em'},
	firstTh: {'text-align':'left','padding-left':'2em'},
	bodyTr: {'min-height': '4em', padding: '0.5em'},
	td1: {'height':'5em','text-align':'left','padding-left':'1em'},
	td2: {'height':'2.5em','width':'2.5em', 'display':'inline','border-radius':'50%','border':'1px solid rgba(40,40,40,.3)','margin-right':'0.5em'},
	td3: {'height':'2.5em','width':'2.5em', 'display':'inline','border-radius':'50%','border':'1px solid rgba(40,40,40,.3)','margin-right':'0.5em'},
}


const ProjectsList = () => {
	const list = useSelector(state => state.project.projects);
	const dispatch = useDispatch();

	const listState = useSelector(state => state.project.status);	

	useEffect(() => {
		if(listState === 'idle')
			dispatch(getProjects(fake));
	}, [listState, dispatch])

	return (
		<main className="md:w-4/5 mx-auto mb-2">
				<Grid
					justify='flex-start'
					className="project-list"
				>
					<Table style={styles.tableStyles}>
						<thead style={styles.tHead} className="hidden md:table-header-group">
							<tr style={{height: 'inherit'}}>
								<th style={styles.firstTh}>Project Info</th>
								<th>Project Manager</th>
								<th>Assigned To</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
		
		{ list.map( item => {
			return (
					<tr style={styles.bodyTr} className="grid grid-rows-2 grid-cols-5 md:table-row project-item">
				
						<td className="row-span-1 col-span-4" style={styles.td1}>{item.name} <br/><span style={{'font-size': '0.9em',color: 'rgba(0, 0, 0, 0.45)'}}>{item.createdAt}</span></td>						
						<td className="hidden md:table-cell"><img src={logo} alt='Profile Img' title={`${item.manager}'s photo`} style={styles.td2} />{item.manager}</td>
						<td className="row-span-1 row-start-2 col-span-4 justify-self-start"><img src={logo} alt='Profile Img' title={`${item.assignedTo}'s photo`} style={styles.td3} />{item.assignedTo}</td>
						<td className="hidden md:table-cell"><span className='bg-gray-300 rounded p-1 text-sm'>{item.status}</span></td>
						<td className="row-span-1 col-span-1">
							<IndividualMenu item={item} />
						</td>
					
					</tr>
			)
		})}
						</tbody>
					</Table>
				</Grid>
		</main>
	)
}

export default ProjectsList;