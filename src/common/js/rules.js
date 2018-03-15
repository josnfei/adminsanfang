import { getDepList } from 'api/bumenlist'
//验证手机
let telphoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/

const telphoneValid = (rule, value, callback) => {
	if(!telphoneReg.test(value)) {
		callback(new Error('请输入正确的手机号码'));
		return
	}
	callback()
}

//验证身份证
let city = {
	11: "北京",
	12: "天津",
	13: "河北",
	14: "山西",
	15: "内蒙古",
	21: "辽宁",
	22: "吉林",
	23: "黑龙江 ",
	31: "上海",
	32: "江苏",
	33: "浙江",
	34: "安徽",
	35: "福建",
	36: "江西",
	37: "山东",
	41: "河南",
	42: "湖北 ",
	43: "湖南",
	44: "广东",
	45: "广西",
	46: "海南",
	50: "重庆",
	51: "四川",
	52: "贵州",
	53: "云南",
	54: "西藏 ",
	61: "陕西",
	62: "甘肃",
	63: "青海",
	64: "宁夏",
	65: "新疆",
	71: "台湾",
	81: "香港",
	82: "澳门",
	91: "国外 "
}

const IdentityCodeValid = (rule, code, callback) => {

	var tip = "";
	var pass = true;

	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]) {
				tip = "校验位错误";
				pass = false;
			}
		}
	}
	if(!pass) {
		callback(new Error(tip));
		return
	}
	callback();
}

// 部门预案
export const dep_plan = {
	plan_name: [{
		required: true,
		message: '预案名称不能为空',
		trigger: 'change'
	}],
	plan_type: [{
		required: true,
		message: '请选择预案类型',
		trigger: 'change'
	}],
	department_fullname: [{
		required: true,
		message: '执行部门不能为空',
		trigger: 'change'
	}],
	status: [{
		required: true,
		message: '请选择执行状态',
		trigger: 'change'
	}],
	createby: [{
		required: true,
		message: '起草人名称不能为空',
		trigger: 'change'
	}]
}

const tel = (rule, value, callback) => {
	if(value === '') {
		callback(new Error('请输入任务负责人的联系电话'));
	} else if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
		callback(new Error('请输入正确的格式'));
	} else {
		callback();
	}
};
// 预设任务
export const presetTask = {
	department_fullname: [{
		required: true,
		message: '请选择执行部门名称',
		trigger: 'change'
	}],
	plan_name: [{
		required: true,
		message: '预案名称不能为空',
		trigger: 'change'
	}],
	plan_type: [{
		required: true,
		message: '请选择预案类型',
		trigger: 'change'
	}],
	task_type: [{
		required: true,
		message: '请选择任务类型',
		trigger: 'change'
	}],
	task_profile: [{
		required: true,
		message: '任务概要不能为空',
		trigger: 'change'
	}],
	task_desc: [{
		required: true,
		message: '任务描述不能为空',
		trigger: 'change'
	}],
	chargeby: [{
		required: true,
		message: '任务负责人不能为空',
		trigger: 'change'
	}],
	phoneno: [{
			required: true,
			message: '任务负责人联系电话不能为空',
			trigger: 'change'
		},
		{
			validator: tel,
			trigger: 'blur'
		}
	],
	trigger: [{
		required: true,
		message: '请选择启动条件',
		trigger: 'change'
	}]

}

// 任务执行
export const taskManager = {
	department_name: [{
		required: true,
		message: '执行部门不能为空',
		trigger: 'change'
	}],
	status: [{
		required: true,
		message: '请选择任务状态',
		trigger: 'change'
	}],
	task_type: [{
		required: true,
		message: '请选择任务类型',
		trigger: 'change'
	}],
	task_profile: [{
		required: true,
		message: '任务概要不能为空',
		trigger: 'change'
	}],
	task_desc: [{
		required: true,
		message: '任务描述不能为空',
		trigger: 'change'
	}],
	chargeby: [{
		required: true,
		message: '任务负责人不能为空',
		trigger: 'change'
	}],
	phoneno: [{
			required: true,
			message: '请输入任务负责人的联系电话',
			trigger: 'change'
		},
		{
			validator: tel,
			trigger: 'blur'
		}
	]

}

// 应急响应管理
export const er_management = {
	response_type: [{
		required: true,
		message: '请选择应急响应类型类型',
		trigger: 'change'
	}],
	response_level: [{
		required: true,
		message: '请选择级别',
		trigger: 'change'
	}],
	status: [{
		required: true,
		message: '请选择执行状态',
		trigger: 'change'
	}]
}

//部门列表
export const bumenRules = {
	name: [{
		required: true,
		message: '部门名称不能为空',
		trigger: 'change'
	}, ],
	fullname: [{
		required: true,
		message: '部门全称不能为空',
		trigger: 'change'
	}, ],
	code: [{
		required: true,
		message: '部门编号不能为空',
		trigger: 'change'
	}],
	level: [{
		required: true,
		message: '部门层级不能为空',
		trigger: 'change'
	}]
}

//用户管理
export const userManagementRules = {
	username: [{
		required: true,
		message: '用户账号不能为空',
		trigger: 'change'
	}],
	password: [{
		required: true,
		message: '密码不能为空',
		trigger: 'change'
	}],
	realname: [{
		required: true,
		message: '用户名称不能为空',
		trigger: 'change'
	}],
	email: [{
		required: true,
		message: '用户邮箱不能为空',
		trigger: 'change'
	}],
	mobile: [{
		required: true,
		message: '联系方式不能为空',
		trigger: 'change'
	}],
	departmentName: [{
		required: true,
		message: '用户部门不能为空',
		trigger: 'change'
	}],
}

//角色管理
export const roleRules = {
	rolename: [{
		required: true,
		message: '角色名称不能为空',
		trigger: 'change'
	}],
	description: [{
		required: true,
		message: '角色描述不能为空',
		trigger: 'change'
	}],
}

// 通讯录管理
export const addressBookRules = {
	department_name: [
		{ required: true, message: '请选择执行部门名称', trigger: 'change' }
	],
	name: [
		{ required: true, message: '请输入姓名', trigger: 'change' }
	],
	duty: [
		{ required: true, message: '请输入职责', trigger: 'change' }
	],
	office_phone: [
		{ required: true, message: '办公室电话不能为空', trigger: 'change' }
	],
	telephoe: [
		{ required: true, message: '请输入手机号码', trigger: 'change' }
	],
	duty_desc: [
		{ required: true, message: '请输入职责描述', trigger: 'change' }
	]
}

// 巡查任务安排
export const patrolPlanBookRules = {
	department_name: [
		{ required: true, message: '请选择执行部门名称', trigger: 'change' }
	],
	title: [
		{ required: true, message: '请输入标题', trigger: 'change' }
	],
	plan_startdt: [
		{ required: true, message: '请输入任务计划开始时间', trigger: 'change' }
	],
	plan_enddt: [
		{ required: true, message: '请输入任务计划结束时间', trigger: 'change' }
	],
	patrolman: [
		{ required: true, message: '巡查人员不能为空', trigger: 'change' }
	],
	task_desc: [
		{ required: true, message: '请输入任务描述', trigger: 'change' }
	]
}

// 通知公告
export const noticeRules = {
	title: [
		{ required: true, message: '标题不能为空', trigger: 'change' }
	],
	notice_desc: [
		{ required: true, message: '通知公告内容不能为空', trigger: 'change' }
	]
}