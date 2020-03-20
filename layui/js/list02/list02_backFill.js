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

	table.on('tool(fillBackTab)',  function(obj){
		let data = obj.data;
		let event = obj.event;

		if (event === 'select') {
			let parentData = parent.layui.table.cache.list02Tab;
			for(let [index, item] of parentData.entries()){
				if (index == getUrlParam("rowIndex")) {
					item.pkeyTabPV = data.pkeyTabPV;
				}
			}
			//	重新渲染父页面的表格
			parent.tab.reload({data:parentData});

			//关闭弹窗
		    var index = parent.layer.getFrameIndex(window.name);
		    parent.layer.close(index);
		}
	})

	// 监听多选
	table.on('checkbox(fillBackTab)', function(obj){
		// console.log(obj.checked); //当前是否选中状态
	 //  	console.log(obj.data); //选中行的相关数据
	 //  	console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
	  	
	  	let data = obj.data;
	  	let type = obj.type;
	  	let arr =[];
	  	if (obj.checked) {
		  	if (type == 'one') {
		  		arr.push(obj.data.pkeyTabPV)
		  	}else{
		  		if (arr.length !=0) {
		  			arr =[];
		  		}
		  		let tabData = fillBackTab.config.data;
		  		for(let item of tabData.values()){
		  			arr.push(item.pkeyTabPV)
		  		}
		  	}
	  	}else{
	  		//TODO: 取消选中的时候,要去掉数组里面相对应的数据
	  	}
	  	console.log("arr=============>", arr)





	});







})