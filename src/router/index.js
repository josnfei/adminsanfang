import Vue from 'vue';
import Router from 'vue-router';
import { getUserIng } from '../common/js/util';
import { options } from '../api/config'
import iView from 'iview';
import { getLocalStorage } from 'common/js/dom'

Vue.use(Router);

// 登录
const Login = () =>
	import('components/login/login')

// 首页
const Home = () =>
	import('components/home/home')

// 首页内容
const HomeDefault = () =>
	import('components/default/default')

// 三防业务
const ThreeBusiness = () =>
	import('components/three-business/three-business')

// 部门预案
const ThreeBusinessDefault = () =>
	import('components/three-business/budgetManagement/three-business-default')

// 应急预案
const erpDefault = () =>
	import('components/three-business/budgetManagement/er_plan/erp_default')

// 总则
const general = () =>
	import('components/three-business/budgetManagement/er_plan/general')

// 组织机构
const organization = () =>
	import('components/three-business/budgetManagement/er_plan/organization')

// 预警预防
const warning = () =>
	import('components/three-business/budgetManagement/er_plan/warning')

// 保障措施
const security = () =>
	import('components/three-business/budgetManagement/er_plan/security')

// 应急响应行动
const erAction = () =>
	import('components/three-business/budgetManagement/er_plan/er_action')

// 善后工作
const aftermath = () =>
	import('components/three-business/budgetManagement/er_plan/aftermath')

// 任务执行
const taskActive = () =>
	import('components/three-business/budgetManagement/er_plan/taskActive')

// 培训与演练
const training = () =>
	import('components/three-business/budgetManagement/er_plan/training')

// 人员转移安置
const transfer = () =>
	import('components/three-business/budgetManagement/er_plan/transfer')

// 数据表格
const dataTable = () =>
	import('components/three-business/budgetManagement/er_plan/data_table')

// 社区预案
const ThreeBusinessCommunity = () =>
	import('components/three-business/budgetManagement/three-business-community')

// 专题预案
const ThreeBusinessTopic = () =>
	import('components/three-business/budgetManagement/three-business-topic')

// 预案审批
const ThreeBusinessApproval = () =>
	import('components/three-business/budgetManagement/three-business-approval')

// 演练计划
const prPlan = () =>
	import('components/three-business/practiceManagement/pr-plan')

// 演练任务
const prTask = () =>
	import('components/three-business/practiceManagement/pr-task')

// 演练角色
const prRole = () =>
	import('components/three-business/practiceManagement/pr-role')

// 初始化数据
const prData = () =>
	import('components/three-business/practiceManagement/pr-data')

// 演练报告
const prReport = () =>
	import('components/three-business/practiceManagement/pr-report')

// 预设任务
const psTask = () =>
	import('components/three-business/taskManagement/preset_task')

// 任务管理
const magTask = () =>
	import('components/three-business/taskManagement/task_manag')

// 应急响应管理
const erManagement = () =>
	import('components/three-business/emResponse/er-management')

// 应急响应级别
const erLevel = () =>
	import('components/three-business/emResponse/er-level')

// 应急响应反馈
const erCard = () =>
	import('components/three-business/emResponse/er-card')

// 部门管理
const depManagement = () =>
	import('components/dep-management/dep-management')

// 日常办公
const DailyOffice = () =>
	import('components/daily-office/daily-office')

// 报表汇总
const TabSummary = () =>
	import('components/tab-summary/tab-summary')

// 系统管理
const SystemManagement = () =>
	import('components/system-management/system-management')

//用户管理
const Usermanage = () =>
	import('components/system-management/Usermanage')
// import usermanage from '../components/system-management/Usermanage.vue'

//角色管理
const RoleManage = () =>
	import('components/system-management/RoleManage')
// import roleManage from '../components/system-management/RoleManage.vue'

//部门列表
const bumenlist = () =>
	import('components/system-management/bumenlist')
// import bumenlist from '../components/system-management/bumenlist.vue'

//模块管理
const mokuaiguanli = () =>
	import('components/system-management/mokuaiguanli')
// import mokuaiguanli from '../components/system-management/mokuaiguanli.vue'

// 部门管理数据上传
const deplist = () =>
	import('components/dep-management/dep/deplist')

// 上传的新增页面
const addpage = () =>
	import('components/dep-management/pagemodel/addpage')

//部门录用
const Employment = () =>
	import('components/dep-management/dep/Employment')

//部门录用
const TaslEmployment = () =>
	import('components/dep-management/pagemodel/Report')

//录用新增
const lypage = () =>
	import('components/dep-management/pagemodel/lypage')

//录入页面
const Report = () =>
	import('components/dep-management/pagemodel/Report')

//上报查看
const Listsean = () =>
	import('components/dep-management/dep/Listsean')

//明细
const seans = () =>
	import('components/dep-management/pagemodel/seans')

// 部门管理1-2
const relist = () =>
	import('components/dep-management/dep/relist')

// 部门系统定义
const definition = () =>
	import('components/dep-management/definition')

// 部门指令库管理
const Library = () =>
	import('components/dep-management/Library')

// 学校数据维护
const school = () =>
	import('components/dep-management/plan/school')
	
//学校新增
const schoolweihu = () =>
	import('components/dep-management/weihu/schoolweihu')
	
//水库数据维护
const shuiku = () =>
	import('components/dep-management/plan/shuiku')

//水库数据维护新增
const shuikuweihu = () =>
	import('components/dep-management/weihu/shuikuweihu')

//山塘数据维护
const hillpool = () =>
	import('components/dep-management/plan/hillpool')

//山塘数据维护新增
const shantangweihu = () =>
	import('components/dep-management/weihu/shantangweihu')

//水库险段数据维护
//const xianduan = () =>
//	import('components/dep-management/plan/xianduan')

//险段数据维护
const derstam = () =>
	import('components/dep-management/plan/derstam')

//险段数据维护新增
const derstamadd = () =>
	import('components/dep-management/weihu/derstamadd')

//堤围基础数据维护
const tiwei = () =>
	import('components/dep-management/plan/tiwei')

//堤围基础数据维护新增
const tiweiweihu = () =>
	import('components/dep-management/weihu/tiweiweihu')

//江心洲数据维护
const jiangxin = () =>
	import('components/dep-management/plan/jiangxin')

//江心洲数据新增
const jiangxinweihu = () =>
	import('components/dep-management/weihu/jiangxinweihu')

//外滩地
const waitandi = () =>
	import('components/dep-management/plan/waitandi')

//外滩地新增
const waitandiweihu = () =>
	import('components/dep-management/weihu/waitandiweihu')

//堤上在建工程
const tishan = () =>
	import('components/dep-management/plan/tishan')

//堤上在建工程
const tishanweihu = () =>
	import('components/dep-management/weihu/tishanweihu')

//      穿堤管道
const ctgd = () =>
	import('components/dep-management/plan/ctgd')

//穿堤管道新增
const chuantiguandaoweihu = () =>
	import('components/dep-management/weihu/chuantiguandaoweihu')

//码头数据维护	
const matou = () =>
	import('components/dep-management/plan/matou')

//码头数据新增
const matouweihu = () =>
	import('components/dep-management/weihu/matouweihu')

//桥梁数据维护
const qiaoliang = () =>
	import('components/dep-management/plan/qiaoliang')

//桥梁新增
const qiaoliangweihu = () =>
	import('components/dep-management/weihu/qiaoliangweihu')

//景点数据维护
const jingdian = () =>
	import('components/dep-management/plan/jingdian')

//景点新增
const jingdianweihu = () =>
	import('components/dep-management/weihu/jingdianweihu')

//三棚数据维护
const sanpeng = () =>
	import('components/dep-management/plan/sanpeng')

//三棚新增
const sanpengweihu = () =>
	import('components/dep-management/weihu/sanpengweihu')	
	
	
//电力数据维护
const dl = () =>
	import('components/dep-management/plan/dl')
	
//电力新增
const diweihu = () =>
	import('components/dep-management/weihu/diweihu')		
	
//工地数据维护
const gongdi = () =>
	import('components/dep-management/plan/gongdi')
	
//工地新增
const gongdiweihu = () =>
	import('components/dep-management/weihu/gongdiweihu')		
	
//危险化学品
const weixians = () =>
	import('components/dep-management/plan/weixians')
	
//危险化学品新增
const weixianweihu = () =>
	import('components/dep-management/weihu/weixianweihu')	


//重要通信设备信息维护
const zhongysb = () =>
	import('components/dep-management/plan/zhongysb')
	
//重要通信设备信息维护新增
const zhongysbweihu = () =>
	import('components/dep-management/weihu/zhongysbweihu')



//危房基本信息维护
const weifang = () =>
	import('components/dep-management/plan/weifang')
	
//危房基本信息维护新增
const weifangweihu = () =>
	import('components/dep-management/weihu/weifangweihu')

//物资仓库维护
const cangku = () =>
	import('components/dep-management/plan/cangku')
	
//物资仓库新增
const cangkuweihu = () =>
	import('components/dep-management/weihu/cangkuweihu')
	
//气象站基本信息维护
const qixiang = () =>
	import('components/dep-management/plan/qixiang')
	
//气象站基本信息维护新增
const qixiangweihu = () =>
	import('components/dep-management/weihu/qixiangweihu')

// 通讯录管理
const AddressBook = () =>
	import('components/daily-office/address-book')

// 通讯录管理
const Notice = () =>
	import('components/daily-office/notice')

// 短信管理
const NoteMgr = () =>
	import('components/daily-office/note-management')

// 资料管理
const DataMgr = () =>
	import('components/daily-office/data-management')

// 专题订阅管理
const ThematicInformation = () =>
	import('components/daily-office/thematic-information')

// 收文处理
const Addressee = () =>
	import('components/daily-office/official-document/addressee')

// 发文处理
const Post = () =>
	import('components/daily-office/official-document/post')

// 指挥一张图
const ThreeCommand = () =>
	import('components/three-command/three-command')

// 移动管理
const MoveManagement = () =>
	import('components/move-management/move-management')

// 巡查任务安排
const PatrolPlan = () =>
	import('components/move-management/patrol/patrol-plan')

// 巡查任务记录
const PatrolRecord = () =>
	import('components/move-management/patrol/patrol-record')

const router = new Router({
	routes: [{
		path: "*",
		redirect: "/"
	},
	{
		path: '/',
		component: Login,
		meta: {
			nologin: true
		},
		component: Login
	},
	{
		path: '/home',
		redirect: '/home/default',
		component: Home,
		children: [{
			path: '/home/default',
			component: HomeDefault
		},
		{
			path: '/home/threeBusiness',
			redirect: '/home/threeBusiness/threeBusinessDefault',
			component: ThreeBusiness,
			children: [
				// 预案管理
				{
					path: '/home/threeBusiness/threeBusinessDefault',
					component: ThreeBusinessDefault
				},
				{
					path: '/home/threeBusiness/threeBusinessCommunity',
					component: ThreeBusinessCommunity
				},
				{
					path: '/home/threeBusiness/threeBusinessTopic',
					component: ThreeBusinessTopic
				},
				{
					path: '/home/threeBusiness/threeBusinessApproval',
					component: ThreeBusinessApproval
				},
				{
					path: '/home/threeBusiness/erp_default',
					redirect: '/home/threeBusiness/er_plan/general',
					component: erpDefault,
					children: [
						{
							path: '/home/threeBusiness/er_plan/general',
							component: general
						},
						{
							path: '/home/threeBusiness/er_plan/organization',
							component: organization
						},
						{
							path: '/home/threeBusiness/er_plan/warning',
							component: warning
						},
						{
							path: '/home/threeBusiness/er_plan/security',
							component: security
						},
						{
							path: '/home/threeBusiness/er_plan/er_action',
							component: erAction
						},
						{
							path: '/home/threeBusiness/er_plan/aftermath',
							component: aftermath
						},
						{
							path: '/home/threeBusiness/er_plan/taskActive',
							component: taskActive
						},
						{
							path: '/home/threeBusiness/er_plan/training',
							component: training
						},
						{
							path: '/home/threeBusiness/er_plan/transfer',
							component: transfer
						}, {
							path: '/home/threeBusiness/er_plan/dataTable',
							component: dataTable
						}, {
							path: '/home/threeBusiness/er_plan/seans',
							component: seans
						}
					]
				},
				// 演练管理
				{
					path: '/home/threeBusiness/prPlan',
					component: prPlan
				},
				{
					path: '/home/threeBusiness/prTask',
					component: prTask
				},
				{
					path: '/home/threeBusiness/prRole',
					component: prRole
				},
				{
					path: '/home/threeBusiness/prData',
					component: prData
				},
				{
					path: '/home/threeBusiness/prReport',
					component: prReport
				},
				// 应急响应
				{
					path: '/home/threeBusiness/erManagement',
					component: erManagement
				},
				{
					path: '/home/threeBusiness/erLevel',
					component: erLevel
				},
				{
					path: '/home/threeBusiness/erCard',
					component: erCard
				},
				// 任务管理
				{
					path: '/home/threeBusiness/psTask',
					component: psTask
				},
				{
					path: '/home/threeBusiness/magTask',
					component: magTask
				},
				{
					path: '/home/threeBusiness/employment/:name/:code/:depName/:level',
					component: TaslEmployment
				}
			]
		},
		// 部门管理
		{
			path: '/home/depManagement',
			component: depManagement,
			redirect: '/home/depManagement/definition',
			children: [
				{
					path: '/home/depManagement/deplist',
					component: deplist,
				}, {
					path: '/home/depManagement/Employment',
					component: Employment
				}, {
					path: '/home/depManagement/Listsean',
					component: Listsean
				},
				{
					path: '/home/depManagement/deplist/addpage',
					component: addpage
				},
				{
					path: '/home/depManagement/Employment/lypage',
					component: lypage
				},
				{
					path: '/home/depManagement/Employment/Report',
					component: Report
				},
				{
					path: '/home/depManagement/Listsean/seans',
					component: seans
				},
				{
					path: '/home/depManagement/relist',
					component: relist
				}, {
					path: '/home/depManagement/definition',
					component: definition
				}, {
					path: '/home/depManagement/Library',
					component: Library,
				}, {
					path: '/home/depManagement/school',
					component: school,
				},
				{
					path:'home/depManagement/school/schoolweihu',
					component:schoolweihu
				},
				{
					path:'/home/depManagement/shuiku',
					component:shuiku
				},{
					path:'home/depManagement/shuiku/shuikuweihu',
					component:shuikuweihu
				},{
					path:'/home/depManagement/hillpool',
					component:hillpool
				},
				{
					path: 'home/depManagement/hillpool/shantangweihu',
					component: shantangweihu
				},
				{
					path: '/home/depManagement/derstam',
					component: derstam
				},
				{
					path: 'home/depManagement/derstam/derstamadd',
					component: derstamadd
				},
				{
					path:'/home/depManagement/tiwei',
					component:tiwei
				},{
					path:'home/depManagement/tiwei/tiweiweihu',
					component:tiweiweihu
				},{
					path:'/home/depManagement/jiangxin',
					component:jiangxin
				},{
					path:'home/depManagement/jiangxin/jiangxinweihu',
					component:jiangxinweihu
				},{
					path:'/home/depManagement/waitandi',
					component:waitandi
				},{
					path:'home/depManagement/waitandi/waitandiweihu',
					component:waitandiweihu
				},{
					path:'/home/depManagement/tishan',
					component:tishan
				},{
					path:'home/depManagement/tishan/tishanweihu',
					component:tishanweihu
				},{
					path:'/home/depManagement/ctgd',
					component:ctgd
				},{
					path:'home/depManagement/ctgd/chuantiguandaoweihu',
					component:chuantiguandaoweihu
				},{
					path:'/home/depManagement/matou',
					component:matou
				},{
					path:'home/depManagement/matou/matouweihu',
					component:matouweihu
				},{
					path:'/home/depManagement/qiaoliang',
					component:qiaoliang
				},{
					path:'home/depManagement/qiaoliang/qiaoliangweihu',
					component:qiaoliangweihu
				},{
					path:'/home/depManagement/jingdian',
					component:jingdian
				},{
					path:'home/depManagement/jingdian/jingdianweihu',
					component:jingdianweihu
				},{
					path:'/home/depManagement/sanpeng',
					component:sanpeng
				},{
					path:'home/depManagement/sanpeng/sanpengweihu',
					component:sanpengweihu
				},{
					path:'/home/depManagement/dl',
					component:dl
				},{
					path:'home/depManagement/dl/diweihu',
					component:diweihu
				},{
					path:'/home/depManagement/gongdi',
					component:gongdi
				},{
					path:'home/depManagement/gongdi/gongdiweihu',
					component:gongdiweihu
				},{
					path:'/home/depManagement/weixians',
					component:weixians
				},{
					path:'home/depManagement/weixians/weixianweihu',
					component:weixianweihu
				},{
					path:'/home/depManagement/zhongysb',
					component:zhongysb
				},{
					path:'home/depManagement/zhongysb/zhongysbweihu',
					component:zhongysbweihu
				},{
					path:'/home/depManagement/weifang',
					component:weifang
				},{
					path:'home/depManagement/weifang/weifangweihu',
					component:weifangweihu
				},{
					path:'/home/depManagement/cangku',
					component:cangku
				},{
					path:'home/depManagement/cangku/cangkuweihu',
					component:cangkuweihu
				},{
					path:'/home/depManagement/qixiang',
					component:qixiang
				},{
					path:'home/depManagement/qixiang/qixiangweihu',
					component:qixiangweihu
				}
			]
		},
		// 日常办公
		{
			path: '/home/dailyOffice',
			redirect: '/home/dailyOffice/addressBook',
			component: DailyOffice,
			children: [
				{
					path: '/home/dailyOffice/addressBook',
					component: AddressBook
				},
				{
					path: '/home/dailyOffice/notice',
					component: Notice
				},
				{
					path: '/home/dailyOffice/dataManagement',
					component: DataMgr
				},
				{
					path: '/home/dailyOffice/noteManagement',
					component: NoteMgr
				},
				{
					path: '/home/dailyOffice/thematicInformation',
					component: ThematicInformation
				},
				{
					path: '/home/dailyOffice/addressee',
					component: Addressee
				},
				{
					path: '/home/dailyOffice/post',
					component: Post
				}
			]
		},
		// 报表汇总
		{
			path: '/home/tabSummary',
			component: TabSummary
		},
		// 移动管理
		{
			path: '/home/moveManagement',
			component: MoveManagement,
			redirect: '/home/moveManagement/patrol-plan',
			children: [{
				path: '/home/moveManagement/patrol-plan',
				component: PatrolPlan
			},{
				path: '/home/moveManagement/patrol-record',
				component: PatrolRecord
			}]
		},
		// 系统管理
		{
			path: '/home/systemManagement',
			component: SystemManagement,
			redirect: '/home/systemManagement/usermanage',
			children: [{
				path: '/home/systemManagement/usermanage',
				component: Usermanage
			},
			{
				path: '/home/systemManagement/roleManage',
				component: RoleManage
			},
			{
				path: '/home/systemManagement/mokuaiguanli',
				component: mokuaiguanli
			},
			{
				path: '/home/systemManagement/bumenlist',
				component: bumenlist
			}

			]
		},
		// 指挥一张图
		{
			path: '/home/threeCommand',
			component: ThreeCommand
		}
		]
	}
	]
})
router.beforeEach((to, from, next) => {
	getLocalStorage('formPath', from.path)
	// to and from are both route objects
	// 判断登录
	if (!to.meta.nologin) {
		if (options().headers.token === undefined) {
			router.push('/')
		} else {
			next()
		}
	} else {
		next()
	}
})
export default router