import style from './style.module.css';

export function Loading() {
	return (
		<div className={style['lds-ellipsis']}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
