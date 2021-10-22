// @ts-ignore
import RandomFocusAreaComponent from '../../components/RandomFocusArea.svelte';

export function randomFocusArea(auxParent: Element | null) {
	const randomFocusAreaContainer = document.createElement('div');
	randomFocusAreaContainer.classList.add('btn-group');
	
	new RandomFocusAreaComponent({
		target: randomFocusAreaContainer
	})

	auxParent?.prepend(randomFocusAreaContainer)
}