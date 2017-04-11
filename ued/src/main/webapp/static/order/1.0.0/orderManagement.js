
var getGoodsStatus = getGoodsStatus();
var pageopt;

$(function() {   
    $.extend($.fn.datagrid.defaults.editors, {
        text: {
            init: function(container, options){
                var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
                return input;
            },
            destroy: function(target){
                $(target).remove();
            },
            getValue: function(target){
                return $(target).val();
            },
            setValue: function(target, value){
                $(target).val(value);
            },
            resize: function(target, width){
                $(target)._outerWidth(width);
            }
        }
    });
    var random = new Date().getTime();
    var url = '../../../test/list.do?random=' + random;
    init(url);
});

function init(url) {
    $('#goodsStatus').combobox({
        data: getGoodsStatus,
        valueField: 'id',
        textField: 'text',
        editable: false,
        panelHeight: 'auto',
        //  onChange:function(){//注意不要使用onSelect
        //    search();
        //  }
    });
    search(url);
    //setTimebox();
}

function getGoodsStatus() {
    var data = [{
        'id': '-1',
        'text': '选择商品状态',
        "selected": true
    }, {
        'id': '2',
        'text': '上架'
    }, {
        'id': '1',
        'text': '下架'
    }, {
        'id': '3',
        'text': '运营下架'
    }, {
        'id': '4',
        'text': '系统下架'
    }];
    return data;
}
function myStatus(value){
    if(value=="0"){
        return "上架";
    }else if(value=="1"){
        return "下架";
    }else if(value=="2"){
        return "运营下架";
    }else if(value=="3"){
        return "系统下架";
    }else{
        return "未知状态"
    }
}
function setTimebox() {

}

function search( data) {
    var dg = $('#dataGrid').datagrid({
        url: 'datagrid_data1.json', 
        saveUrl: 'save_user.do',
        updateUrl: 'update_user.do',
        destroyUrl: 'destroy_user.do',
        // queryParams:data,
        // rownumbers: false, //行号
        singleSelect: false, //是否单选
        pagination: true, //分页控件
        pageNumber: 1,
        pageSize: 6,
        pageList: [6, 3, 1],
        autoRowHeight: true,
        fit: true,
        striped: false, //设置为true将交替显示行背景
        fitColumns: true, //设置是否滚动条
        nowrap: false,
        remotesort: true,
        checkOnSelect: true,
        selectOnCheck: true,
        method: "get", //请求数据的方法
        loadMsg: '数据加载中,请稍候......',
        idField: 'id',
        onLoadSuccess: onLoadSuccess,
        columns: [[
                            { field: 'ck', checkbox: true },
                            {
                                field: 'CommodityName',
                                title: '商品名称',
                                align: 'center',
                                width:150,
                                colSpan:6,
                                /*formatter: function(v, r, index) {
                                    var productid = (pageopt.pageimg pageNumber - 1) * pageopt.pageSize + index + 1;
                                    return productid;
                                }*/
                            },
                            { field: 'price', title: '销售价', width: 200, align: 'center', formatter: mypicture },
                            { field: 'CommodityQuantity', title: '商品数量', width: 200, align: 'center' ,editor:{type:'textbox',options:{required:true}}},
                            {field: 'customerService',title: '售后',width: 200,editor:{type:'textbox',options:{required:true}},align: 'center',    },
                            {
                                field: 'buyerInformation',
                                title: '买家信息', 
                                width: 200,
                                align: 'center',
                                formatter: myStatus,
                                editor:{type:'combobox',options:{ data: [{
                                            'value': '0',
                                            'text': '上架'
                                        }, {
                                            'value': '1',
                                            'text': '下架'
                                        }, {
                                            'value': '2',
                                            'text': '运营下架'
                                        }, {
                                            'value': '3',
                                            'text': '系统下架'
                                        }], 
                                    valueField: "value", 
                                    textField: "text"} 
                                },
                            },
                            {field:'tradingStatus',title:'交易状态',width:200,align:'center'},
                            {
                                field: 'orderAmount',
                                title: '订单金额',
                                width: 200,
                                align: 'center',}
                ]],
        onLoadError: function() {
            $.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
        },
        onLoadSuccess: function(data) {},
        toolbar: '#tb',
        onBeforeEdit:function(index,row){
           // console.log(index,row);
        },
        onEndEdit:function(index,row){

           // console.log(index,row);
        },
        onAfterEdit:function(index,row){

            //console.log(index,row);
        }
        
    });
}

function onLoadSuccess(data){
    var merges = [{
        index: 2,
        rowspan: 8
    },{
        index: 5,
        rowspan: 2
    },{
        index: 7,
        rowspan: 2
    }];
    for(var i=0; i<merges.length; i++){
        $(this).datagrid('mergeCells',{
            index: merges[i].index,
            field: 'CommodityName',
            rowspan: merges[i].rowspan
        });
    }
}
//修改单元格一的样式
function mypicture(value, row, index) {
    var temp = "";
    // if(value){
    temp = "<div style='position:relative'><img src='https://img.alicdn.com/bao/uploaded/i2/862068270/TB2dduSkVXXXXbfXXXXXXXXXXXX_!!862068270.jpg_80x80.jpg' style='display:inline-block;vertical-align: top;max-width:80px;heightmax-height:80px' />";
    // }
    return temp;
}

function edit(id) {
    $.messager.alert({
        title: '成功提示',
        width: 400,
        msg: '<div class="content">成功提示！</div>',
        ok: '<i class="i-ok"></i> 确定',
        icon: 'info'
    });
}

function up(id) {
    $.messager.alert({
        title: '错误提示',
        width: 400,
        msg: '<div class="content">错误提示文字</div>',
        ok: '<i class="i-ok"></i> 确定',
        icon: 'error'
    });
}

function view(id) {
    $.messager.alert({
        title: '警告提示',
        width: 400,
        msg: '<div class="content">警告文字</div>',
        ok: '<i class="i-ok"></i> 确定',
        icon: 'warning'
    });
}

function del(id) {
    $.messager.confirm({
        width: 400,
        title: '删除提示',
        msg: '<div class="content">你确认要删除这条记录吗?</div>',
        ok: '<i class="i-ok"></i> 确定',
        cancel: '<i class="i-close"></i> 取消',
        fn: function(r) {
            if (r) {

                $.messager.alert({
                    title: '成功提示',
                    width: 400,
                    msg: '完成',
                    ok: '<i class="i-ok"></i> 确定',
                    icon: 'info'
                });
            }
        }
    });
}