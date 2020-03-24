/**********
实现的功能:主要是在表格里加入表单元素

--对单元格进行编辑.开关选择器, 表格里的下拉框, 多选下拉框, 点击表格出现弹窗然后进行值的回填
************/

var tab;
layui.use(['element', 'table', 'jquery', 'form', 'layer'], function(){
	let element = layui.element;
  	let $ = layui.$;
  	let table = layui.table;
  	let form = layui.form;
  	let layer = layui.layer;

  	let _count=0;

  	// 渲染初始表格
  	tab =table.render({
	    elem: '#list02Tab',
	    height: 'full-200',
	    data: data,
	    page: true,
	    size: 'lg',
	    cols:[[
            {type: 'checkbox'},
			{field: 'reId', hide: true, title: '关联ID'},   
			{field: 'gctabId', title: '业务模型表' ,hide: true   },   
			{field: 'gctabIdPV'   , sort: true   , title: '业务模型表'},	  
			{field: 'itIsdict' ,templet: '#Dict_EXC_itIsdict', title: '字典'},	
			{field: 'gctabType', title: '业务表类型' ,hide: true   }, 
			{field: 'gctabTypeDictName' ,templet: '#selectDict', title: '业务表类型'},	
			{field: 'updateUser', title: '人员类别' ,hide: true   }, 
			{field: 'updateUserDictName' ,templet: '#batchSelect', title: '人员类别'},
			{field: 'placeHolder'  , sort: true  ,title: ' <i class="layui-icon layui-icon-edit" style="color: red"></i> 显示提示' ,edit: 'text'},  
			{field: 'pkeyTab', title: '外键关联表' ,hide: true   },   
			{field: 'pkeyTabPV', sort: true  , title: ' <i class="layui-icon layui-icon-layer" style="color: red"></i>   外键关联表' , event: 'backFill'},

            {align: 'center', toolbar: '#tableBar', title: '操作', width: 300}
	    ]],
	    done: function (res, curr, count) {
	    	_count =count;
 			$(".layui-table-body, .layui-table-box, .layui-table-cell").find("select").parent().css('overflow', 'visible');
 			$("select[name='gctabType']").html(epotOption(dict));
 			$("select[name='gctabType']").each(function(){
				$(this).val($(this).attr("data-value"));
			})
            form.render();
        }

  	});

  	// 显示多选下拉框,并将值回显
	for (let i = 0; i < _count; i++) {
		let divFlag =true;
		$("#icon"+i).click(function(e){
			let valArr =[];
			if ($(this).hasClass("layui-icon-up")) {// 隐藏下拉框
				$(this).removeClass("layui-icon-up");
				$(this).next().hide();
				// 获取选中的值
				$(this).parent().find(".dCheckBox .layui-form-checkbox").each(function(e){
					if ($(this).hasClass("layui-form-checked")) {
						let map ={
							"id": $(this).prev().attr("name"),
							"value": $(this).prev().attr("title"),
						}
						valArr.push(map);
					}
				})

				let innerText=[];
				for(let item of valArr.values()){
					innerText.push(item.value)
				}
				//	回显值
				if (innerText.length !=0) {
					$(this).parent().children(":first-child").text(innerText);
				}else{
					$(this).parent().children(":first-child").html("<span style='color: red;'>请至少勾选一个!</span>");
				}

			}else{// 出现下拉框
				$(this).addClass("layui-icon-up");
				$(this).parent().parent().css('overflow', 'visible');
				if (divFlag) {
					let d='<div class="dCheckBox">'+epotCheckBoxOption(userDict, data[i].updateUser)+'</div>';
					$(this).parent().append(d);
					form.render();
					divFlag =false;
				}else{
					$(this).next().show();
				}

			}
		}) 
	}

  	//	监听下拉框变化
  	form.on('select(selectFilter)',  (data) =>{
    	console.log("$(data.elem)=============>", data.value)
    });

	table.on('tool(list02Tab)',  (obj) =>{
		let event = obj.event;

		//	获取当前操作的行下标
		let rowIndex = obj.tr[0].rowIndex;
		let cel = obj.tr[0].cells;
		let celIndex;
		//	获取当前操作的列下标
		for (let i = 0; i < cel.length; i++) {
			if (cel[i].dataset.field == "pkeyTabPV") {
				celIndex = i;
			}
		}
		
		if (event === 'backFill') {
			layer.open({
		        title: "选中值回填到父页面",
		        type: 2,
		        skin: 'layui-layer-rim', //加上边框
		        area: ['1000px', '500px'], //宽高
		        content: ['list02_backFill.html?rowIndex='+rowIndex+"&celIndex="+celIndex, 'no']
	      	});
		}

		if (event === 'add') {
			layer.open({
		        title: "表格动态添加行数据以及表格内字段校验",
		        type: 2,
		        skin: 'layui-layer-rim', //加上边框
		        area: ['1000px', '500px'], //宽高
		        content: ['list02_add.html', 'no']
	      	});
		}
	})






})