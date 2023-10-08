export interface Vacancy {
	id: string
	schedules: Schedule[]
	title: string
	description: string
	sortDateText: string
	hot: boolean
	designBannerUrl: any
	badges: Badge[]
	salary: Salary
	company: Company
	city: City
	showProfile: boolean
	seekerFavorite: any
	seekerDisliked: any
	formApplyCustomUrl: string
	anonymous: boolean
	isActive: boolean
	publicationType: string
	__typename: string
}
  
export interface Schedule {
	id: string
	__typename: string
}
  
export interface Badge {
	name: string
	__typename: string
}
  
export interface Salary {
	amount: number
	comment: string
	amountFrom: number
	amountTo: number
	__typename: string
}
  
export interface Company {
	id: string
	logoUrl: string
	name: string
	__typename: string
}
  
export interface City {
	id: string
	name: string
	__typename: string
}
  