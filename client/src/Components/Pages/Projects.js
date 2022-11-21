import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PrimaryNavbar } from '../Shards/Navbar';
import { Project } from '../Shards/Projects';
import { ProjectLoader } from '../Shards/Loaders';
import { Button } from '../Shards/Buttons';
import { RequestProjectModal } from '../Shards/Modals';
import { isUserAlreadySubmittedRequest } from '../../Functions/user-local-data';
import Footer from '../Shards/Footer';
import NotFoundIllustration from '../../Images/error/404.svg';
import Projects from '../../Functions/projects';
const projects = new Projects()

export default function ProjectPage() {
	const { technologyFilter } = useParams()
	document.title = `${technologyFilter.toUpperCase()} Projects | Mark Kenneth Calendario`;

	return (
		<Fragment>
			<PrimaryNavbar />
			<ProjectPageFront />
			<MainProjectPage />
			<Footer />
		</Fragment>
	);
}

function ProjectPageFront() {
	const [isRequestProjectModalShown, setIsRequestProjectModalShown] = useState(false)

	const changeModalVisibilityState = () => {
		setIsRequestProjectModalShown(prev => !prev)
	}

	const getRequestButton = () => {
		if (process.env.REACT_APP_IS_PROJECT_REQUEST_ALLOWED === 'false') {
			return (
				<Button pigment={'solid-primary-btn'}>
					Project request is not allowed at this time.
				</Button>
			);
		}

		if (isUserAlreadySubmittedRequest()) {
			return (
				<Button pigment='solid-stable-btn' click={changeModalVisibilityState}>
					Let's go! 🤩
				</Button>
			);
		}

		return (
			<Button pigment='liquid-stable-btn'>
				Your ☕ is being prepared. Wait for me to serve it.
			</Button>
		);
	};

	return (
		<Fragment>
			{
				isRequestProjectModalShown
					? <RequestProjectModal triggerVisibility={changeModalVisibilityState} />
					: null
			}
			<section id='project-topper' className='banner'>
				<div className='container'>
					<div className='wrapper'>
						<div className='text'>
							<h1>Start your projects with me.</h1>
							<p>
								Do you want a partner in coding? Or someone who will help you to develop
								your projects? Or a web development tutor? Click the button below.
							</p>
							<div className='topper-buttons'>{getRequestButton()}</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);

}

function MainProjectPage() {
	return (
		<section id='main-project-page'>
			<div className='container'>
				<div className='wrapper'>
					<ProjectNavigator />
					<ProjectList />
				</div>
			</div>
		</section>
	);
}

function ProjectNavigator() {
	const [isTechnologiesChoicesOpen, setIsTechnologiesChoicesOpen] = useState(true)
	const [technologyOptions, setTechnologyOptions] = useState(null)

	function handleTechnologyChoicesState() {
		setIsTechnologiesChoicesOpen(prev => !prev)
	}

	function displayOptions() {
		if (technologyOptions === null) return <a href='/projects/#loading'>Loading...</a>
		return technologyOptions.map(element => (
			<a key={element} href={`/projects/${element}`}>{element.toUpperCase()}</a>
		));
	}

	const fetchTechnologyOptions = useCallback(async () => {
		await projects.fetchProjects()
		setTechnologyOptions(projects.getTechnologyOptions())
	}, [])

	useEffect(() => {
		fetchTechnologyOptions()
	}, [fetchTechnologyOptions])

	return (
		<div className='projects-navigator'>
			<div className='project-lang-choices'>
				<div className='title' onClick={handleTechnologyChoicesState}>
					<h4>Choose a Technology</h4>
				</div>
				<div className={'technologies ' + (isTechnologiesChoicesOpen ? 'technologies-open' : 'technologies-close')}>
					<a href='/projects/all'>Show All</a>
					{displayOptions()}
				</div>
			</div>
		</div>
	);
}

function ProjectList() {
	const [projectsData, setProjectsData] = useState(null);

	const fetchProjects = useCallback(async () => {
		await projects.fetchProjects()
		setProjectsData(projects.getAllTechnologies())
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const displayProjectList = () => {
		if (projectsData.length === 0)
			return <NoProjectsFound />;

		return projectsData.map((data) => (
			<div key={data.id} className='project-wrapper'>
				<Project data={data} />
			</div>
		));
	};

	return (
		<>
			<div id='project-list'>
				<div className='topper'>
					<h1>Project List</h1>
					<p>
						{projectsData !== null ? projectsData.length : null}
						{projectsData !== null ? (projectsData.length > 1 ? 'results' : 'result') : null}
					</p>
				</div>

				{projectsData === null ? <ProjectLoader /> : displayProjectList()}
			</div>
		</>
	);
}

function NoProjectsFound() {
	const { technologyFilter } = useParams();

	return (
		<div id='no-projects-found'>
			<div className='npf-wrapper'>
				<figure>
					<img src={NotFoundIllustration} alt='Projects found' />
				</figure>
				<h3>{`{ status: 404, message: "No ${technologyFilter} projects found. 😴"}`}</h3>
			</div>
		</div>
	);
}
