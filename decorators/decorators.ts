const classDecorator = (constructor: typeof Boat) => {
	console.log(constructor)
}

@classDecorator
export class Boat {
	// @testDecorator
	color = 'red'

	// @testDecorator
	get formattedColor(): string {
		return `Color is ${this.color}`
	}

	// @logErrorFactory('error message')
	fireCannons(
		@parameterDecorator
		balls: number
	): void {
		if (balls > 0) {
			console.log('boom')
		} else {
			console.log('blah bleh blayaaaa')
		}
	}
}

function parameterDecorator(target: Boat, key: string, index: number) {
	console.log(key, index)
}
function testDecorator(target: any, key: string) {
	console.log(target)
	console.log(key)
}

function logErrorFactory(errorMessage: string) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		const method = desc.value

		desc.value = () => {
			try {
				method()
			} catch (e) {
				console.log(errorMessage)
			}
		}
	}
}
