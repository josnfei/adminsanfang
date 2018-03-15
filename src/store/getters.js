export const User = state => state.User

export const RouterFrom = state => state.RouterFrom

export const Institution = state => state.Institution

export const form_name = state => state.form_name

export const ID = state => state.ID

export const DepartReportInfo = state => state.DepartReportInfo

export const IsShow = state => state.IsShow

export const DepReportList = state => state.DepReportList

export const SHUIKU = state => state.SHUIKU

export const ifCommand = state => state.ifCommand;

export const responseModule = state => state.responseModule;

export const responseIng = state => {
	let arr = [];
	
	state.responseModule.map(items => {
		items.map(item => {
			if (item.isChecked) {
				arr.push(item);
			}
		})
	})
	
	return arr;
}

export const NOTICEID = state => state.NOTICEID