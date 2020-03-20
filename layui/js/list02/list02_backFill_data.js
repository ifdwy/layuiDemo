

// 下拉框选项
var dict={
	"type1":{
		"1":{"CODE":"1","NAME":"用户上报"},
		"2":{"CODE":"2","NAME":"固定执法"},
		"3":{"CODE":"3","NAME":"移动执法"},
		"4":{"CODE":"4","NAME":"系统预警"},
		"5":{"CODE":"5","NAME":"值守发现"}
	},

	"type2":{
		"1":{"CODE":"1","NAME":"日常调度"},
		"2":{"CODE":"2","NAME":"应急调度"}
	},

	"type3":{
		"1":{"CODE":"1","NAME":"已创建"},
		"2":{"CODE":"2","NAME":"待确定"},
		"3":{"CODE":"3","NAME":"待通知"},
		"4":{"CODE":"4","NAME":"待会商"},
		"5":{"CODE":"5","NAME":"待调度"},
		"6":{"CODE":"6","NAME":"待反馈"},
		"7":{"CODE":"7","NAME":"已反馈"}
	}
}

//	表格字段
var data =[
	{
		gctabTypeDictName: "增删改查表",
		gctabType: 0,
		metadataIdPV: "GCTAB_ID",
		dictTypeCode: "",
		defaultValue: "undefined",
		pkeyCol: "ID",
		gctabIdPV: "c_dev_gctabs",
		pkeyTabPV: "test1",
		metadataCd: "GCTAB_ID",
		pkeyGctabId: 2,
		metadataId: 1,
		itIskey: 1,
		gctabId: 0,
		updateUserDictName: "管理员",
		reId: 1,
		gctabCd: "c_dev_gctabs",
		itIslf: 1,
		placeHolder: "业务模型表",
		itIsbean: 1,
		itIsdict: 0,
		itIsaf: 1,
		updateUser: 1,
		dataLock: 0,
		updateTime: "2019-08-27 10:07:46",
		sort: 1,
		itIspkey: 0,
		itIsuf: 1,
		itIsdatafill: 1,
		itIsqf: 1,
		pkeyGctabIdPV: "c_dev_gcmetadatas",
		itIsextra: 1,
		pkeyTab: "gcmetadatas",
		pkeyDfReturn: "",
	},
	{
		gctabTypeDictName: "流程步骤视图",
		gctabType: 1,
		metadataIdPV: "GCTAB_CD",
		dictTypeCode: "",
		pkeyCol: "ID",
		gctabIdPV: "c_dev_gs",
		pkeyTabPV: "test2",
		metadataCd: "GCTAB_CD",
		pkeyGctabId: 0,
		metadataId: 2,
		itIskey: 0,
		gctabId: 1,
		reId: 2,
		gctabCd: "c_dev_gctabs",
		itIslf: 1,
		placeHolder: "数据表名",
		itIsbean: 1,
		itIsdict: 1,
		itIsaf: 1,
		dataLock: 0,
		updateTime: "2019-08-27 10:07:46",
		sort: 2,
		itIspkey: 1,
		itIsuf: 1,
		itIsdatafill: 1,
		itIsqf: 1,
		pkeyGctabIdPV: "--",
		itIsextra: 0,
		pkeyTab: "systabs",
		pkeyDfReturn: "gctabCd-gctabCd,gctabNa-gctabNa,schemaDb-schemaDb,bizNa-gctabNa,gctabCdPV-gctabCd",
	}
];