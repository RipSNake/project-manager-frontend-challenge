import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import './Header.css';

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';

import { Link, useHistory } from 'react-router-dom';

import logo from '../../logo.svg';

const Header = ({title, isHome}) => {
	const [justify, setJustify] = useState('space-between');
	let history = useHistory();

	useEffect(() => {
		if(!isHome){
			setJustify('flex-start');
		}
	}, [justify, isHome]);

	return (
		<header>
		
			<Grid
	  container
	  direction="row"
	  justify="flex-start"
	  alignItems="flex-start"
	  className="logo-div"
	>
				<img src={logo} className="h-full" title="Logo" alt="Project Manager Logo" />
			</Grid>
			
			<Grid
	  container
	  direction="row"
	  justify={justify}
	  alignItems="center"
	  className='title-div text-blue'
	>
			{ isHome ? <></> : 
				
				<button className='mr-2' onClick={() => history.goBack()}><ArrowBackIcon />Go Back</button>
				
			}

				<h1>{title}</h1>
			{
				isHome ?
				<button className='btn'><Link to="/new"><AddIcon />Add Project</Link></button>
				:
				<></>
			}
			
			</Grid>
			
		</header>
	)
}

export default Header;