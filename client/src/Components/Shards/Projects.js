import Tilt from 'react-parallax-tilt';
import { TechTag } from './TechTag';

export function Project(props) {
	return (
		<a key={props.data._id} className='proj-link' href={`/view-project/${props.data._id}`}>
			<Tilt
				className='project-card'
				tiltReverse={true}
				perspective={1000}
				gyroscope={false}
				tiltMaxAngleX={5}
				tiltMaxAngleY={5}
				glareEnable={true}
				glareReverse={true}
				glareMaxOpacity={0.5}
			>
				<div className='inner-container'>
					<div className='texts'>
						<h1 className='shortname'>{props.data.projectShortName}</h1>
						<p className='fullname'>{props.data.projectFullname}</p>
						<div className='tags'>
							{props.data.technologies.map((value) => (
								<TechTag key={value} label={value.toUpperCase()} />
							))}
						</div>
					</div>

					<figure className='project-image'>
						<img
							src={
								process.env.REACT_APP_API_URL +
								'/projects/project-photo/' +
								props.data.projectImage
							}
							alt={'Illustration of' + props.data.projectImage}
						/>
					</figure>
				</div>
			</Tilt>
		</a>
	);
}
