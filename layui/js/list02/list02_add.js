

layui.use(['element', 'table', 'jquery', 'form', 'layer'], function(){
	let element = layui.element;
  	let $ = layui.$;
  	let table = layui.table;
  	let form = layui.form;
  	let layer = layui.layer;

  	let _count=0;

  	// 渲染初始表格
  	let userTable = table.render({
	    elem: '#userTable',
	    height: 'full-200',
	    data: [],
	    page: true,
	    size: 'lg',
	    cols:[[
        	{field: 'userType', title: '人员类别', hide: true    },
            {field: 'userTypeDictName', title: '人员类别', templet: '#selectDict'     },
            {field: 'schedulDeptid', title: '调度单位', hide: true    },
            {field: 'schedulDeptname', title: '调度单位', event: 'selectSchedulDept'},
   		 	{field: 'preScope' , title: '优先调度范围' , hide: true   },
   		 	{field: 'preScopeDictName', title: '优先调度范围', templet: '#selectPreScopeDictName'},
   		 	{field: 'isSystemnotice' , title: '系统通知' , hide: true   },
            {field: 'isSystemnoticeDictName', title: '系统通知', templet: '#isSystemnotice'   },

            {align: 'center', toolbar: '#tableBar', title: '操作', width: 300}
	    ]],
	    done: function (res, curr, count) { 
 			$(".layui-table-body, .layui-table-box, .layui-table-cell").find("select").parent().css('overflow', 'visible');
 			$("select[name='userType']").html(epotOption(dict));
            form.render();
	    }

  	});

  	//	添加人员调度行数
	$('#userAddBtn').click(function() {
		var oldData = layui.table.cache.userTable;
		var newData={
				"LAY_TABLE_INDEX": "",
				"userType": "",
				"userTypeDictName": "",
				"schedulDeptid": "",
				"schedulDeptname": "",
				"preScope": "",
				"preScopeDictName": "",
				"isSystemnotice": "0",
				"isSystemnoticeDictName": "否",
				"isAppnotice": "0",
				"isAppnoticeDictName": "否",
				"isSmsnotice": "0",
				"isSmsnoticeDictName": "否",
				"isWxnotice": "0",
				"isWxnoticeDictName": "否"
		}

		oldData.push(newData);
		table.reload('userTable', {data:oldData});
		
	});



})