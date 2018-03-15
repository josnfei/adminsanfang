// 应急响应管理
export function erManagementQuery() {
    return {
        typeList: [
            {
                value: '防风',
                key: '防风',
                label: '防风'
            },
            {
                value: '防汛',
                key: '防汛',
                label: '防汛'
            },
            {
                value: '防旱',
                key: '防旱',
                label: '防旱'
            },
            {
                value: '防暴雨',
                key: '防暴雨',
                label: '防暴雨'
            }
        ],
        levelList: [
            {
                value: 'I级',
                key: 'I级',
                label: 'I级'
            },
            {
                value: 'II级',
                key: 'II级',
                label: 'II级'
            },
            {
                value: 'III级',
                key: 'III级',
                label: 'III级'
            },
            {
                value: 'VI级',
                key: 'VI级',
                label: 'VI级'
            }

        ],
        statusList: [
            {
                value: '未启动',
                key: '未启动',
                label: '未启动'
            },
            {
                value: '启动',
                key: '启动',
                label: '启动'
            },
            {
                value: '关闭',
                key: '关闭',
                label: '关闭'
            }
        ]
    }
}

// 应急响应级别
export function erLevelQuery() {
    return {
        typeList: [
            {
                value: '防风',
                key: '防风',
                label: '防风'
            },
            {
                value: '防汛',
                key: '防汛',
                label: '防汛'
            },
            {
                value: '防旱',
                key: '防旱',
                label: '防旱'
            },
            {
                value: '防暴雨',
                key: '防暴雨',
                label: '防暴雨'
            }
        ],
        levelList: [
            {
                value: 'I级',
                key: 'I级',
                label: 'I级'
            },
            {
                value: 'II级',
                key: 'II级',
                label: 'II级'
            },
            {
                value: 'III级',
                key: 'III级',
                label: 'III级'
            },
            {
                value: 'IV级',
                key: 'IV级',
                label: 'IV级'
            }
        ]
    }
}

// 联合值守看板
export function erCardQuery() {
    return {
        typeList: [
            {
                value: '防风',
                key: '防风',
                label: '防风'
            },
            {
                value: '防汛',
                key: '防汛',
                label: '防汛'
            },
            {
                value: '防旱',
                key: '防旱',
                label: '防旱'
            },
            {
                value: '防暴雨',
                key: '防暴雨',
                label: '防暴雨'
            }
        ],
        departmentList: [
            {
                value: '水务局',
                key: '水务局',
                label: '水务局'
            }
        ]
    }
}

// 部门预案
export function depPlanQuery() {
    return {
        depList: [
            {
                value: '区三防办',
                key: '区三防办',
                label: '区三防办'
            },
            {
                value: '区国土城建',
                key: '区国土城建',
                label: '区国土城建'
            },
            {
                value: '水务局',
                key: '水务局',
                label: '水务局'
            }
        ],
        statusList: [
            {
                value: '草稿',
                key: '草稿',
                label: '草稿'
            },
            {
                value: '待审批',
                key: '待审批',
                label: '待审批'
            },
            {
                value: '生效',
                key: '生效',
                label: '生效'
            },
            {
                value: '失效',
                key: '失效',
                label: '失效'
            }
        ],
        draftsmanList: [
            {
                value: '小明',
                key: '小明',
                label: '小明'
            },
            {
                value: '小红',
                key: '小红',
                label: '小红'
            }
        ]
    }
}

// 预案审批
export function approvalQuery() {
    return {
        depList: [
            {
                value: '区三防办',
                key: '区三防办',
                label: '区三防办'
            },
            {
                value: '区国土城建',
                key: '区国土城建',
                label: '区国土城建'
            },
            {
                value: '水务局',
                key: '水务局',
                label: '水务局'
            }
        ],
        draftsmanList: [
            {
                value: '小明',
                key: '小明',
                label: '小明'
            },
            {
                value: '小红',
                key: '小红',
                label: '小红'
            }
        ]
    }
}

// 任务预设
export function depTaskQuery() {
    return {
        depList: [
            {
                value: '区三防办',
                key: '区三防办',
                label: '区三防办'
            },
            {
                value: '区国土城建',
                key: '区国土城建',
                label: '区国土城建'
            },
            {
                value: '水务局',
                key: '水务局',
                label: '水务局'
            }
        ],
        typeList: [
            {
                value: '日常任务',
                key: '日常任务',
                label: '日常任务'
            },
            {
                value: '事前任务',
                key: '事前任务',
                label: '事前任务'
            },
            {
                value: '事中任务',
                key: '事中任务',
                label: '事中任务'
            },
            {
                value: '事后任务',
                key: '事后任务',
                label: '事后任务'
            }
        ]
    }
}