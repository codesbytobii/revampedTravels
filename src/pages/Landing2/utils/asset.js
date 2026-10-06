export function getImgUrl(relativeImgPath) {
	return new URL(`../../../assets/img/${relativeImgPath}`, import.meta.url).toString();
}


