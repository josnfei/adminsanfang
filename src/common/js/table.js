import { cloneObj } from 'common/js/util'
import { likeSearchRule } from 'common/js/config'
import { httpUrl } from 'api/config'

// 首页
export function homeThead(that) {
	return [{
		title: '名称',
		align: 'center',
		key: 'stn_name'
	}, {
		title: '时间',
		align: 'center',
		key: 'data_time'
	}, {
		title: '水位（m）',
		align: 'center',
		key: 'waterlevel'
	}, {
		title: '警戒水位（m）',
		align: 'center',
		key: 'alarm_l3',
		width: 120
	}]
}

// 部门预案
export function departmentThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '预案编号',
		key: 'plan_no',
		align: 'center',
		ellipsis: true
	}, {
		title: '预案名称',
		key: 'plan_name',
		align: 'center',
		ellipsis: true
	}, {
		title: '执行部门',
		key: 'department_name',
		align: 'center',
		width: 100,
	}, {
		title: '预案状态',
		key: 'status',
		align: 'center',
		width: 85,
	}, {
		title: '起草人',
		key: 'createby',
		align: 'center',
		width: 80,
	}, {
		title: '提交时间',
		key: 'createdt',
		align: 'center',
		ellipsis: true
	}, {
		title: '审批人',
		key: 'approveby',
		align: 'center',
		width: 80,
	}, {
		title: '审批时间',
		key: 'approvedt',
		align: 'center',
		ellipsis: true
	}, {
		title: '操作',
		key: 'edit',
		align: 'left',
		width: 180,
		render: (h, params) => {
			if (params.row.status === '生效') {
				return h('div', [
					h('a', {
						props: {
							href: 'javascript:;',
						},
						class: {
							'show': true
						},
						style: {
							marginRight: '5px',
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.details(data)
							}
						}
					}, '明细'),
					h('a', {
						props: {
							href: 'javascript:;'
						},
						class: {
							'show': true
						},
						style: {
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.submit(data, params.index)
							}
						}
					}, '申请审批')
				]);
			} else if (params.row.status === '草稿') {
				return h('div', [
					h('a', {
						props: {
							href: 'javascript:;'
						},
						class: {
							'show': true
						},
						style: {
							marginRight: '5px',
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.edit(data, params.index)
							}
						}
					}, '修改'),
					h('a', {
						props: {
							href: 'javascript:;'
						},
						class: {
							'show': true
						},
						style: {
							marginRight: '5px',
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.delete(params.index, data)
							}
						}
					}, '删除'),
					h('a', {
						props: {
							href: 'javascript:;'
						},
						class: {
							'show': true
						},
						style: {
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.submit(data, params.index)
							}
						}
					}, '申请审批')
				]);
			} else if (params.row.status === '待审批') {
				return h('div', [
					h('a', {
						props: {
							href: 'javascript:;',
						},
						class: {
							'show': true
						},
						style: {
							marginRight: '5px',
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.details(data)
							}
						}
					}, '明细')
				]);
			} else if (params.row.status === '失效') {
				return h('div', [
					h('a', {
						props: {
							href: 'javascript:;'
						},
						class: {
							'show': true
						},
						style: {
							marginRight: '5px',
							textDecoration: 'underline',
							color: 'rgb(14, 91, 212)'
						},
						on: {
							click: () => {
								let data = cloneObj(params.row);
								delete data['_index']
								delete data['_rowKey']
								that.delete(params.index, data)
							}
						}
					}, '删除')
				])
			};
		}
	}]
}

// 预案审批
export function approvalThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '预案编号',
		key: 'plan_no',
		align: 'center',
		ellipsis: true
	}, {
		title: '预案名称',
		key: 'plan_name',
		align: 'center',
		ellipsis: true
	}, {
		title: '执行部门',
		key: 'department_name',
		align: 'center',
		ellipsis: true
	}, {
		title: '预案状态',
		key: 'status',
		align: 'center',
		ellipsis: true
	}, {
		title: '起草人',
		key: 'createby',
		align: 'center',
		ellipsis: true
	}, {
		title: '提交时间',
		key: 'createdt',
		align: 'center',
		ellipsis: true
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 200,
		render: (h, params) => {
			let isDsabled = true
			if (params.row.status == '关闭') {
				isDsabled = true
			} else {
				isDsabled = false
			}
			return h('div', [
				h('Button', {
					props: {
						type: 'success',
						size: 'small',
						disabled: isDsabled
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.details(data)
						}
					}
				}, '明细'),
				h('Button', {
					props: {
						type: 'primary',
						size: 'small',
						disabled: isDsabled
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.approval(data, params.index)
						}
					}
				}, '通过'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small',
						disabled: isDsabled
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.back(data)
						}
					}
				}, '驳回')
			]);
		}
	}]
}

// 任务预设
export function preTaskThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '执行部门',
		key: 'department_name',
		align: 'center',
		width: 140
	}, {
		title: '预案名称',
		key: 'plan_name',
		align: 'center',
		ellipsis: true
	}, {
		title: '预案编号',
		key: 'template_no',
		align: 'center',
		ellipsis: true
	}, {
		title: '应急响应级别',
		key: 'response_level',
		align: 'center',
		width: 120
	}, {
		title: '任务类型',
		key: 'task_type',
		align: 'center',
		ellipsis: true
	}, {
		title: '任务概要',
		key: 'task_profile',
		align: 'center',
		ellipsis: true
	}, {
		title: '任务计划开始时间',
		key: 'plan_startdate',
		align: 'center',
		width: 135
	}, {
		title: '任务计划结束时间',
		key: 'plan_enddate',
		align: 'center',
		width: 135
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 125,
		render: (h, params) => {
			let isDsabled = true
			if (params.row.status == '关闭') {
				isDsabled = true
			} else {
				isDsabled = false
			}
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small',
						disabled: isDsabled
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small',
						disabled: isDsabled
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.delete(params.index, data)
						}
					}
				}, '删除')
			]);
		}
	}]
}

// 任务执行
export function taskManaThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '任务编号',
		key: 'task_no',
		align: 'center',
		ellipsis: true
	}, {
		title: '任务状态',
		key: 'status',
		align: 'center',
		width: 100
	}, {
		title: '应急响应级别',
		key: 'response_level',
		align: 'center',
		width: 120
	},
	{
		title: '执行部门',
		key: 'department_name',
		align: 'center',
		width: 140
	}, {
		title: '任务类型',
		key: 'task_type',
		align: 'center',
		ellipsis: true
	}, {
		title: '任务概要',
		key: 'task_profile',
		align: 'center',
		ellipsis: true
	}, {
		title: '任务开始时间',
		key: 'startdate',
		align: 'center',
		width: 135
	}, {
		title: '任务结束时间',
		key: 'enddate',
		align: 'center',
		width: 135
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 125,
		render: (h, params) => {
			let isDsabled = true
			if (params.row.status == '关闭') {
				isDsabled = true
			} else {
				isDsabled = false
			}
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.details(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small',
						disabled: isDsabled
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.delete(data)
						}
					}
				}, '删除')
			]);
		}
	}
	]
}

// 应急响应管理
export function erManagementThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '应急响应编号',
		key: 'response_no',
		align: 'center',
		width: 140
	}, {
		title: '应急响应类型',
		key: 'response_type',
		align: 'center',
		width: 110
	}, {
		title: '级别',
		key: 'response_level',
		align: 'center',
		ellipsis: true
	}, {
		title: '状态',
		key: 'status',
		align: 'center',
		ellipsis: true
	}, {
		title: '生成时间',
		key: 'createdt',
		align: 'center',
		ellipsis: true
	}, {
		title: '调整时间',
		key: 'modifydt',
		align: 'center',
		ellipsis: true
	}, {
		title: '结束时间',
		key: 'closedt',
		align: 'center',
		ellipsis: true
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 125,
		render: (h, params) => {
			let isDsabled = true
			if (params.row.status == '关闭') {
				isDsabled = true
			} else {
				isDsabled = false
			}
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small',
						disabled: isDsabled
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.eidt(data)
						}
					}
				}, '调整'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small',
						disabled: isDsabled
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.close(params.index, data)
						}
					}
				}, '关闭')
			]);
		}
	}]
}

// 应急响应级别
export function erLevelThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	},
	{
		title: '应急响应类型',
		key: 'response_type',
		align: 'center',
		width: 110,
	}, {
		title: '级别',
		key: 'response_level',
	}, {
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	},
	{
		title: '应急响应类型',
		key: 'response_type',
		align: 'center',
		width: 110,
	}, {
		title: '级别',
		key: 'response_level',
		align: 'center',
		width: 65,
	}, {
		title: '描述',
		key: 'desc',
		align: 'center',
		width: 195,
	}, {
		title: '标准',
		key: 'criteria',
		align: 'center',
		ellipsis: true
	},
	{
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 100,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small',
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.eidt(data)
						}
					}
				}, '修改')
			]);
		}
	}
	]
}

// 部门数据上传新增页面
export function addThaed(that) {
	return [

		{
			title: '序号',
			type: 'index',
			align: 'center',
			width: 60
		}, {
			title: '栏位名称',
			align: 'center',
			key: '栏位名称',
			width: 130
		}, {
			title: '栏位类型',
			align: 'center',
			key: '栏位类型',
			width: 130
		}, {
			title: '栏位说明',
			align: 'center',
			key: '栏位说明',
			// width:200
		},
		{
			title: '操作',
			align: 'center',
			width: 100,
			render: (h, params) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'error',
							size: 'small',
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								that.del(cloneObj(params.row))
								console.log(that)
							}
						}
					}, '删除')
				]);
			}
		}
	]
}

// 联合值守看板
export function erCardThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	},
	{
		title: '部门名称',
		key: 'department_name',
		align: 'center',
		width: 125,
	}, {
		title: '部门编号',
		key: 'department_code',
		align: 'center',
		width: 150,
	}, {
		title: '操作人员',
		key: 'rolename',
		align: 'center',
		width: 100,
	}, {
		title: '操作内容',
		key: 'operator',
		align: 'center',
		ellipsis: true
	}, {
		title: '时间',
		key: 'logtime',
		align: 'center',
		ellipsis: true
	}
	]
}

//部门管理
// 部门上传数据
export function deplistThead(that) {
	return [
	{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60

	},
	{
		title: '数据表单名称',
		align: 'center',
		key: 'form_name'
	}, {
		title: '对应预案类型',
		align: 'center',
		key: 'plan_type',
		//			render: (h, params) => {
		//				var arr = [];
		//				if(params.row.plan_type !== undefined) {
		//					params.row.plan_type.map((item) => {
		//						arr.push(item.plan_type);
		//					})
		//				}
		//				return h('div', {}, arr.join('、'));
		//			}
	},
	{
		title: '操作',
		align: 'center',
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row, params.index);
							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(params.row))
						}
					}
				}, '删除'),
			])
		}
	}
	]
}

//部门录用
export function employThead(that) {
	return [{
		title: '序号',
		width: 60,
		align: 'center',
		type: 'index'
	}, 
//	{
//		title: '全称',
//		align: 'center',
//		key: 'department_fullname'
//	},
//	{
//		title:'全称1',
//		align:'center',
//		key:'department_fullname'
//	},
	{
		title: '部门名称',
		align: 'center',
		key: 'department_name'
	}, {
		title: '数据表单名称',
		align: 'center',
		key: 'form_name'
	}, {
		title: '对应预案类型',
		align: 'center',
		key: 'plan_type'
	},
	{
		title: '操作',
		align: 'center',
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'info',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.luyong(data)
						}
					}
				}, '录入'),
				h('Button', {
					props: {
						type: 'warning',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.shangbao(data, params.index)
							//								that.shangbao(cloneObj(params.row))
						}
					}
				}, '上报'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(params.row))
						}
					}
				}, '删除'),
			])
		}
	}
	]
}
//录用新增页面
export function lyThead(that) {
	return [{
		title: '序号',
		align: 'center',
		width: 60,
		type: 'index'
	}, {
		title: '选项(一个)',
		align: 'center',
		width: 120,
		type: 'selection'
		//		render:(h,params)=>{
		//			return h('div',[
		//				h('Radio',{
		//					props:{
		//						type:'large'
		//					}
		//				})
		//			])
		//		}
	}, {
		title: '表单名称',
		align: 'center',
		key: 'form_name'
	}, {
		title: '对应预案类型',
		align: 'center',
		key: 'plan_type'
	}]
}

//录入页面
export function ReportThead(that) {
	return [{
		title: '序号',
		align: 'center',
		width: 60,
		type: 'index'
	}, {
		title: '栏位名称',
		align: 'center',
		key: '栏位名称',
		width: 150
	},
	{
		title: '栏位类型',
		align: 'center',
		key: '栏位类型',
		width: 120
	},
	{
		title: '栏位说明',
		align: 'center',
		key: '栏位说明'
	},
	{
		title: '栏位值填入',
		align: 'center',
		render: (h, params) => {
			return h('div', [
				h('Input', {
					props: {
						type: 'textarea',
						size: 'small',
					},
					on: {
						'input': (e) => {
							//							console.log(e);
							that.UserData[params.index]['custom_inputValue'] = e;
						}
					}
				})
			])
		}
	}
	]
}

//录入数据列表动态显示
export function shujuThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center'
	}, {
		title: '部门名称',
		align: 'center',
		key: 'department_name'
	}]
}

//查看列表
export function ListseanThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60
	}, {
		title: '部门名称',
		align: 'center',
		key: 'department_name'
	}, {
		title: '数据表单名称',
		align: 'center',
		key: 'form_name'
	}, {
		title: '对应预案类型',
		align: 'center',
		key: 'plan_type'
	}, {
		title: '操作',
		align: 'center',
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'info',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row);
							delete data['_index']
							delete data['_rowKey']
							that.details(data)
						}
					}
				}, '明细'),
			])
		}
	}]
}
//跳转明细后的
export function seansThead(that) {
	return [{
		title: '序号',
		align: 'center',
		width: 60,
		type: 'index'
	}, {
		title: '栏位名称',
		align: 'center',
		key: '栏位名称'
	}, {
		title: '栏位类型',
		align: 'center',
		key: '栏位类型'
	}, {
		title: '栏位说明',
		align: 'center',
		key: '栏位说明'
	}]
}

// 部门系统定义
export function depmanageThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60
	},
	{
		title: '部门名称',
		align: 'center',
		key: 'department_name'
	}, {
		title: '部门编号',
		align: 'center',
		key: 'department_code'
	}, {
		title: '部门级别',
		align: 'center',
		key: 'department_level'
	}, {
		title: '系统名称',
		align: 'center',
		key: 'system_name'
	}, {
		title: '系统访问地址',
		align: 'center',
		key: 'system_access'
	},
	{
		title: '操作',
		align: 'center',
		render: (h, param) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(param.row);
							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(param.row))
						}
					}
				}, '删除')
			])
		}
	}
	]
}
// 部门指令库管理
export function LiraryThead(that) {
	return [{
		type: 'index',
		title: '序号',
		width: 90,
		align: 'center'
	}, {
		title: '部门名称',
		align: 'center',
		key: 'department_name'
	}, {
		title: '部门编号',
		align: 'center',
		key: 'department_code',
		//		width: 100
	}, {
		title: '部门级别',
		align: 'center',
		key: 'department_level',
		//		width: 60
	},
	{
		title: '指令名称',
		align: 'center',
		key: 'instruction_name'
	},
	//	{
	//		title: '指令详细描述',
	//		align: 'center',
	//		key: 'instruction_desc'
	//	},
	//	{
	//		title: '指令执行部门',
	//		align: 'center',
	//		key: 'execute_department'
	//	}, 
	{
		title: '用户操作',
		align: 'center',
		render: (h, param) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(param.row);
							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(param.row))
						}
					}
				}, '删除')
			])
		}
	}]
}

//水库数据维护
export function shuikuThead(that) {
	return [
		{
			title: '名称',
			align: 'center',
			key: 'pool_name'
		}, {
			title: '镇(街)',
			align: 'center',
			key: 'town'
		}, {
			title: '主管部门',
			align: 'center',
			key: 'governor',
		}, {
			title: '地址',
			align: 'center',
			key: 'address'
		}, {
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//山塘数据维护
export function hillpool(that) {
	return [
		{
			title: '名称',
			align: 'center',
			key: '名称'
		}, {
			title: '主管部门',
			align: 'center',
			key: '主管部门',
		}, {
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//堤围数据
export function tiweiThead(that) {
	return [
		{
			title: '名称',
			align: 'center',
			key: 'dike_name'
		}, {
			title: '主管部门',
			align: 'center',
			key: 'governor'
		}, {
			title: '所在镇(街)',
			align: 'center',
			key: 'town'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//险段数据维护
export function derstamthead(that) {
	return [
		{
			title: '险段名称 ',
			align: 'center',
			key: 'danger_name'
		}, {
			title: '主管部门',
			align: 'center',
			key: 'governor',
		},
		{
			title: '所在镇(街)',
			align: 'center',
			key: 'town'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}


//江心洲数据维护
export function jiangxinThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: '名称'
		}, {
			title: '主管部门',
			align: 'center',
			key: '主管部门',
		},
		{
			title: '地理位置',
			align: 'center',
			key: '地理位置'
		},
		{
			title: '类型',
			align: 'center',
			key: '类型'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//外滩地
export function waitanThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: '名称'
		}, {
			title: '主管部门',
			align: 'center',
			key: '主管部门',
		},
		{
			title: '地址',
			align: 'center',
			key: '地址'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//堤上
export function tishanThead(that) {
	return [
		{
			title: '工程名称 ',
			align: 'center',
			key: '工程名称'
		}, {
			title: '地理位置',
			align: 'center',
			key: '地理位置',
		},
		{
			title: '所在河道',
			align: 'center',
			key: '所在河道'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//电力
export function dianlThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: '名称'
		}, {
			title: '地址',
			align: 'center',
			key: '地址',
		},
		{
			title: '主管部门',
			align: 'center',
			key: '主管部门'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}


//穿堤管道
export function ctgdThead(that) {
	return [
		{
			title: '穿堤管道名称 ',
			align: 'center',
			key: '穿堤管道名称'
		}, {
			title: '主管部门',
			align: 'center',
			key: '主管部门',
		},
		{
			title: '所在河道',
			align: 'center',
			key: '所在河道'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//码头
export function matouThead(that) {
	return [
		{
			title: '码头名称 ',
			align: 'center',
			key: '码头名称'
		}, {
			title: '主管部门',
			align: 'center',
			key: '主管部门',
		},
		{
			title: '所在河道',
			align: 'center',
			key: '所在河道'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//桥梁
export function qiaoliangThead(that) {
	return [
		{
			title: '桥梁名称 ',
			align: 'center',
			key: '桥梁名称'
		}, {
			title: '主管部门',
			align: 'center',
			key: '主管部门',
		},
		{
			title: '所在河道',
			align: 'center',
			key: '所在河道'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//景点
export function jingdianThead(that) {
	return [
		{
			title: '景点名称 ',
			align: 'center',
			key: 'name'
		}, {
			title: '主管部门',
			align: 'center',
			key: 'governor',
		},
		{
			title: '地址',
			align: 'center',
			key: 'address'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//三棚
export function sanpengThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: '名称'
		}, {
			title: '建筑地址',
			align: 'center',
			key: '建筑地址',
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}
//仓库
export function cangkuThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: 'name'
		}, {
			title: '地址',
			align: 'center',
			key: 'address',
		},
		{
			title: '主管部门',
			align: 'center',
			key: 'town'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//重要设备
export function zhongtsbThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: 'name'
		}, {
			title: '地址',
			align: 'center',
			key: 'address',
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}


//危房
export function weifangThead(that) {
	return [{
		title: '建筑地址',
		align: 'center',
		key: '建筑地址',
	}, {
		title: '主管部门',
		align: 'center',
		key: '主管部门'
	},
	{
		title: '用户操作',
		align: 'center',
		width: 180,
		render: (h, param) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {

							let data = cloneObj(param.row);

							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(param.row))
						}
					}
				}, '删除')
			])
		}
	}
	]
}


//危险化学品重点企业维护
export function weixianThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: '名称'
		}, {
			title: '地址',
			align: 'center',
			key: '地址',
		},
		{
			title: '主管部门',
			align: 'center',
			key: '主管部门'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}


//学校
export function schoolThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: 'name'
		}, {
			title: 'charge_company',
			align: 'center',
			key: 'charge_company',
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//气象
export function qixiangThead(that) {
	return [
		{
			title: '名称 ',
			align: 'center',
			key: 'stn_name'
		}, {
			title: '主管部门',
			align: 'center',
			key: 'town',
		}, {
			title: '编号',
			align: 'center',
			key: 'stn_no'
		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}

//gongdi
export function gongdiThead(that) {
	return [
		{
			title: '工程名称 ',
			align: 'center',
			key: '工程名称'
		}, {
			title: '地址',
			align: 'center',
			key: '地址',
		},
		{
			title: '主管部门',
			align: 'center',
			key: '主管部门'
		},
//		{
//			title: '所在镇(街)',
//			align: 'center',
//			key: 'town'
//		},
		{
			title: '用户操作',
			align: 'center',
			width: 180,
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {

								let data = cloneObj(param.row);

								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				])
			}
		}
	]
}


//涉及社区
export function shequThead(that) {
	return [
		{
			title: '社区',
			align: 'center'
		}, {
			title: '需要转移人数',
			align: 'center'
		}, {
			title: '已转移人数',
			align: 'center'
		}, {
			title: '时间',
			align: 'center'
		}
	]
}

//部门列表
export function bumenlistThead(that) {
	return [{
		title: '部门',
		key: 'name',
		align: 'center',

		render: (h, param) => {
			let str = param.row.name
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}

			}, str)

		}
	}, {
		title: '全称',
		key: 'fullname',
		align: 'center',

		render: (h, param) => {
			let str = param.row.fullname
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	},
	{
		title: '部门编号',
		key: 'code',
		align: 'center'
	},
	{
		title: '当前部门层级',
		key: 'level',
		align: 'center',
		render: (h, param) => {
			let str = param.row.level
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	}, {
		title: '层级1',
		key: 'level1',
		align: 'center',

		render: (h, param) => {
			let str = param.row.level1
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	}, {
		title: '层级2',
		key: 'level2',
		align: 'center',

		render: (h, param) => {
			let str = param.row.level2
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	}, {
		title: '层级3',
		key: 'level3',
		align: 'center',

		render: (h, param) => {
			let str = param.row.level3
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	}, {
		title: '层级4',
		key: 'level4',
		align: 'center',

		render: (h, param) => {
			let str = param.row.level4
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	}, {
		title: '层级5',
		key: 'level5',
		align: 'center',

		render: (h, param) => {
			let str = param.row.level5
			return h('div', {
				'class': {
					'table-warpper': true
				},
				attrs: {
					title: str
				}
			}, str)

		}
	}, {
		title: '用户操作',
		align: 'center',
		width: 200,
		render: (h, param) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(param.row);
							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(param.row))
						}
					}
				}, '删除')
			]);
		}
	}
	]
}

//用户管理
export function usermanageThead(that) {
	return [
		{
			title: '系统',
			key: 'system_name',
			align: 'center',

		},
		{
			title: '用户账号',
			key: 'username',
			align: 'center',

		}, {
			title: '用户名称',
			key: 'realname',
			align: 'center',

		}, {
			title: '用户角色',
			//		render: (h, param) => {
			//			var arr = [];
			//			if (param.row.roles !== undefined) {
			//				param.row.roles.map((item) => {
			//					arr.push(item.rolename);
			//				})
			//			}
			//			return h('div', {}, arr.join('、'));
			//		},
			key: 'role',
			align: 'center',

		}, {
			title: '用户操作',
			align: 'center',
			render: (h, param) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								let data = cloneObj(param.row);
								delete data['_index']
								delete data['_rowKey']
								that.edit(data)
							}
						}
					}, '编辑'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
								that.del(cloneObj(param.row))
							}
						}
					}, '删除')
				]);
			}
		}]
}

//角色管理
export function rolemanageThaed(that) {
	return [{
		title: '角色名称',
		key: 'rolename',
		align: 'center',

	}, {
		title: '角色描述',
		key: 'description',
		align: 'center',

	}, {
		title: '用户操作',
		align: 'center',

		render: (h, param) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {

							let data = cloneObj(param.row);

							delete data['_index']
							delete data['_rowKey']
							that.edit(data)
						}
					}
				}, '编辑'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							that.del(cloneObj(param.row))
						}
					}
				}, '删除')
			])
		}
	}]
}

// 模块管理
export function mokuaiThead() {
	return [{
		title: "功能模块名称",
		key: "name",
		align: "center"
	}, {
		title: "所属层级",
		key: "level",
		align: "center"
	}, {
		title: "层级1",
		key: "level1",
		align: "center"
	}, {
		title: "层级2",
		key: "level2",
		align: "center"
	}, {
		title: "层级3",
		key: "level3",
		align: "center"
	}, {
		title: "系统名称",
		key: "system_name",
		align: "center"
	}]

}

// 任务
export function taskThead(that) {
	return [{
		title: ' ',
		type: 'index',
		align: 'center',
		width: 50,
	}, {
		title: '成员部门',
		key: 'department_name',
		align: 'center',
		width: 150
	}, {
		title: '应急响应级别',
		key: 'response_level',
		align: 'center',
		width: 120
	}, {
		title: '任务类型',
		key: 'task_type',
		align: 'center',
		width: 150
	}, {
		title: '任务概要',
		key: 'task_profile',
		align: 'center'
	}, {
		title: '任务计划开始时间',
		key: 'plan_startdate',
		align: 'center',
		width: 135
	}, {
		title: '任务计划结束时间',
		key: 'plan_enddate',
		align: 'center',
		width: 135
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 125,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, '详情'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.edit(data)
						}
					}
				}, '编辑')
			]);
		}
	}]
}

//数据表格
export function dataThead(that) {
	return [{
		title: '序号',
		width: 60,
		align: 'center',
		type: 'index'
	}, {
		title: '部门名称',
		align: 'center',
		key: 'department_name'
	}, {
		title: '数据表单名称',
		align: 'center',
		key: 'form_name'
	}, {
		title: '对应预案类型',
		align: 'center',
		key: 'plan_type'
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 125,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, '详情')
			]);
		}
	}]
}

// 通讯录管理
export function addressBookThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '姓名',
		key: 'name',
		align: 'center',
		width: 150
		// }, {
		// 	title: '性别',
		// 	key: 'gender',
		// 	align: 'center',
		// 	width: 120
	}, {
		title: '手机号码',
		key: 'telephoe',
		align: 'center',
		width: 150
	}, {
		title: '所属部门',
		key: 'department_name',
		align: 'center'
	}, {
		title: '部门级别',
		key: 'department_level',
		align: 'center',
		width: 135
	}, {
		title: '职责',
		key: 'duty',
		align: 'center',
		width: 135
	}, {
		title: '职责描述',
		key: 'duty_desc',
		align: 'center'
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 125,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.edit(data)
						}
					}
				}, '修改'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.delete(data)
						}
					}
				}, '删除')
			]);
		}
	}]
}

// 巡查任务记录
export function patrolRecordThead(that) {
	return [{
		title: '序号',
		type: 'index',
		align: 'center',
		width: 60,
	}, {
		title: '任务编号',
		key: 'task_no',
		align: 'center',
		width: 150
	}, {
		title: '标题',
		key: 'title',
		align: 'center',
		width: 120
	}, {
		title: '所属部门',
		key: 'department_name',
		align: 'center'
	}, {
		title: '部门级别',
		key: 'department_level',
		align: 'center',
		width: 135
	}, {
		title: '巡查地点',
		key: 'address',
		align: 'center',
		width: 135
	}, {
		title: '任务描述',
		key: 'description',
		align: 'center'
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 170,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, '详情'),
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.edit(data)
						}
					}
				}, '修改'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.delete(data)
						}
					}
				}, '删除')
			]);
		}
	}]
}

// 巡查任务安排
export function patrolPlanThead(that) {
	return [{
		type: 'selection',
		width: 60,
		align: 'center'
	}, {
		title: '任务编号',
		key: 'task_no',
		align: 'center',
		width: 150
	}, {
		title: '标题',
		key: 'title',
		align: 'center',
		width: 120
	}, {
		title: '状态',
		key: 'status',
		align: 'center',
		width: 120
	}, {
		title: '执行部门',
		key: 'department_name',
		align: 'center'
	}, {
		title: '部门级别',
		key: 'department_level',
		align: 'center',
		width: 135
	}, {
		title: '计划任务开始时间',
		key: 'plan_startdt',
		align: 'center',
		width: 135
	}, {
		title: '计划任务结束时间',
		key: 'plan_enddt',
		align: 'center'
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 170,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, '详情'),
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.edit(data)
						}
					}
				}, '修改'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.delete(data)
						}
					}
				}, '删除')
			]);
		}
	}]
}

// 收文处理
export function addresseeThead(that) {
	return [{
		type: 'selection',
		width: 60,
		align: 'center'
	}, {
		title: '发件人',
		key: 'releaseby',
		width: 150,
		render: (h, params) => {
			return h('div', [
				h('a', {
					props: {
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, params.row.releaseby)
			])
		}
	}, {
		title: '标题',
		key: 'title',
		render: (h, params) => {
			return h('div', [
				h('a', {
					props: {
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, params.row.title)
			])
		}
	},
		// {
		// 	title: '操作',
		// 	key: 'edit',
		// 	align: 'center',
		// 	width: 180,
		// 	render: (h, params) => {
		// 		return h('div', [
		// 			h('Button', {
		// 				props: {
		// 					type: 'primary',
		// 					size: 'small'
		// 				},
		// 				style: {
		// 					marginRight: '5px'
		// 				},
		// 				on: {
		// 					click: () => {
		// 						let data = cloneObj(params.row)
		// 						delete data._index
		// 						delete data._rowKey
		// 						that.details(data)
		// 					}
		// 				}
		// 			}, '详情'),
		// 			h('Button', {
		// 				props: {
		// 					type: 'primary',
		// 					size: 'small'
		// 				},
		// 				style: {
		// 					marginRight: '5px'
		// 				},
		// 				on: {
		// 					click: () => {
		// 						let data = cloneObj(params.row)
		// 						delete data._index
		// 						delete data._rowKey
		// 						that.edit(data)
		// 					}
		// 				}
		// 			}, '修改'),
		// 			h('Button', {
		// 				props: {
		// 					type: 'error',
		// 					size: 'small'
		// 				},
		// 				on: {
		// 					click: () => {
		// 						let data = cloneObj(params.row)
		// 						delete data._index
		// 						delete data._rowKey
		// 						that.delete(data)
		// 					}
		// 				}
		// 			}, '删除')
		// 		]);
		// 	}
		// }
	]
}

// 收文处理
export function draftThead(that) {
	return [{
		type: 'selection',
		width: 60,
		align: 'center'
	}, {
		title: '收件部门',
		key: 'department_code',
		width: 150,
		render: (h, params) => {
			return h('div', [
				h('a', {
					props: {
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, "未填写")
			])
		}
	}, {
		title: '标题',
		key: 'title',
		render: (h, params) => {
			return h('div', [
				h('a', {
					props: {
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, params.row.title)
			])
		}
	}
	]
}

// 通知公告
export function noticeThead(that) {
	return [{
		type: 'selection',
		width: 60,
		align: 'center'
	}, {
		title: '标题',
		key: 'title',
		align: 'center',
		width: 150
	}, {
		title: '内容',
		key: 'notice_desc',
		align: 'center'
	}, {
		title: '状态',
		key: 'status',
		align: 'center',
		width: 150
	}, {
		title: '起草人',
		key: 'createby',
		align: 'center',
		width: 80
	}, {
		title: '起草时间',
		key: 'createdt',
		align: 'center',
		width: 135
	}, {
		title: '操作',
		key: 'edit',
		align: 'center',
		width: 180,
		render: (h, params) => {
			return h('div', [
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.details(data)
						}
					}
				}, '详情'),
				h('Button', {
					props: {
						type: 'primary',
						size: 'small'
					},
					style: {
						marginRight: '5px'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.edit(data)
						}
					}
				}, '修改'),
				h('Button', {
					props: {
						type: 'error',
						size: 'small'
					},
					on: {
						click: () => {
							let data = cloneObj(params.row)
							delete data._index
							delete data._rowKey
							that.delete(data)
						}
					}
				}, '删除')
			]);
		}
	}]
}

// 短信管理 发信
export function noteSendThead(that) {
	return [{
		type: 'selection',
		width: 60,
	}, {
		title: '状态',
		key: 'status',
		width: 150
	}, {
		title: '标题',
		key: 'title',
		width: 150
	}, {
		title: '短信内容',
		key: 'message_content'
	}, {
		title: '创建时间',
		key: 'createdt'
	}]
}

// 资料管理
export function dataMagThead(that) {
	return [{
		type: 'selection',
		width: 60
	}, {
		title: '文件名',
		key: 'refer_name',
		render: (h, params) => {
			let icon = ''
			let color = ''
			if (params.row.refer_name.indexOf('.') > -1) {
				icon = 'document-text'
				color = '#b9c9d6'
			} else {
				icon = 'folder'
				color = '#ffd659'
			}
			return h('div', [
				h('Icon', {
					props: {
						type: icon
					},
					style: {
						color: color,
						fontSize: '30px',
					}
				}),
				function () {
					if(params.row.isFolder){
						return h('a', {
							style: {
								position: 'relative',
								top: '-6px',
								left: '5px',
							},
							on: {
								click: () => {
									let data = cloneObj(params.row)
									delete data._index
									delete data._rowKey
									that.details(data)
								}
							}
						}, params.row.refer_name)
					}else{
						return h('span', {
							style: {
								position: 'relative',
								top: '-6px',
								left: '5px',
							}
						}, params.row.refer_name)
					}
				}(),
			])
		}
	}, {
		title: '创建人',
		key: 'createby',
		width: 150
	}, {
		title: '创建日期',
		key: 'createdt',
		width: 200,
	}]
}

//数据一张图-台风路径列表
export function typhoonListThead(that) {
	return [{
		type: 'checkbox',
		width: 60,
		align: 'center',
		render: (h, params) => {
			return h('Checkbox', {
				props: {
					value: params.row.is_current === 1
				},
				on: {
					'on-change': (bol) => {
						that.choseTyphoon(bol, params);
					}
				}
			});
		}
	}, {
		title: '编号',
		key: 'tfbh',
		align: 'center'
	}, {
		title: '中文名',
		key: 'name',
		align: 'center'
	}, {
		title: '英文名',
		key: 'ename',
		align: 'center'
	}]
}