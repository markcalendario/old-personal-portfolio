import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryNavbar } from '../Shards/Navbar';
import { FullPageLoader } from '../Shards/Loaders';
import { TechTag } from '../Shards/TechTag';
import Tilt from 'react-parallax-tilt';
import { Container, Section, Wrapper } from '../Shards/Base';
import { useParams } from 'react-router-dom';

function ViewSingleProjectPage() {
	const [projectInformation, setProjectInformation] = useState(null);
	const { projectId } = useParams()

	const fetchProjectInformation = useCallback(() => {
		let options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch(
			process.env.REACT_APP_API_URL + '/projects/project-info/' + projectId,
			options
		)
			.then((result) => {
				if (!result.ok) {
					window.location.href = `/${result.status}`;
				}
				return result.json();
			})
			.then((result) => {
				setProjectInformation(result.data);
			});
	}, [projectId]);

	useEffect(() => {
		document.title = 'Fetching project info...';
		fetchProjectInformation();
	}, [fetchProjectInformation]);

	useEffect(() => {
		if (projectInformation !== null) {
			document.title =
				projectInformation.projectShortName + ' Project | Mark Kenneth Calendario';
		}
	}, [projectInformation]);

	return (
		<React.Fragment>
			<PrimaryNavbar />
			{projectInformation === null ? (
				<FullPageLoader />
			) : (
				<React.Fragment>
					<ProjectBanner
						projectImageID={projectInformation.projectImage}
						projectShortName={projectInformation.projectShortName}
						projectFullname={projectInformation.projectFullname}
						projectTags={projectInformation.technologies}
					/>
					<ProjectDocumentation htmlDocumentation={projectInformation.projectHtml} />
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

function ProjectBanner(props) {
	const displayTechTags = () => {
		return props.projectTags.map((value) => <TechTag key={value} label={value.toUpperCase()} />);
	};

	return (
		<section id='project-banner' className='banner'>
			<div className='container'>
				<div className='front-text-graphic'>
					<h1 className='display-2'>PROJECT</h1>
					<h1 className='display-2'>{props.projectShortName}</h1>
				</div>
				<div className='wrapper'>
					<figure>
						<Tilt
							className='proj-card'
							tiltReverse={true}
							perspective={1000}
							gyroscope={false}
							tiltMaxAngleX={20}
							tiltMaxAngleY={20}
						>
							<img
								src={
									process.env.REACT_APP_API_URL +
									'/projects/project-photo/' +
									props.projectImageID
								}
								alt={props.projectImageID}
							/>
						</Tilt>
					</figure>
					<div className='texter'>
						<h1 className='display-1'>{props.projectShortName}</h1>
						<p>{props.projectFullname}</p>
						<div className='project-technologies'>{displayTechTags()}</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProjectDocumentation(props) {
	return (
		<Section id='project-documentation'>
			<Container>
				<Wrapper>
					<div dangerouslySetInnerHTML={{ __html: props.htmlDocumentation }}></div>
				</Wrapper>
			</Container>
		</Section>
	);
}

export default ViewSingleProjectPage;
