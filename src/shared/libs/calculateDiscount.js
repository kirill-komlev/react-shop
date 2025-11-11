export function calculateDiscount(price, discount) {
	return Math.round((price / 100) * (100 - discount))
}
