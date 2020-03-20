 layui.use(['element', 'layer', 'jquery'], function () {
        var element = layui.element;
        var $ = layui.$;

        /**配置左侧导航拉伸js*/
        var isShow = true;  //定义一个标志位
        $('.kit-side-fold').on('click', ()=>{
            //选择出所有的span，并判断是不是hidden
            $('.draw1 span').each(()=>{
                if($(this).is(':hidden')){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });
            //判断isshow的状态
            if(isShow){
                $('.layui-layout-admin .layui-side').width(60);//设置宽度
                //将footer和body的宽度修改
                $('.layui-tab').css('margin-left', 60+'px');
                $('.layui-footer').css('margin-left', -140+'px');
                //将二级导航栏隐藏
                $('dd span').each(function(){
                    $(this).hide();
                });
                $(".layui-icon-shrink-right").hide();
                $(".layui-icon-spread-left").css({'cursor': 'pointer'}).show();
                //修改标志位
                isShow =false;
            }else{
                $('.layui-layout-admin .layui-side').width(200);
                $('.kit-side-fold i').css('margin-right', '1%');
                $('.layui-tab').css('margin-left', 200+'px');
                $('dd span').each(function(){
                    $(this).show();
                });
                $(".layui-icon-shrink-right").css({'cursor': 'pointer'}).show();
                $(".layui-icon-spread-left").hide();
                isShow =true;
            }
        });

        // 配置tab实践在下面无法获取到菜单元素
        $('.site-demo-active').on('click',  function(){
            var dataid = $(this);
            //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
            if ($(".layui-tab-title li[lay-id]").length <= 0) {
                //如果比零小，则直接打开新的tab项
                active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
            } else {
                //否则判断该tab项是否以及存在
                var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                $.each($(".layui-tab-title li[lay-id]"), function () {
                    //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                    if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                        isData = true;
                    }
                })
                if (isData == false) {
                    //标志为false 新增一个tab项
                    active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
                }
            }
            //最后不管是否新增tab，最后都转到要打开的选项页面上
            active.tabChange(dataid.attr("data-id"));
        });

        let FrameWH = ()=>{
            var h = $(window).height();
            $("iframe").css("height",h+"px");
        };

        var active = {
            //在这里给active绑定几项事件，后面可通过active调用这些事件
            tabAdd:  (url, id, name)=> {
                //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
                //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
                element.tabAdd('demo', {
                    title: name,
                    content: '<iframe data-frameid="' + id + '" scrolling="auto" frameborder="0" src="' + url + '" style="width:100%;height:99%;"></iframe>',
                    id: id //规定好的id
                })
                FrameWH();  //计算ifram层的大小
            },
            //切换到指定Tab项
            tabChange: id=> element.tabChange('demo', id) ,
            //删除指定Tab项
            tabDelete: id=> element.tabDelete("demo", id)
        };

    });