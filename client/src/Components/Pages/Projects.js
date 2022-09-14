import React, { Component, Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PrimaryNavbar } from '../Shards/Navbar';
import { Project } from '../Shards/Projects';
import { ProjectLoader } from '../Shards/Loaders';

import { RequestProjectModal } from '../Shards/Modals';
import { isUserAlreadySubmittedRequest } from '../../Functions/user-local-data';
import Footer from '../Shards/Footer';

import NotFoundIllustration from '../../Images/error/404.svg';

import {
	faCss3Alt,
	faHtml5,
	faJs,
	faNodeJs,
	faPhp,
	faReact,
	faSass,
} from '@fortawesome/free-brands-svg-icons';
import { faCode, faFish, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Shards/Buttons';
import technologiesList from '../../Functions/technologies-list';

export default function ProjectPage() {
	const { technologyFilter } = useParams();
	document.title = `Projects | Mark Kenneth Calendario`;

	return (
		<Fragment>
			<PrimaryNavbar />
			<ProjectPageFront />
			<MainProjectPage technologyFilter={technologyFilter} />
			<Footer />
		</Fragment>
	);
}

class ProjectPageFront extends Component {
	state = {
		isRequestProjectModalShown: false,
	};

	changeModalVisibilityState = () => {
		this.setState({ isRequestProjectModalShown: !this.state.isRequestProjectModalShown });
	};

	getRequestButton = () => {
		if (process.env.REACT_APP_IS_PROJECT_REQUEST_ALLOWED !== 'false') {
			return (
				<Button pigment={'solid-primary-btn'}>
					Sorry, project request is not allowed at this time.
				</Button>
			);
		}

		if (isUserAlreadySubmittedRequest()) {
			return (
				<Button pigment='solid-stable-btn' click={this.changeModalVisibilityState}>
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

	render() {
		return (
			<>
				{
					this.state.isRequestProjectModalShown
						? <RequestProjectModal triggerVisibility={this.changeModalVisibilityState} />
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
								<div className='topper-buttons'>{this.getRequestButton()}</div>
							</div>
						</div>
					</div>
					<div className='front-text-graphic'>
						<div>
							<h1 className='display-1'>Project</h1>
							<h1 className='display-1'>Project</h1>
						</div>
					</div>
				</section>
			</>
		);
	}
}

function MainProjectPage(props) {
	return (
		<section id='main-project-page'>
			<div className='container'>
				<div className='wrapper'>
					<ProjectNavigator />
					<ProjectList technologyFilter={props.technologyFilter} />
				</div>
			</div>
		</section>
	);
}

class ProjectNavigator extends Component {
	state = {
		isTechnologiesChoicesOpen: true,
	};

	handleTechnologyChoicesState = () => {
		this.state.isTechnologiesChoicesOpen
			? this.setState({ isTechnologiesChoicesOpen: false })
			: this.setState({ isTechnologiesChoicesOpen: true });
	};

	render() {
		return (
			<div className='projects-navigator'>
				<div className='project-lang-choices'>
					<div className='title' onClick={this.handleTechnologyChoicesState}>
						<h4>Choose a Technology</h4>
					</div>
					<div
						className={
							'technologies ' +
							(this.state.isTechnologiesChoicesOpen
								? 'technologies-open'
								: 'technologies-close')
						}
					>
						<Link to='/projects/all'>
							All <FontAwesomeIcon icon={faNodeJs} />
							<FontAwesomeIcon icon={faReact} />
							<FontAwesomeIcon icon={faCode} />
							<FontAwesomeIcon icon={faLeaf} />
							<FontAwesomeIcon icon={faPhp} />
							<FontAwesomeIcon icon={faNodeJs} />
							<FontAwesomeIcon icon={faHtml5} />
							<FontAwesomeIcon icon={faCss3Alt} />
							<FontAwesomeIcon icon={faSass} />
							<FontAwesomeIcon icon={faFish} />
						</Link>
						<Link to={`/projects/` + technologiesList.nodejs}>
							Node JS <FontAwesomeIcon icon={faNodeJs} />
						</Link>
						<Link to={'/projects/' + technologiesList.reactjs}>
							React JS <FontAwesomeIcon icon={faReact} />
						</Link>
						<Link to={'/projects/' + technologiesList.expressjs}>
							Express JS <FontAwesomeIcon icon={faCode} />
						</Link>
						<Link to={'/projects/' + technologiesList.mongodb}>
							Mongo DB <FontAwesomeIcon icon={faLeaf} />
						</Link>
						<Link to={'/projects/' + technologiesList.php}>
							PHP <FontAwesomeIcon icon={faPhp} />
						</Link>
						<Link to={'/projects/' + technologiesList.html}>
							HTML <FontAwesomeIcon icon={faHtml5} />
						</Link>
						<Link to={'/projects/' + technologiesList.css}>
							CSS / SASS <FontAwesomeIcon icon={faCss3Alt} />
							<FontAwesomeIcon icon={faSass} />
						</Link>
						<Link to={'/projects/' + technologiesList.javascript}>
							Javascript <FontAwesomeIcon icon={faJs} />
						</Link>
						<Link to={'/projects/' + technologiesList.mysql}>
							MySQL <FontAwesomeIcon icon={faFish} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

function ProjectList(props) {
	const [projects, setProjects] = useState(null);

	const fetchProjects = useCallback(() => {
		let options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch(process.env.REACT_APP_API_URL + '/projects/list/' + props.technologyFilter, options)
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				setProjects(result.data);
			});
	}, [props.technologyFilter]);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const displayProjectList = () => {
		if (projects.length === 0)
			return <NoProjectsFound technologyFilter={props.technologyFilter} />;

		return projects.map((data) => (
			<div key={data._id} className='project-wrapper'>
				<Project data={data} />
				{
					// ! IMPORTANT: This portion is intendedly blank for project details (date or whatsoever)
					// ? Use .project-details class with <div> to use it.
				}
			</div>
		));
	};

	return (
		<>
			<div id='project-list'>
				<div className='topper'>
					<h1>Project List</h1>
					<p>
						{projects !== null ? projects.length : null}{' '}
						{projects !== null ? (projects.length > 1 ? 'results' : 'result') : null}
					</p>
				</div>

				{projects === null ? <ProjectLoader /> : displayProjectList()}
			</div>
		</>
	);
}

class NoProjectsFound extends Component {
	render() {
		return (
			<div id='no-projects-found'>
				<div className='npf-wrapper'>
					<figure>
						<img src={NotFoundIllustration} alt='Projects found' />
					</figure>
					<h3>{`{ status: 404, message: "No ${this.props.technologyFilter} projects found. 😴"}`}</h3>
				</div>
			</div>
		);
	}
}
