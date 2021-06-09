import { useState } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { deleteProject } from '../../features/project/projectSlice';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

import ModalBox from '../Modal/ModalBox';

export const IndividualMenu = ({item}) => {
	const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
	const dispatch = useDispatch();
	const [modal, setModal] = useState(null);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	const handleDelete = () => {
		setModal(<ModalBox 
			title={'Eliminar Proyecto'} 
			message={'Quiere eliminar el Proyecto?'} 
			acceptFn={() => dispatch(deleteProject(item))} 
			cancelFn={() => false} 
			setModal={setModal}
		/>)
		handleClose();
	}

	return (
		<>
		<Button aria-controls={`menu-${item.name}`} aria-haspopup='true' onClick={handleClick}>
			<MoreVertIcon />
		</Button>
		<Menu
			id={`menu-${item.name}`}
			anchorEl={anchorEl}
			keepMounted
			open={open}
			onClose={handleClose}
		>
			<MenuItem >
				<Link style={{textDecoration: 'none'}} to={{pathname:'/edit',state:{project: item}}}>
					<EditIcon />Edit {item.name}
				</Link>
			</MenuItem>
			
			<MenuItem onClick={handleDelete}>
				<DeleteOutlineIcon />Delete
			</MenuItem>
		</Menu>
		{modal}
		</>
	)
}


export default IndividualMenu;