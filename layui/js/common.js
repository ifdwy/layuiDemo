	//	传值
	var val;
	var putVal =(data) =>{
		val = data ;
	}
	// 取值
	var getVal = ()=>{
		if (val) {
			return val;
		}else{
			return 'val为undefined'
		}
	}

	// 返回下拉框选项
  	var epotOption =(dict) =>{
    	let option;
		for( let item of dict.values()){
			option = option + '<option value='+ item.code +'>' + item.name + '</option>\n';
		}
		return option;
    };

	// 返回多选下拉框选项
  	var epotCheckBoxOption =(dict, checkedId) =>{
  		let option='';
  		for(let item of dict.values()){
  			if (checkedId.includes(item.code)) {
  				option += '<div><input type="checkbox" name="'+item.code+'" title="'+item.name+'" lay-skin="primary" checked></div>';
  			}else{
  				option += '<div><input type="checkbox" name="'+item.code+'" title="'+item.name+'" lay-skin="primary"></div>';
  			}
  		}
		return option;
    };

	//	获取url中的参数
	var getUrlParam = (name) =>{
	    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return unescape(r[2]); return null; //返回参数值
	}

	// 自动渲染下拉框方法
	var getOption;

	layui.use(['jquery'], function(){
		let $ = layui.$;

		// 自动渲染下拉框,包括多个同时渲染 
		getOption =(dict)=>{
			for(let item of Object.keys(dict)){
		  		$("select").each(function(){
		  			if ($(this).attr("id") == item) {
		  				let option;
						for(let val of Object.values(dict[item])){
							option = option + '<option value='+ val.CODE +'>' + val.NAME + '</option>\n' 
						}
						$(this).html(option);
		  			}
		  		})
		  	}
		};

	})

