export function TechTag(props) {
	return (
		<div key={props.label} className='tech-tag'>
			<p>{props.label}</p>
		</div>
	);
}
