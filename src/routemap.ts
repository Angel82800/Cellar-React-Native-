/* Route map file */

export const RouteMap = {
	'Home': {
		title: 'Home',
		id: 'Home'
	},
	'Detail': {
		title: 'Detail',
		id: 'Detail',
		data: {} as any
	},
	'Checkout': {
		title: 'Checkout',
		id: 'Checkout',
		data: {}
	},
	'Guide': {
		title: 'Guide',
		id: 'Guide',
	},
	'TapScreen': {
		title: 'TapScreen',
		id: 'TapScreen',
	},
	'View2': {
		title: 'View2',
		id: 'View2'
	},
	'Settings': {
		title: 'Settings',
		id: 'Settings'
	},
	'ControlPanel': {
		title: 'ControlPanel',
		id: 'ControlPanel',
	},
	'FAQ': {
		title: 'FAQ',
		id: 'FAQ'
	},
	'AccountScreen': {
		title: 'AccountScreen',
		id: 'AccountScreen',
		data: {} as any
	},
	'LoginScreen': {
		title: 'LoginScreen',
		id: 'LoginScreen',
		data: {} as any
	},
	'PasswordRecovery': {
		title: 'PasswordRecovery',
		id: 'PasswordRecovery',
	},
	'AddressList': {
		title: 'AddressList',
		id: 'AddressList',
	},
	'AddressDetail': {
		title: 'AddressDetail',
		id: 'AddressDetail',
	},
	'PaymentList': {
		title: 'PaymentList',
		id: 'PaymentList',
	},
	'PaymentDetail': {
		title: 'PaymentDetail',
		id: 'PaymentDetail',
	},
	'AddressSelect': {
		title: 'AddressSelect',
		id: 'AddressSelect',
	},
	'PaymentSelect': {
		title: 'PaymentSelect',
		id: 'PaymentSelect',
	},
	'PickerView': {
		title: 'PickerView',
		id: 'PickerView',
		data: {
			list: [] as Array<string>,
			onValueSelected: (value) => {}
		}
	}
};
