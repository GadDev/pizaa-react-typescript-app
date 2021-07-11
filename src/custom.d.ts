declare module '*.css' {
	const css: { [key: string]: string };
	export default css;
}

declare module '*.svg' {
	const ReacComponent: React.ComponentType<React.SVGAttributes<SVGElement>>
	export default ReactComponent
}
