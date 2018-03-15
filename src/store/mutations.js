import * as types from './mutation-types';

const mutations = {
	[types.SET_USER](state, obj) {
		state.User = obj;
	},
	[types.SET_ROUTERFROM](state, str) {
		state.RouterFrom = str;
	},
	[types.SET_ISSHOW](state, str) {
		state.IsShow = str;
	},
	[types.SET_ID](state, str) {
		state.ID = str;
	},
	[types.SET_INSTITUTION](state, arr) {
		state.Institution = arr;
	},
	[types.SET_FORMNAME](state,edg) {
		state.form_name = edg;
	},
	[types.SET_DEPARTREPORTINFO](state, obj) {
		state.DepartReportInfo = obj;
	},
	[types.SET_DEPREPORTLIST](state, ary) {
		state.DepartReportInfo = obj;
	},
	[types.SET_SHUIKU](state,ary) {
		state.SHUIKU = ary
	},
	[types.SET_IFCOMMAND](state, bol) {
		state.ifCommand = bol;
	},
	[types.SET_NOTICEID](state, str) {
		state.NOTICEID = str;
	}

}

export default mutations