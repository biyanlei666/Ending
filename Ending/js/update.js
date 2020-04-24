  //将要修改的数据渲染到页面
        $(function(){
            var loc = location.href;
            var n1 = loc.length;//地址的总长度
            var n2 = loc.indexOf("=");//取得=号的位置
            var rid = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
            //首先查询需要更新的数据,并渲染到页面
            updateShow(rid);
            //实现更新数据操作
         $('#updateData').click(function(){
            var data=$("#updateForm").serializeArray();
		 	var param=[]
		 	for(var i=0;i<data.length;i++){
		 	param[i] = data[i]['value'];
		 	}
		 	console.log(param);
            //调用数据更新方法
            updateData(rid,param);
           
         });
          //更新数据渲染方法
        function updateShow(rid) {
            $.ajax({
                url:'http://192.168.31.111/api/detail.html?&random='+new Date().getMilliseconds(),
                type:'post',
                data:{
                    db:"9991201",
                    rid:rid
                },
                cache:false,
                dataType:'json',
                success:function(json){
                console.log(json);
                console.log(json.authors[0].name);
                var title=json.meta[0];
                var author=json.authors[0].name;
                var publish_Date=json.meta[2];
                var coulum_Name=json.meta[3];
                var source=json.meta[4];
                var abstract=json.meta[5];
                var editor=json.meta[6];
                $('#title').val(title);
                $('#author').val(author);
                $('#publish_Date').val(publish_Date);
                $('#coulum_Name').val(coulum_Name);
                $('#source').val(source);
                $('#abstract').val(abstract);
                    ed.txt.html(editor);
                        
                 
                }
            });
            }
          
         //数据更新方法
        function updateData (rid,param) {
            $.ajax({
                url:'http://192.168.31.111/api/dbdo.html?&random='+new Date().getMilliseconds(),
                type:'post',
                data:{
                    db:"9991201",
                    cmd:2,
                    rid:rid,
                    jsondata:JSON.stringify(param),
                    indextype:0
                },
                cache:false,
                dataType:'json',
                success:function(json){
                    console.log(json)
                    alert(json.Result)
                    if (json.Result==true) {
                       alert("修改成功");
                        window.location.href="./list.html";
                        }else{
                            
                            alert("修改失败")
                        }
                    },
                error:function(){
                    alert("请求失败,请检查网络");
                }
                });
            }

           
        });
       