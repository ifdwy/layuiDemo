  	//	拼接下拉框选项
  	let getOption =(dict) =>{
    	let option;
		for( let item of dict.values()){
			option = option + '<option value='+ item.code +'>' + item.name + '</option>\n' 
		}
		return option;
    };

    export{getOption}