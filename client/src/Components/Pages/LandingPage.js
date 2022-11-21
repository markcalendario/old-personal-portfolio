import { Fragment, useCallback, useEffect, useState } from 'react';
import Footer from '../Shards/Footer';
import { Section, Container, Wrapper } from '../Shards/Base';
import { Button, IconButton, LinkButton } from '../Shards/Buttons';
import { PrimaryNavbar, SecondaryNavbar } from '../Shards/Navbar';
import { ProjectLoader, FeaturedProjectLoader } from '../Shards/Loaders';
import { RequestProjectModal } from '../Shards/Modals';
import { isUserAlreadySubmittedRequest } from '../../Functions/user-local-data';
import { Project } from '../Shards/Projects';
import { Timeline, TimelineEvent, TimelineEventDetails } from '../Shards/Timeline';

import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faGithubAlt,
	faInstagram,
	faReact,
} from '@fortawesome/free-brands-svg-icons';

import {
	faCircle,
	faCode,
	faDatabase,
	faFire,
	faLightbulb,
	faPaintRoller,
	faRocket,
	faStar,
} from '@fortawesome/free-solid-svg-icons';

import AboutMeImage from '../../Images/landingpage/Mark Kenneth Graphic - About.png';
import glow from '../../Images/landingpage/Glow.png';
import PartnerGraphic from '../../Images/landingpage/partner.svg';
import FrontEndGraphic from '../../Images/landingpage/web-design.gif';
import BackEndGraphic from '../../Images/landingpage/back-end.gif';
import DatabaseGraphic from '../../Images/landingpage/database-management.gif';

import ReactIcon from '../../Images/techicons/react.png'
import MongoDbIcon from '../../Images/techicons/mongodb.png'
import NodeJs from '../../Images/techicons/nodejs.png'
import ExpressJs from '../../Images/techicons/expressjs.png'
import PM2 from '../../Images/techicons/pm2.png'
import Ubuntu from '../../Images/techicons/ubuntu.png'
import Nginx from '../../Images/techicons/nginx.png'
import Sass from '../../Images/techicons/sass.png'
import Postman from '../../Images/techicons/postman.png'
import Windows from '../../Images/techicons/windows.png'
import VSCode from '../../Images/techicons/vscode.png'
import Firebase from '../../Images/techicons/firebase.png'

import Projects from '../../Functions/projects'
const projects = new Projects()

export default function LandingPage() {
	return (
		<Fragment>
			<PrimaryNavbar />
			<Front />
			<QuickOverview />
			<SecondaryNavbar />
			<About />
			<Expertise />
			<EducationAndExperience />
			<FeaturedProjects />
			<Services />
			<RequestProjectPage />
			<Footer />
		</Fragment>
	);
}

function Front() {
	return (
		<Fragment>
			<Section id='landing-page'>
				<Container>
					<Wrapper>
						<div className='wrapper'>
							<Typewriter
								options={{
									loop: false,
									delay: 25,
									deleteSpeed: 25,
									wrapperClassName: 'type-effect',
									cursorClassName: 'type-effect-cursor',
								}}
								onInit={(typewriter) => {
									typewriter
										.pauseFor(200)
										.typeString('<p> Hello there,</p>')
										.pauseFor(500)
										.typeString(`<br>`)
										.typeString(`<h1 class="display-1"> I'm Mark Kenneth </h1>`)
										.pauseFor(1000)
										.typeString(`<br>`)
										.typeString(
											`<p> a <strong> full-stack web developer. <strong></p>`
										)
										.start();
								}}
							/>

							<LinkButton pigment='solid-stable-btn'>
								<a href='/projects'> View my projects </a>
							</LinkButton>

							<div className='contacts'>
								<IconButton href='https://www.github.com/markcalendario'>
									<FontAwesomeIcon icon={faGithubAlt} />
								</IconButton>

								<IconButton href='https://www.facebook.com/markcalendario'>
									<FontAwesomeIcon icon={faFacebook} />
								</IconButton>

								<IconButton href='https://instagram.com/_markcalendario'>
									<FontAwesomeIcon icon={faInstagram} />
								</IconButton>
							</div>
						</div>
					</Wrapper>
				</Container>
			</Section>
		</Fragment>
	);
}

function QuickOverview() {
	const [latestProject, setLatestProject] = useState(null)

	const initializeLatestProject = useCallback(async () => {
		await projects.fetchProjects()
		setLatestProject(projects.getLatestProject())
	}, [])

	useEffect(() => {
		initializeLatestProject()
	}, [initializeLatestProject])

	return (
		<Section id='quick-overview'>
			<Container>
				<Wrapper>
					<div className='box'>
						<div className='left'>
							<h3>Quick Overview</h3>

							<div className='overview'>
								<div className='overview-info'>
									<div className="oi-icon">
										<FontAwesomeIcon icon={faRocket} />
									</div>
									<p className="oi-text">
										Built 6 Web Projects Since 2020
									</p>
								</div>
								<div className='overview-info'>
									<div className="oi-icon">
										<FontAwesomeIcon icon={faStar} />
									</div>
									<p className="oi-text">
										Computer Science Student at PUP
									</p>
								</div>
								<div className='overview-info'>
									<div className="oi-icon">
										<FontAwesomeIcon icon={faFire} />
									</div>
									<p className="oi-text">
										Aspiring Fullstack Web Developer.
									</p>
								</div>
								<div className='overview-info'>
									<div className="oi-icon">
										<FontAwesomeIcon icon={faLightbulb} />
									</div>
									<p className="oi-text">
										Gaining Experience in Freelancing
									</p>
								</div>
								<div className='overview-info'>
									<div className="oi-icon">
										<FontAwesomeIcon icon={faReact} />
									</div>
									<p className="oi-text">
										MERN is My Technology Stack
									</p>
								</div>
							</div>
						</div>
						<div className='right'>
							<h3>Latest Project</h3>
							<div className='content'>
								{latestProject !== null ? (
									<Project key={latestProject.id} data={latestProject} />
								) : (
									<ProjectLoader />
								)}
							</div>
						</div>
					</div>
				</Wrapper>
			</Container>
		</Section>
	);
}

function About() {
	const [age, setAge] = useState(0);

	const getAge = useCallback(() => {
		const currentDate = new Date();
		const birthDate = new Date('October 19, 2002');

		let age = currentDate.getFullYear() - birthDate.getFullYear();

		const isMonthBeforeBirthday = birthDate.getMonth() > currentDate.getMonth();
		const isDayBeforeBirthday = birthDate.getDate() > currentDate.getDate();

		if (isMonthBeforeBirthday || (isMonthBeforeBirthday && isDayBeforeBirthday)) {
			setAge(--age);
		} else {
			setAge(age);
		}
	}, []);

	const applyParallaxEffect = useCallback(() => {
		let graphic = document.getElementById('graphic');
		let parallaxOffset = 'unset';

		// Apply parallax effect only on wider screens
		if (window.innerWidth >= 768) {
			parallaxOffset = `translateY(${(-window.scrollY / window.innerHeight) * 100 + 200}px)`;
		}

		graphic.style.transform = parallaxOffset;
	}, []);

	useEffect(() => {
		getAge();
		window.addEventListener('scroll', applyParallaxEffect, false);

		return () => window.removeEventListener('scroll', applyParallaxEffect, false);
	}, [getAge, applyParallaxEffect]);

	return (
		<Section id='about'>
			<Container>
				<Wrapper>
					<div className='about-intro'>
						<figure className='left'>
							<img id='graphic' src={AboutMeImage} alt='Mark Kenneth Graphics on About' />
						</figure>

						<div className='right'>
							<h1 className='display-1'>Who am I</h1>
							<p>
								I am Mark Kenneth S. Calendario, {age} years old, first year computer
								science student at Polytechnic University of the Philippines.
							</p>

							<p>
								My curiosity in technologies pushed me to choose Information and
								Communications Technology at Arellano University Jose Rizal High School to
								be my SHS strand. I have learned different programming languages and
								technologies such as Java, C, and VB.Net for Software Development while PHP,
								HTML, CSS, and MySQL. Fortunately, I have graduated from Senior High School
								with High Honor awards, and I became Rank 1 in ICT.
							</p>
						</div>
					</div>

					<div className='about-goal'>
						<div className='left'>
							<div className='terminal'>
								<div className='terminal-controls'>
									<FontAwesomeIcon className='red' icon={faCircle} />
									<FontAwesomeIcon className='white' icon={faCircle} />
									<FontAwesomeIcon className='green' icon={faCircle} />
								</div>

								<Typewriter
									options={{
										loop: true,
										delay: 40,
										deleteSpeed: 0,
										wrapperClassName: 'type-effect',
										cursorClassName: 'type-effect-cursor',
										cursor: '█',
									}}
									onInit={(typewriter) => {
										typewriter
											.typeString(
												`<code> <span class="yellow"> life </span> install <span class="blue"> hope <span> </code>`
											)
											.pauseFor(100)
											.typeString(
												`<code> <span class="green"> determination <span> </code>`
											)
											.pauseFor(1000)
											.pasteString(`<br/>`)
											.pasteString(`<br/> <code>➞ Loading... </code>`)
											.typeString(`<br/> <code>████████</code>`)
											.pauseFor(500)
											.typeString(`<code>██████ 100%</code>`)
											.pasteString(`<br/>`)
											.pasteString(
												`<br/> <code>➞ You have installed hope and determination in your life. Continuing progress... </code>`
											)
											.pasteString(`<br/>`)
											.typeString(`<br/> <code>██████████████ 100% </code>`)
											.pasteString(`<br/>`)
											.pasteString(
												`<br/> <code class="green">➞ Success! You made it into your goals!</code>`
											)
											.pauseFor(5000)
											.start();
									}}
								/>
							</div>
							<img className='glow' src={glow} alt='Glow' />
						</div>

						<div className='right'>
							<h1 className='display-1'>What's my goal</h1>
							<p>
								I see myself working with people who develop and innovate web applications
								that could help other people in their daily lives. As an aspiring full-stack
								web developer, I never stop practicing my skills and widening my knowledge
								on learning different programming languages because technology never stops
								growing.
							</p>
						</div>
					</div>
				</Wrapper>
			</Container>
		</Section>
	);
}

function Expertise() {
	return (
		<Section id='expertise'>
			<div className="expertise-triangle-top">
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
				</svg>
			</div>
			<Container>
				<Wrapper>
					<div className="expertise-topper">
						<h1 className='display-1 title'>My Tech Stacks</h1>
						<p>Technology stacks that I am currently working on.</p>
					</div>
					<div className="tech-group">
						<h2 className='tech-group-title'>Web Development Stack</h2>
						<div className="tech-list">
							<div className="tech-block">
								<div className="tech-image">
									<img src={ReactIcon} alt="React JS" />
								</div>
								<div className="tech-block-texts">
									<h3>React JS</h3>
									<p>Client Side</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={ExpressJs} alt="Express JS" />
								</div>
								<div className="tech-block-texts">
									<h3>Express JS</h3>
									<p>Server Side</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={MongoDbIcon} alt="Mongo DB" />
								</div>
								<div className="tech-block-texts">
									<h3>Mongo DB</h3>
									<p>No-SQL Database</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={NodeJs} alt="Node JS" />
								</div>
								<div className="tech-block-texts">
									<h3>Node JS</h3>
									<p>Server Environment</p>
								</div>
							</div>
						</div>
					</div>
					<div className="tech-group">
						<h2 className='tech-group-title'>Other Development Tools</h2>
						<div className="tech-list">
							<div className="tech-block">
								<div className="tech-image">
									<img src={Sass} alt="Sass" />
								</div>
								<div className="tech-block-texts">
									<h3>SASS</h3>
									<p>CSS Preprocessor</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={Postman} alt="Postman" />
								</div>
								<div className="tech-block-texts">
									<h3>Postman</h3>
									<p>API Testing</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={Windows} alt="Windows" />
								</div>
								<div className="tech-block-texts">
									<h3>Windows</h3>
									<p>Operating System</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={VSCode} alt="VSCode" />
								</div>
								<div className="tech-block-texts">
									<h3>VSCode</h3>
									<p>Code Editor</p>
								</div>
							</div>
						</div>
					</div>
					<div className="tech-group">
						<h2 className='tech-group-title'>Deployment</h2>
						<div className="tech-list">
							<div className="tech-block">
								<div className="tech-image">
									<img src={Nginx} alt="NGINX" />
								</div>
								<div className="tech-block-texts">
									<h3>NGINX</h3>
									<p>Web Server</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={Ubuntu} alt="Ubuntu" />
								</div>
								<div className="tech-block-texts">
									<h3>Ubuntu</h3>
									<p>Operating System</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={PM2} alt="PM2" />
								</div>
								<div className="tech-block-texts">
									<h3>PM2</h3>
									<p>Node Process Manager</p>
								</div>
							</div>
							<div className="tech-block">
								<div className="tech-image">
									<img src={Firebase} alt="Firebase" />
								</div>
								<div className="tech-block-texts">
									<h3>Firebase</h3>
									<p>Only for Static Web Deployment</p>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			</Container>
		</Section >

	)
}

function FeaturedProjects() {
	const [featuredProjects, setFeaturedProjects] = useState(null)

	const initializeFeaturedProjectsData = useCallback(async () => {
		await projects.fetchProjects()
		setFeaturedProjects(projects.getFeaturedProject())
	}, [])

	useEffect(() => {
		initializeFeaturedProjectsData()
	}, [initializeFeaturedProjectsData])

	const displayFeaturedProjects = () => {
		return featuredProjects.map((data) => <Project key={data.id} data={data} />);
	};

	return (
		<Section id='featured-projects'>
			<Container>
				<Wrapper>
					<div className='texters'>
						<h1 className='display-1'>Featured Projects</h1>
						<p>
							These are my featured projects, you can view all of my projects by clicking{' '}
							<a href='/projects'>this link.</a>
						</p>
						<p>
							As an aspiring fullstack developer, I am considering this as my success and a
							steping stone to achieve my goals.
						</p>

						<LinkButton pigment='solid-stable-btn'>
							<a href='/projects'> View my projects </a>
						</LinkButton>
					</div>

					<div className='projects'>
						{featuredProjects !== null ? (
							displayFeaturedProjects()
						) : (
							<FeaturedProjectLoader />
						)}
					</div>
				</Wrapper>
			</Container>
		</Section>
	);
}

function Services() {

	return (
		<Section id='services'>
			<Container>
				<Wrapper>
					<h1 className='title display-1'>What do I do?</h1>

					<div className='flex'>
						<div className='text'>
							<h3 className='tooltip'>
								<FontAwesomeIcon icon={faPaintRoller} /> Web Designing / Front-End
								Development
								<span>part of website that user is working, a user interface</span>
							</h3>

							<p>
								I can do static modern website designs using HTML, CSS, Javascript and
								especially React Js.
							</p>
						</div>

						<figure>
							<img src={FrontEndGraphic} alt='Web Designing' />
						</figure>
					</div>
					<div className='flex invert'>
						<div className='text'>
							<h3 className='tooltip'>
								<FontAwesomeIcon icon={faCode}></FontAwesomeIcon> Back-end Programming
								<span>
									part of the website that users cannot see and interact with, this is
									where functions are implemented - geeksforgeeks.org
								</span>
							</h3>
							<p>I can do web pages dynamically by using PHP or Node Js and Express.</p>
						</div>

						<figure>
							<img src={BackEndGraphic} alt='Back-end Development' />
						</figure>
					</div>
					<div className='flex'>
						<div className='text'>
							<h3 className='tooltip'>
								<FontAwesomeIcon icon={faDatabase}></FontAwesomeIcon> Database Management
								<span>
									refers to the actions a business takes to manipulate and control data
									to meet necessary conditions throughout the entire data lifecycle
									-informatica.com
								</span>
							</h3>
							<p>
								I can do database management using two different methods, SQL and NoSQL.
								For SQL, I am using MySQL, on the other hand, I use MongoDB for NoSQL.
							</p>
						</div>

						<figure>
							<img src={DatabaseGraphic} alt='Database Management' />
						</figure>
					</div>
				</Wrapper>
			</Container>
		</Section>
	);
}

function EducationAndExperience() {
	return (
		<Section id='education-experience'>
			<Container>
				<Wrapper>
					<h1 className='topper-title display-1'>Timeline of Experience</h1>
					<Timeline>
						<TimelineEvent year="2022">
							<TimelineEventDetails title='Second Year College' />
						</TimelineEvent>
						<TimelineEvent year='2021'>
							<TimelineEventDetails title='Graduated Senior High School'>
								<h3>Awards</h3>
								<ul>
									<li>
										Best in Research in Information and Communications Technology
										<br />
										The Development of the{' '}
										<a href='/view-project/63217d369d010c6516005245'>
											Student Management System of Arellano University Jose Rizal High
											School
										</a>
									</li>
									<li>With High Honor</li>
									<li>ICT Rank 1</li>
									<li>Best in Work Immersion (ICT)</li>
								</ul>
							</TimelineEventDetails>
							<TimelineEventDetails title='Started Freelancing Activities'>
								Website Building using MERN Stack
							</TimelineEventDetails>
							<TimelineEventDetails title='Passed College Admission Evaluation of Polytechnic University of the Philippines'>
								<p>
									Bachelor of Science in <strong>Computer Science</strong>
								</p>
							</TimelineEventDetails>
							<TimelineEventDetails title='First Year College'>
								<p>Polytechnic University of the Philippines</p>
								<p>President's Lister</p>
							</TimelineEventDetails>
						</TimelineEvent>
						<TimelineEvent year='2019'>
							<TimelineEventDetails title='Finished Junior High School'>
								<h3>Awards</h3>
								<ul>
									<li>Mayor Joseph Ejercito Estrada Silver Award</li>
									<li>Student Exemplar Awardee</li>
									<li>Academic Honor Student (With Honor)</li>
									<li>Rank 6 overall (Grade 10)</li>
									<li>3rd in SineLiksik, Festival of Talents, Division Level</li>
									<li>8th Place in Eco-Video, Division Level</li>
								</ul>
							</TimelineEventDetails>
							<TimelineEventDetails title='Started Senior High School'>
								<p>Arellano University - Jose Rizal Campus</p>
							</TimelineEventDetails>
						</TimelineEvent>
						<TimelineEvent year='2016'>
							<TimelineEventDetails title='Graduated Elementary School'>
								Libis Talisay Elementary School
							</TimelineEventDetails>
							<TimelineEventDetails title='Started Junior High School'>
								Jose P. Laurel High School, Tondo, Manila
							</TimelineEventDetails>
						</TimelineEvent>
						<TimelineEvent year='2009'>
							<TimelineEventDetails title='Started Elementary School'>
								Libis Talisay Elementary School
							</TimelineEventDetails>
						</TimelineEvent>
					</Timeline>
				</Wrapper>
			</Container>
		</Section>
	);
}

function RequestProjectPage() {
	const [isRequestProjectModalShown, setIsRequestProjectModalShown] = useState(false)

	const changeModalVisibilityState = () => {
		setIsRequestProjectModalShown(prev => !prev)
	}

	const revealRequestProjectButton = () => {
		if (process.env.REACT_APP_IS_PROJECT_REQUEST_ALLOWED === 'false') {
			return (
				<Button pigment='solid-primary-btn'>
					Sorry. Requesting projects is not allowed at this time.
				</Button>
			);
		}

		if (isUserAlreadySubmittedRequest()) {
			return (
				<Button pigment='solid-stable-btn' click={changeModalVisibilityState}>
					Let's Build! 🤩
				</Button>
			);
		}

		return (
			<Button pigment='solid-primary-btn' click={null}>
				You have already submitted a request. Thank you! 😍
			</Button>
		);
	}

	return (
		<Fragment>
			{
				isRequestProjectModalShown ?
					<RequestProjectModal triggerVisibility={changeModalVisibilityState} />
					: null
			}
			<Section id='request-project'>
				<Container>
					<Wrapper>
						<div className='left'>
							<h1 className='display-1'>Let's work together.</h1>
							<p>
								Contact me if you think that I am qualified for your project or request a
								ready made projects if you are in a hurry.
							</p>
							<div className='buttons'>
								{revealRequestProjectButton()}

								<Button pigment='liquid-stable-btn'>I want a ready made! (SOON)</Button>
							</div>
						</div>
						<div className='right'>
							<img src={PartnerGraphic} alt='Partnership' />
						</div>
					</Wrapper>
				</Container>
			</Section>
		</Fragment>
	);

}
