import loading from 'base/loading/loading'
import interactModel from 'base/interact-model/interact-model'

// 加载中
// export const loadingMixin = {
// 	components: {
// 		'loading': loading
// 	}
// }
//可移动模态框
export const interactModelMixin = {
	components: {
		'interact-model': interactModel
	}
}

//公用组件mixin

//loading
// import loading from 'base/loading/loading.vue';
export const loadingMixin = {
	components: {
		'loading': loading
	}
}

//指挥状态下loading
import commandLoading from 'base/loading/command-loading.vue';
export const commandLoadingMixin = {
	components: {
		'command-loading': commandLoading
	}
}

//自定义滚动条
import scroll from 'base/scroll/scroll.vue';
export const scrollMixin = {
	components: {
		'scroll': scroll
	}
}

//左右无限滚动
import roll from 'base/roll/roll.vue';
export const rollMixin = {
	components: {
		'roll': roll
	}
}

//页面小标题
import baseTitle from 'base/base-title/base-title.vue';
export const baseTitleMixin = {
	components: {
		'base-title': baseTitle
	}
}


//错误消息警告框
import warnModel from 'base/warn-model/warn-model.vue';
export const warnModelMixin = {
	components: {
		'warn-model': warnModel
	}
}

//提示信息框
import comfimModel from 'base/comfim-model/comfim-model.vue';
export const comfimModelMixin = {
	components: {
		'comfim-model': comfimModel
	}
}

//正常情况下模态框
import normalMaskModel from 'base/normal-mask-model/normal-mask-model.vue';
export const normalMaskModelMixin = {
	components: {
		'normal-mask-model': normalMaskModel
	}
}
