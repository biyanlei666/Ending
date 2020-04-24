$(function(){
    //首先执行索引
    startIndex();
    //默认情况执行获取全部数据的方法
    // 默认加载第一页的数据
    getAllData();
    //调用分页函数
    setPage();

  // 按回车健获取文本框的值并检索数据
    $('#mySearch').on('keydown',function(e){
        if (e.keyCode == 13) {
            var param=$(this).val();
            //console.log(param);
            getAllData('0',param);
        }
        // return false;

    });
    $('#btnSearch').click(function(){
        var param=$('#mySearch').val();
        getAllData('0',param);
        return false;
    });
}); 
  
 //执行索引方法
    function startIndex(){
        $.ajax({
            type:"post",
            url:"http://192.168.31.111/api/dbdo.html?&random="+new Date().getMilliseconds(),
            cache:false,
            data:{
                db:9991201,
                cmd:4,
                indextype:0
            },
            dataType:"json",
            success:function(data){
                if (data.Result) {
                    console.log("索引成功")

                }else{
                    console.log("索引失败")
                }
                
            },
            error:function(){
                alert("网络错误！请检查网络")
            }
        })
    }
 //获取全部数据并渲染到页面上
 //封装获取全部数据的方法
    function getAllData(pageIndex,param){
        
        var param =param ? param : ""
        $.ajax({
                url:'http://192.168.31.111/api/search.html?&random='+new Date().getMilliseconds(),
                data:{
                        db:9991201,
                        start:pageIndex,
                        count:15,
                        word:param,
                        notusecache:true  //强制不使用缓存

                },
                cache:false,
                type:'post',
                dataType:'json',
                success:function(json){
                console.log(json)
                // 定义模板引擎用来渲染列表数据
                var html=template('templateList',json);
                $('tbody').html(html);
                //定义一个模板用来渲染数据量
                var html =template('templatehit',json);
                $('#dataZL').html(html);
                }

              

            });
                return false;
    }

        function setPage(){
            $.ajax({
                url:'http://192.168.31.111/api/search.html?&random='+new Date().getMilliseconds(),
                data:{
                    db:9991201
                },
                cache:false,
                type:'post',
                dataType:'json',
                success:function(data){
                    //获取用于分页的参数 returnhit 命中总数
                    var totalCount=data.returnhit//总记录数
                    var pageSize=15;//每页显示的条数 默认为10
                    var pageCount;
                    var currentPage=1;//当前页
                    var pageIndex;
                    
                    if (totalCount%10>0) {
                        pageCount=parseInt(totalCount/pageSize+1);
                    }else{
                        pageCount=parseInt(totalCount/pageSize);
                    }
                        
                    // $("#page").Page({
                    // totalPages: pageCount,//分页总数
                    // liNums: 7,//分页的数字按钮数(建议取奇数)
                    // activeClass: 'activP', //active 类样式定义
                    // callBack : function(page){
                    //     console.log(page)
                    //     pageIndex=(page-1)*pageSize;
                    //     getAllData(pageIndex);
                    // }
                    // });
                    $(".page").createPage({
                        pageCount:pageCount,
                        current:currentPage,
                        backFn:function(p){
                        //单击回调方法，p是当前页码
                        console.log(p);
                        pageIndex=(p-1)*pageSize;
                        getAllData(pageIndex)
                         }
                        });
                   
                }
            })
               
        }
    //数据删除方法
 function doDelete(obj) {
           var rid = $(obj).val();
            console.log(rid);
            var flag = confirm("确定要删除？")
                $.ajax({
                        type:'post',
                        url:'http://192.168.31.111/api/dbdo.html?&random='+new Date().getMilliseconds(),
                        data:{
                                db:9991201,
                                cmd:3,
                                rid:rid,
                                indextype:0
                                },
                        cache:false,
                        dataType:'json',
                        success:function(data){
                            if (data.Result==true) {
                                alert("删除成功");
                                window.location.href = window.location.href;
                                }else{
                                        alert("删除失败");
                                            }
                                            },
                        error:function(){
                                        alert("请求失败,请检查网络");
                              
                                        }
                        });
                }
        //点击修改按钮 请求转发到修改页面
        function updateUI(obj){
            var rid = $(obj).val();
            window.location.href="updateNews.html?rid="+rid; 


        }