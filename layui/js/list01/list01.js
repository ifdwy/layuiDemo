
/***********
storage: 只能存储字符串 eg:存 sessionStorage.setItem('newList', JSON.stringify(oldData)); 取: JSON.parse(sessionStorage.getItem('newList'))
sessionStorage:在重启浏览器,关闭页面或新开页面时失效.
localStorage: 永久存储,不过期,除非手动删除.

Cookie:一般用于存取用户信息.
**********/

var tab1;// 执法人员表格对象
layui.use(['element', 'table', 'jquery', 'form', 'layer'], function(){
  var element = layui.element;
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;
  var layer = layui.layer;

  //第一个实例
  tab1 = table.render({
    elem: '#tab1',
    height: 'full-200',
    data: data,
    page: true,
    toolbar: '#toolbarDemo',
    cols:[[
        {field: 'lawuserId', title: 'lawuserId' ,hide: true},
        {field: 'userId', title: 'userId' ,hide: true},
        {field: 'isAssign', title: '负责人', templet: '#isAssignTpl'     },
        {field: 'distance', title: '距离', hide: true     },
        {field: 'workStatus' , title: '工作状态' ,hide: true   },
        {field: 'workStatusDictName', title: '工作状态' },
        {field: 'acceptStatus' , title: '接收状态' ,hide: true   },
        {field: 'acceptStatusDictName', title: '接收状态' },
        {field: 'lawuserType' , title: '人员类别' ,hide: true   },
        {field: 'lawuserTypeDictName', title: '人员类别' },
        {field: 'lawuserName', title: '姓名'     },
        {field: 'deptName', title: '所属组织'     },
        {field: 'deptId', title: '所属组织',hide: true      },
        {field: 'position', title: '职务'     },
        {field: 'phone', title: '手机号码'     },
        {align: 'left', toolbar: '#tableBar', title: '操作'}
    ]]
  });

  var trAppendDelLine=[];// 记录被删掉的执法人员处加的删除线
  var submitUserData;// 执法人员缓存的表格数据
  var delUser =[];//  记录每次执法人员表格里被删除的数据
  
    //头工具栏事件
  table.on('toolbar(tab1)', function(obj){
    if (obj.event == 'addBtn') {
      // 拿到表格里的数据
      var oldData = layui.table.cache.tab1;
      //  在缓存数据里拿到每一行的id.传给后端进行过滤
      var idsArr=[];
      for (var i = 0; i < oldData.length; i++) {
        idsArr.push(oldData[i].lawuserId);
      }
      layer.open({
        id: 'list01Add',
        title: "添加人员",
        type: 2,
        skin: 'layui-layer-rim', //加上边框
        area: ['1000px', '500px'], //宽高
        content: ['list01_add.html', 'no']
      });
    }
  });

  //监听工具条 
  table.on('tool(tab1)', obj=>{ 
      var data = obj.data;
      var layEvent = obj.event;
      //  表格里的删除按钮
      if(layEvent === 'delete'){
          trAppendDelLine.push($(obj)[0].tr.attr("data-index"));
          putVal(trAppendDelLine);
          delUser.push(data);
          submitUserData = layui.table.cache.tab1;
          //  去掉每次拿到的缓存数据里上一次已被删除的数据
          for (var i = 0; i < delUser.length; i++) {
            submitUserData = submitUserData.filter(function(item) {
                return item.lawuserId != delUser[i].lawuserId;
              })
          }
          //  1.添加删除线
          var str = "<div class='weba'>"+"</div>";
          $(obj)[0].tr.append(str);
          //  2. 负责人开关不能进行操作
          $(obj)[0].tr.children('td[data-field="isAssign"]').find("input").attr("disabled", true);
          //  3. 删除按钮变为撤销按钮
          $(obj)[0].tr.children("td:nth-last-child(2)").children().html('<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="history">撤销</a>');
          //  得到最终未被删除的数据
          submitUserData = submitUserData.filter(function(item) {
            return item.lawuserId != data.lawuserId;
          })
        }else if (layEvent === 'history') {// 撤销按钮
          trAppendDelLine = trAppendDelLine.filter(function(item) {
            return item!= $(obj)[0].tr.attr("data-index");
          })
          putVal(trAppendDelLine);
          submitUserData.push(data);
          delUser = delUser.filter(function(item) {
            return item.lawuserId != data.lawuserId;
          })
          $(obj)[0].tr.children("div:last-child").remove();
          $(obj)[0].tr.children('td[data-field="isAssign"]').find("input").attr("disabled", false );
          $(obj)[0].tr.children('td[data-field="isAssign"]').find("input").next().removeClass("layui-checkbox-disbaled layui-disabled");
          $(obj)[0].tr.find("td:last-child").children().html('<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>');
      }
  });

  //监听负责人操作(只能选择一个)
  var assignUserId;// 负责人ID
  form.on('switch(isAssign)', function(obj){
    assignUserId =$(obj.elem).parents('td').prev().text();
    var thisRow = $(obj.elem).parents('tr')
    , otherRow = thisRow.siblings()
    , otherRowThisCol = otherRow.find(':checkbox[lay-filter="isAssign"]');
    //  得到当前操作行的lawuserId;
    var id= $(obj.elem).parents('td').prev().prev().text();
    if(obj.elem.checked) {
      otherRowThisCol.prop('checked',false);
    }
    var cacheData =layui.table.cache.tab1;
    for (var i = 0; i < cacheData.length; i++) {
      if (cacheData[i].lawuserId == id) {
        cacheData[i].isAssign =1;
      }else{
        cacheData[i].isAssign =0;
      }
    }
    tab1.reload({data:cacheData});
    form.render();
    //  重新渲染已经加载的删除线等操作
    $("#tab1").next().find("tbody tr").each(function() {
      if (trAppendDelLine.includes($(this).attr("data-index"))) {
        // 添加删除线
        $(this).append("<div class='weba'></div>")
        // 锁定选择开关
        $(this).children('td[data-field="isAssign"]').find("input").attr("disabled", true);
        //  删除变撤销按钮
        $(this).children("td:nth-last-child(2)").children().html('<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="history">撤销</a>');   
      }
    })
      
  });
  
});