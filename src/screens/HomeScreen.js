import Header from '../components/Header/Header';
import ProjectsList from '../components/ProjectsList/ProjectsList';

export const HomeScreen = () => {
	return (
		<>
			<Header title={'My Proyects'} isHome={true}/>
			<ProjectsList />
		</>
	)
};

export default HomeScreen;