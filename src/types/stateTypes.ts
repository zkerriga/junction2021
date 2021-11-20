export interface Time {
	hours: number,
	minutes: number,
	seconds: number,
}

export interface Rating {
	totalUsers: number,
	place: number,
}

export interface Consumption {
	liters: number,
	kWh: number,
}

export interface Goal {
	consumption: Consumption,
	status: number
}

export interface State {
	time: Time,
	rating: Rating,
	goal: Goal,
}