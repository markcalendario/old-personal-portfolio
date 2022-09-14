import { Component, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ==============================
// Modules
// ==============================
import Typewriter from 'typewriter-effect';

// ==============================
// Fontawesome Icons
// ==============================

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCss3,
	faDev,
	faFacebook,
	faGithub,
	faGithubAlt,
	faHtml5,
	faInstagram,
	faJs,
	faNodeJs,
	faPhp,
	faReact,
	faSass,
	faWindows,
} from '@fortawesome/free-brands-svg-icons';

import {
	faCircle,
	faCode,
	faDatabase,
	faExclamationCircle,
	faFeather,
	faGraduationCap,
	faLeaf,
	faMedal,
	faPaintRoller,
} from '@fortawesome/free-solid-svg-icons';

// ==============================
// Images
// ==============================

import AboutMeImage from '../../Images/landingpage/Mark Kenneth Graphic - About.png';
import glow from '../../Images/landingpage/Glow.png';
import PartnerGraphic from '../../Images/landingpage/partner.svg';
import FrontEndGraphic from '../../Images/landingpage/web-design.gif';
import BackEndGraphic from '../../Images/landingpage/back-end.gif';
import DatabaseGraphic from '../../Images/landingpage/database-management.gif';

// ==============================
// Components
// ==============================

import { Section, Container, Wrapper } from '../Shards/Base';
import { Button, IconButton, LinkButton } from '../Shards/Buttons';
import { PrimaryNavbar, SecondaryNavbar } from '../Shards/Navbar';
import { ProjectLoader, FeaturedProjectLoader } from '../Shards/Loaders';
import { RequestProjectModal } from '../Shards/Modals';
import { isUserAlreadySubmittedRequest } from '../../Functions/user-local-data';
import { Project } from '../Shards/Projects';
import { Capsule } from '../Shards/Capsules';
import Footer from '../Shards/Footer';
import { Timeline, TimelineEvent, TimelineEventDetails } from '../Shards/Timeline';

export default function LandingPage() {

	useEffect(() => {
		document.title = 'Mark Kenneth Calendario';
	}, []);

	return (
		<>
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
		</>
	);
}

function Front() {
	return (
		<>
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
								<Link to='/projects'> View my projects </Link>
							</LinkButton>

							<div className='contacts'>
								<IconButton href='https://www.github.com/markcalendario'>
									<FontAwesomeIcon icon={faGithubAlt} />
								</IconButton>

								<IconButton href='https://www.facebook.com/markcalendario'>
									<FontAwesomeIcon icon={faFacebook} />
								</IconButton>

								<IconButton href='https://instagram.com/_kendies19'>
									<FontAwesomeIcon icon={faInstagram} />
								</IconButton>
							</div>
						</div>
					</Wrapper>
				</Container>
			</Section>
		</>
	);
}

function QuickOverview() {
	const [latestProjectData, setLatestProjectData] = useState(null);

	const fetchLatestProject = useCallback(async () => {
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		await fetch(process.env.REACT_APP_API_URL + '/projects/latest', options)
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				setLatestProjectData(result.data);
			});
	}, []);

	useEffect(() => {
		fetchLatestProject();
	}, [fetchLatestProject]);

	return (
		<Section id={'quick-overview'}>
			<Container>
				<Wrapper>
					<div className='box'>
						<div className='left'>
							<h3>Quick Overview</h3>

							<div className='overview'>
								<p className='overview-text'>
									<FontAwesomeIcon icon={faCode} /> I built 6 web projects since 2020.
								</p>
								<p className='overview-text'>
									<FontAwesomeIcon icon={faGraduationCap} /> I am a Computer Science
									Student at PUP.
								</p>
								<p className='overview-text'>
									<FontAwesomeIcon icon={faMedal} /> I finished senior high school with
									high honor at Arellano University.
								</p>
								<p className='overview-text'>
									<FontAwesomeIcon icon={faDev} /> I am an aspiring fullstack developer.
								</p>
								<p className='overview-text'>
									<FontAwesomeIcon icon={faExclamationCircle} /> Gaining experience in
									freelancing.
								</p>
							</div>
						</div>
						<div className='right'>
							<h3>Latest Project</h3>
							<div className='content'>
								{latestProjectData !== null ? (
									<Project key={latestProjectData._id} data={latestProjectData} />
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

	const getAge = useCallback((birthday) => {
		const currentDate = new Date();
		const birthDate = new Date(birthday);

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
		getAge('October 19, 2002');
		window.addEventListener('scroll', applyParallaxEffect, false);

		return () => window.removeEventListener('scroll', applyParallaxEffect, false);
	}, [getAge, applyParallaxEffect]);

	return (
		<Section id={'about'}>
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

class Expertise extends Component {
	constructor(props) {
		super(props);

		this.graphicModule = [
			[faLeaf, '#4DB33D'],
			[faCode, 'white'],
			[faReact, '#61dbfb'],
			[faNodeJs, '#68A063'],
			[faWindows, '#a3a7ab'],
			[faLeaf, 'violet'],
			[faDatabase, 'white'],
			[faPhp, '#8993be'],
			[faHtml5, 'orange'],
			[faSass, '#264de4'],
			[faJs, '#f0db4f'],
			[faGithub, 'white'],
		];

		this.state = {
			isCapsuleHoveredByUser: false,

			currentGraphic: 0,
			icon: this.graphicModule[0][0],
			color: this.graphicModule[0][1],
		};
	}

	componentDidMount() {
		this.changeGraphicAuto();
		this.graphicAutoChange = setInterval(this.changeGraphicAuto, 2000);
	}

	componentWillUnmount() {
		clearInterval(this.graphicAutoChange);
	}

	changeGraphicAuto = () => {
		this.setState({
			icon: this.graphicModule[this.state.currentGraphic][0],
			color: this.graphicModule[this.state.currentGraphic][1],
		});

		// LOOP CHANGES
		if (this.state.currentGraphic < this.graphicModule.length - 1) {
			this.setState({ currentGraphic: this.state.currentGraphic + 1 });
		} else {
			this.setState({ currentGraphic: 0 });
		}
	};

	changeGraphic = (moduleNumber) => {
		this.setState({
			icon: this.graphicModule[moduleNumber][0],
			color: this.graphicModule[moduleNumber][1],
		});
	};

	render() {
		return (
			<Section id={'expertise'}>
				<Container>
					<Wrapper>
						<div className='left'>
							<h1 className='display-1'>I am currently mastering these technologies.</h1>
							<div className='horizontal-line'></div>

							<p>
								The two most popular stacks in the field of web development, the MERN{' '}
								<span className='gray'>(MongoDB, Express JS, React and Node JS)</span> and
								WAMP <span className='gray'>(Windows, Apache, MySQL and PHP)</span> stacks.
							</p>
						</div>

						<div className='right'>
							<FontAwesomeIcon
								className='graphic'
								icon={this.state.icon}
								style={{ color: this.state.color }}
							/>

							<div className='content'>
								<h4 className='divider-text'>MERN Stack</h4>

								<div className='capsule-compilation'>
									<Capsule
										text='Mongo DB'
										icon={<FontAwesomeIcon icon={faLeaf} />}
										onMouseEnter={() => this.changeGraphic(0)}
									/>

									<Capsule
										text='Express JS'
										icon={<FontAwesomeIcon icon={faJs} />}
										onMouseEnter={() => this.changeGraphic(1)}
									/>

									<Capsule
										text='React JS'
										icon={<FontAwesomeIcon icon={faJs} />}
										onMouseEnter={() => this.changeGraphic(2)}
									/>

									<Capsule
										text='Node JS'
										icon={<FontAwesomeIcon icon={faNodeJs} />}
										onMouseEnter={() => this.changeGraphic(3)}
									/>
								</div>

								<h4 className='divider-text'>WAMP Stack</h4>

								<div className='capsule-compilation'>
									<Capsule
										text='Windows'
										icon={<FontAwesomeIcon icon={faWindows} />}
										onMouseEnter={() => this.changeGraphic(4)}
									/>

									<Capsule
										text='Apache'
										icon={<FontAwesomeIcon icon={faFeather} />}
										onMouseEnter={() => this.changeGraphic(5)}
									/>

									<Capsule
										text='MySQL'
										icon={<FontAwesomeIcon icon={faDatabase} />}
										onMouseEnter={() => this.changeGraphic(6)}
									/>

									<Capsule
										text='PHP'
										icon={<FontAwesomeIcon icon={faPhp} />}
										onMouseEnter={() => this.changeGraphic(7)}
									/>
								</div>

								<h4 className='divider-text'>User Interface and Experience</h4>

								<div className='capsule-compilation'>
									<Capsule
										text='HTML 5'
										icon={<FontAwesomeIcon icon={faHtml5} />}
										onMouseEnter={() => this.changeGraphic(8)}
									/>

									<Capsule
										text='CSS/SASS'
										icon={
											<>
												<FontAwesomeIcon icon={faCss3} />
												<FontAwesomeIcon icon={faSass} />
											</>
										}
										onMouseEnter={() => this.changeGraphic(9)}
									/>

									<Capsule
										text='Vanilla JS'
										icon={<FontAwesomeIcon icon={faJs} />}
										onMouseEnter={() => this.changeGraphic(10)}
									/>
								</div>

								<h4 className='divider-text'>Repository</h4>

								<div className='capsule-compilation'>
									<Capsule
										text={<a href='https://www.github.com/markcalendario'>GitHub</a>}
										icon={<FontAwesomeIcon icon={faGithubAlt} />}
										onMouseEnter={() => this.changeGraphic(11)}
									/>
								</div>
							</div>
						</div>
					</Wrapper>
				</Container>
			</Section>
		);
	}
}

function FeaturedProjects() {
	const [featuredProjectData, setFeaturedProjectData] = useState(null);

	const fetchFeaturedProjects = useCallback(() => {
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		let data = fetch(process.env.REACT_APP_API_URL + '/projects/featured-projects', options);

		data
			.then((response) => {
				if (!response.ok) return (window.location.href = `/${response.status}`);

				return response.json();
			})
			.then((result) => {
				setFeaturedProjectData(result.data);
			});
	}, []);

	useEffect(() => {
		fetchFeaturedProjects();
	}, [fetchFeaturedProjects]);

	const displayFeaturedProjects = () => {
		return featuredProjectData.map((data) => <Project key={data} data={data} />);
	};

	return (
		<Section id='featured-projects'>
			<Container>
				<Wrapper>
					<div className='texters'>
						<h1 className='display-1'>Featured Projects</h1>
						<p>
							These are my featured projects, you can view all of my projects by clicking{' '}
							<Link to='projects'>this link.</Link>
						</p>
						<p>
							As an aspiring fullstack developer, I am considering this as my success and a
							steping stone to achieve my goals.
						</p>
					</div>

					<div className='projects'>
						{featuredProjectData !== null ? (
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

class Services extends Component {
	render() {
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
}

class EducationAndExperience extends Component {
	render() {
		return (
			<Section id='education-experience'>
				<Container>
					<Wrapper>
						<h1 className='topper-title display-1'>Timeline of Experience</h1>
						<Timeline>
							<TimelineEvent year='2009'>
								<TimelineEventDetails title='Started Elementary School'>
									Libis Talisay Elementary School
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

							<TimelineEvent year='2021'>
								<TimelineEventDetails title='Graduated Senior High School'>
									<h3>Awards</h3>
									<ul>
										<li>
											Best in Research in Information and Communications Technology
											<br />
											The Development of the{' '}
											<a href='/view-project/60ed32ebd275b7d18abb0436'>
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
								</TimelineEventDetails>
							</TimelineEvent>
						</Timeline>
					</Wrapper>
				</Container>
			</Section>
		);
	}
}

class RequestProjectPage extends Component {
	state = {
		isRequestProjectModalShown: false,
	};

	changeModalVisibilityState = () => {
		this.setState({ isRequestProjectModalShown: !this.state.isRequestProjectModalShown });
	};

	revealRequestProjectButton = () => {
		if (process.env.REACT_APP_IS_PROJECT_REQUEST_ALLOWED !== 'false') {
			return (
				<Button pigment={'solid-primary-btn'}>
					Sorry. Requesting projects is not allowed at this time.
				</Button>
			);
		}

		if (isUserAlreadySubmittedRequest()) {
			return (
				<Button pigment={'solid-stable-btn'} click={this.changeModalVisibilityState}>
					Let's Build! 🤩
				</Button>
			);
		}

		return (
			<Button pigment='solid-primary-btn' click={null}>
				You have already submitted a request. Thank you! 😍
			</Button>
		);
	};

	render() {
		return (
			<>
				{
					this.state.isRequestProjectModalShown ?
						<RequestProjectModal triggerVisibility={this.changeModalVisibilityState} />
						: null
				}
				<Section id='request-project'>
					<Container>
						<Wrapper>
							<div className='left'>
								<h1 className='display-1'>Let's work together.</h1>
								<p>
									Contact me if you think that I am qualified for your project or request a
									ready made projects if you are in a hurry.{' '}
								</p>
								<div className='buttons'>
									{this.revealRequestProjectButton()}

									<Button pigment='liquid-stable-btn'>I want a ready made! (SOON)</Button>
								</div>
							</div>
							<div className='right'>
								<img src={PartnerGraphic} alt='Partnership' />
							</div>
						</Wrapper>
					</Container>
				</Section>
			</>
		);
	}
}
