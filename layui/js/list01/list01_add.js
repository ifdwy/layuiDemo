
top.addLawUser;
layui.use(['element', 'table', 'jquery', 'form', 'layer'], function(){
    var element = layui.element;
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var layer = layui.layer;
    
    //第一个实例
    let tab1Add = table.render({
      elem: '#tab1_add',
      height: 'full-200',
      data: data,
      page: true,
      cols:[[
          {type: 'checkbox', field: 'checkbox'},
          {field: 'lawuserId', title: 'lawuserId' ,hide: true},
          {field: 'distance', title: '距离', hide: true     },
          {field: 'lawuserType' , title: '人员类别' ,hide: true   },
          {field: 'lawuserTypeDictName', title: '人员类别' },
          {field: 'lawuserName', title: '姓名'     },
          {field: 'deptName', title: '所属组织'     },
          {field: 'position', title: '职务'     },
          {field: 'phone', title: '手机号码'     },
          {align: 'left', toolbar: '#tableBar', title: '操作'}
      ]]
    });

    //监听工具条 
    table.on('tool(tab1_add)', obj=>{ 
        var data = obj.data;
        var layEvent = obj.event;
        if(layEvent === 'add'){
        //  添加至原始执法人员表格中
          addLawUserFun(data);
        }
    });

    var parentDom =window.parent.document;
    //  将选中的数据添加至原始执法人员表格中
    function addLawUserFun(data) {
        var oldData = window.parent.layui.table.cache.tab1;
        var newData = {
             "LAY_TABLE_INDEX": "",
             "lawuserId": data.lawuserId,
             "userId":  data.userId,
             "isAssign": "0",
             "distance": data.distance,
             "workStatus": data.workStatus,
             "workStatusDictName": data.workStatusDictName,
             "acceptStatus": "",
             "acceptStatusDictName": "",
             "lawuserType": data.lawuserType,
             "lawuserTypeDictName": data.lawuserTypeDictName,
             "lawuserName": data.lawuserName,
             "deptName": data.deptName,
             "deptId": data.deptId,
             "position": data.position,
             "phone": data.phone
        };
        oldData.push(newData);
        window.parent.tab1.reload({data:oldData});
        $(parentDom).find("#tab1").next().find("tbody tr").each(function() {
        if (parent.getVal().includes($(this).attr("data-index"))) {
          var id= $(this).find("td[data-field='userId']").text();
          oldData = oldData.filter(function(item) {
            return item.userId != id;
          });
          top.addLawUser =oldData;
          // 添加删除线
          $(this).append("<div class='weba'></div>")
          // 锁定选择开关
          $(this).children('td[data-field="isAssign"]').find("input").attr("disabled", true);
          //  删除变撤销按钮
          $(this).children("td:nth-last-child(2)").children().html('<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="history">撤销</a>');   
        }
    })
         
    //关闭弹窗
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  }


  
});