/**********
实现的功能:

---- 多个下拉框动态渲染
----选中进行值的回填至父页面
************/

layui.use(['element', 'table', 'jquery', 'form', 'layer'], function(){
	let element = layui.element;
  	let $ = layui.$;
  	let table = layui.table;
  	let form = layui.form;
  	let layer = layui.layer;

  	// 自动渲染下拉框,包括多个同时渲染 
  	getOption(dict);

  	// 渲染初始表格
  	let fillBackTab =table.render({
	    elem: '#fillBackTab',
	    height: 'full-200',
	    data: data,
	    page: true,
	    toolbar: '#toolbarDemo',
	    cols:[[
            {type: 'checkbox'},
			{field: 'reId', hide: true, title: '关联ID'},   
			{field: 'gctabId', title: '业务模型表' ,hide: true   },   
			{field: 'gctabIdPV'   , sort: true   , title: '业务模型表'},	  
			{field: 'gctabType', title: '业务表类型' ,hide: true   }, 
			{field: 'gctabTypeDictName' ,title: '业务表类型'},	
			{field: 'placeHolder'  , sort: true  ,title: '显示提示' ,},  
			{field: 'pkeyTab', title: '外键关联表' ,hide: true   },   
			{field: 'pkeyTabPV', sort: true  , title: '外键关联表' ,},

            {align: 'center', toolbar: '#tableBar', title: '操作', width: 300}
	    ]]

  	});

  	//	将值渲染回父页面
  	let fillBack = (data)=>{
  		let parentData = parent.layui.table.cache.list02Tab;
  		let d =[];// 有多个值传给父页面
		for(let [index, item] of parentData.entries()){
			if (index == getUrlParam("rowIndex")) {
				for(let val of data.values()){
					d.push(val.pkeyTabPV);
					item.pkeyTabPV = d;
				}
				item.pkeyTabPV = d;
			}
		}
		//	重新渲染父页面的表格
		parent.tab.reload({data:parentData});

		//关闭弹窗
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
  	}

	table.on('tool(fillBackTab)',  (obj)=>{
		let data = obj.data;
		let event = obj.event;
		// 单条选择
		if (event === 'select') {
			fillBack([data]);
		}
	});

  	//头工具栏事件(批量选择提交)
	table.on('toolbar(fillBackTab)', (obj)=>{
	    if (obj.event == 'batchBtn') {// 批量提交
	    	let checkStatus = table.checkStatus('fillBackTab');
	    	let data = checkStatus.data;
	    	fillBack(data);
	    }
	});





})