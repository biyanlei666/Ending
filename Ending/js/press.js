$(function () {
            //提交表单数据
        $('#submitAdd').click(function(event) {
            /* Act on the event */
            /*手动验证表单，当是普通按钮时。*/
            $('#addForm').data('bootstrapValidator').validate();//启用验证
            var flag = $('#addForm').data('bootstrapValidator').isValid()//验证是否通过true/false
            if(flag){
                //获取表单数据
                var data=$("#addForm").serializeArray();
                var param=[]
                for(var i=0;i<data.length;i++){
                param[i] = data[i]['value'];
                }
                console.log(param);
                addData(param);
                }  
            });

    //将ajax封装为一个函数
    //添加数据
    function addData(param){
         $.ajax({
            url:'http://192.168.31.111/api/dbdo.html?&random='+new Date().getMilliseconds(),
            type:'post',
            dataType:'json',
            data:{
                "db":"9991201",
                "cmd":"1",
                "jsondata":JSON.stringify(param),

            },
            cache:false,
            success:function (data) {
                if (data.Result==true) {
                    alert("添加成功!");
                    window.location.href="./list.html";
                }else{
                   alert("添加失败!")
                  console.log(flag);
                }
            },
            error:function () {
                alert('发送失败');
            }
        })
        }
    });

        
        //表单验证

            $('#addForm').bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    title: {
                        message: '标题验证失败',
                        validators: {
                            notEmpty: {
                                message: '标题不能为空'
                            },
                        }
                    },
                    author: {
                        validators: {
                            notEmpty: {
                                message: '标题不能为空'
                            },
                        }
                    },
                    source:{
                        validators:{
                            notEmpty:{
                                message:'来源不能为空'
                            },
                        }
                    },
                    abstract:{
                        validators:{
                            notEmpty:{
                                message:'摘要不能为空'
                            },
                        }
                    }


                }
            });
