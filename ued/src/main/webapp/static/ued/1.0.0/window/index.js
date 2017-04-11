/* Created by Administrator on 2016/5/27 0027. */
//selDialog(是否单选true/false,表单样式(0,1,2,3,4),tab样式（0两个,1一个）,类型(wd,xy,gys,wd1,xy1,gys1),['callback'](回调函数 可选)）

var sel_openDialog = [];
var obj_openDialog;
var cabackcheck_openDialog;
var singlesel_openDialog;
var formStyle_openDialog;
var tabStyle_openDialog;
var bigsty_openDialog;


////      网点
//var wdUrl_openDialog='http://test.tsh.cn:8010/outside/getShopList.do';
//var wdUrlsel_openDialog='http://bis.tsh.com:8010/outside/getSelectShopList.do?selectIds='+sel_openDialog;
//
////      县域
//var xyUrl_openDialog='http://test.tsh.cn:8010/outside/getAreaList.do';
//var xyUrlsel_openDialog='http://bis.tsh.com:8010/outside/getSelectAreaList.do?&selectIds='+sel_openDialog;
//
////      供应商
//var gysUrl_openDialog='http://test.tsh.cn:8010/outside/getSupplierList.do';
//var gysUrlsel_openDialog='http://test.tsh.cn:8010/outside/getSelectSupplierList.do?selectIds='+sel_openDialog;

//      网点
var wdUrl_openDialog;
var wdUrlsel_openDialog;

//      县域
var xyUrl_openDialog;
var xyUrlsel_openDialog;

//      供应商
var gysUrl_openDialog;
var gysUrlsel_openDialog;


//县域表头
var xyjsonp_openDialog = [
    [{ field: 'id', checkbox: true }, {field: 'areaNo',title: '县域编码',width: 100,align: 'center'},
     { field: 'areaName',title: '县域名称',width: 200,align: 'center' },
     { field: 'province',title: '省',width: 120,align: 'center'},
     { field: 'city',title: '市', width: 120,align: 'center'},
     { field: 'area',title: '县',width: 120,align: 'center'    }]
];
//网点表头
var wdjsonp_openDialog = [
    [{ field: 'id',checkbox: true},
     { field: 'areaId',title: '县域编码',width: 100,align: 'center'},
     { field: 'areaName', title: '县域名称', width: 200, align: 'center'},
     {        field: 'shopNo',        title: '网点编码',        width: 100,        align: 'center'    },
     {        field: 'shopName',        title: '网点名称',        width: 200,        align: 'center'    },
    ]
];
//供应商
var gysjsonp_openDialog = [
    [{        field: 'id',        checkbox: true    },
     { field: 'companyName',        title: '供应商名称',        width: 200,        align: 'center'    },
     {        field: 'areaId',        title: '县域编码',        width: 100,        align: 'center'    },
     {        field: 'areaName',        title: '县域名称',        width: 200,        align: 'center'    },
     {        field: 'supplierNo',        title: '供应商名称',        width: 200,        align: 'center'    },
     {        field: 'type',        title: '供应商类型',        width: 200,        align: 'center'    },
     {        field: 'province',        title: '省',        width: 120,        align: 'center'    },
     {        field: 'city',        title: '市',        width: 120,        align: 'center'    },
     {        field: 'area',        title: '县',        width: 120,        align: 'center'    },
    ]
];
$(function() {
    $.extend($.fn.datagrid.defaults.editors, {
        text: {
            init: function(container, options) {
                var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
                return input;
            },
            destroy: function(target) {
                $(target).remove();
            },
            getValue: function(target) {
                return $(target).val();
            },
            setValue: function(target, value) {
                $(target).val(value);
            },
            resize: function(target, width) {
                $(target)._outerWidth(width);
            }
        }
    });

    $.ajax({
        type: "POST",
        url: 'http://172.16.1.97:8992/share/getUrl.do',
        //    url:'http://testtag.tsh.cn:8015/tag/listAllTag.do?appId=wm-bis&companyType=3',
        //    url: "http://172.16.1.97:8992/share/getAddress.do?cid="+ 0,
        cache: false,
        async: false,
        dataType: "jsonp",
        success: function(data) {

            //      网点
            wdUrl_openDialog = data.wdUrl_openDialog;
            wdUrlsel_openDialog = data.wdUrl_openDialog + '?selectIds=' + sel_openDialog;

            //      县域
            xyUrl_openDialog = data.xyUrl_openDialog;
            xyUrlsel_openDialog = data.xyUrlsel_openDialog + '?selectIds=' + sel_openDialog;

            //      供应商
            gysUrl_openDialog = data.gysUrl_openDialog;
            gysUrlsel_openDialog = data.gysUrlsel_openDialog + '?selectIds=' + sel_openDialog;

        }
    });

    //在页面上生成有弹窗ID的div
    $('body').before('<div id="dialog_openDialog"></div>');
    if (isArray(sel_openDialog)) {
        arrayToStr(sel_openDialog)
    }
});

//调用入口 selDialog(是否单选 ， 表单样式,   tab个数 , 类别,  回调函数)
function selDialog(singlesel, formStyle, tabStyle, bigsty, CallBack) {
    if (isArray(sel_openDialog)) {
        arrayToStr(sel_openDialog);
    }

    if (bigsty == 'wd') {
        openDialog(bigsty, singlesel, formStyle, tabStyle, wdUrl_openDialog, wdjsonp_openDialog, wdUrlsel_openDialog + sel_openDialog, wdjsonp_openDialog);
    } else if (bigsty == 'wd1') {
        openDialog(bigsty, singlesel, formStyle, tabStyle, wdUrl_openDialog, wdjsonp_openDialog);
    } else if (bigsty == 'xy') {
        openDialog(bigsty, singlesel, formStyle, tabStyle, xyUrl_openDialog, xyjsonp_openDialog, xyUrlsel_openDialog + sel_openDialog, xyjsonp_openDialog);
    } else if (bigsty == 'xy1') {
        openDialog(bigsty, singlesel, formStyle, tabStyle, xyUrl_openDialog, xyjsonp_openDialog);
    } else if (bigsty == 'gys') {
        openDialog(bigsty, singlesel, formStyle, tabStyle, gysUrl_openDialog, gysjsonp_openDialog, gysUrlsel_openDialog + sel_openDialog, gysjsonp_openDialog);
    } else if (bigsty == 'gys1') {
        openDialog(bigsty, singlesel, formStyle, tabStyle, gysUrl_openDialog, gysjsonp_openDialog);
    }
    cabackcheck_openDialog = CallBack;
    singlesel_openDialog = singlesel;
    formStyle_openDialog = formStyle;
    tabStyle_openDialog = tabStyle;
    bigsty_openDialog = bigsty;
}

//      openDialog( 大类   ,单选       ,表单样式,  ,tab      , jsonUrl1,jsonStyle1,jsonUrl2,jsonStyle2)
function openDialog(bigsty, singlesel, formStyle, tabStyle, jsonUrl1, jsonStyle, jsonUrl2, jsonStyle2) {

    var lay = []; //页面元素
    //---------------------------------表单--------------------------------


    if (formStyle == 0) {
        lay.push('<form class="tsh-toolbar" style="margin: 15px 20px;"><span class="textbox" style=" height: 28px;">          <input  type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" placeholder="输入站点名字快速查找" id="nam_openDialog" style="margin-left: 0px; margin-right: 0px; padding-top: 0px; padding-bottom: 0px; height: 28px; line-height: 28px; width: 130px;" id="nam_openDialog">       </span>      <input name="province" id="province" style="width: 105px;height:30px;" validType="checkSelect[\'选择省/市\',\'请选择省/市\']" data-options="validateOnCreate:false">      <input name="city" id="city" style="width: 120px;height:30px;margin-left:8px;" validType="checkSelect[\'选择区/县\',\'请选择区/县\']" data-options="validateOnCreate:false">      <input name="county" id="county" style="width: 100px;height:30px;margin-left:8px;" validType="checkSelect[\'选择乡/镇\',\'请选择选择乡/镇\']" data-options="validateOnCreate:false"><label><input class="easyui-combobox combobox-f combo-f textbox-f" prompt="网点标签" style=" width: 130px; height: 30px; display: none;" id="tagName_openDialog"></label>  <label><a href="javascript:;" class="btn btn-1" id="J_Search_openDialog"><i class="i-search"></i>查询</a></label>   <label><a href="javascript:;" class="btn clear" id="clear_openDialog"  type="reset">清空</a></label></form>');
    } else if (formStyle == 1) {
        lay.push('<form class="tsh-toolbar" style="margin: 15px 20px;"><span class="textbox" style=" height: 28px;">          <input  type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" placeholder="输入站点名字快速查找" style="margin-left: 0px; margin-right: 0px; padding-top: 0px; padding-bottom: 0px; height: 28px; line-height: 28px; width: 180px;" id="nam_openDialog" id="nam_openDialog">       </span>      <input name="province" id="province" style="width: 120px;height:30px;" validType="checkSelect[\'选择省/市\',\'请选择省/市\']" data-options="validateOnCreate:false">      <input name="city" id="city" style="width: 120px;height:30px;margin-left:8px;" validType="checkSelect[\'选择区/县\',\'请选择区/县\']" data-options="validateOnCreate:false">      <input name="county" id="county" style="width: 160px;height:30px;margin-left:8px;" validType="checkSelect[\'选择乡/镇\',\'请选择选择乡/镇\']" data-options="validateOnCreate:false">  <label><a href="javascript:;" class="btn btn-1" id="J_Search_openDialog"><i class="i-search"></i>查询</a></label>      <label><a href="javascript:;" class="btn clear" id="clear_openDialog" type="reset">清空</a></label></form>');
    } else {
        lay.push('<form class="tsh-toolbar" style="margin: 15px 20px;"><label><input id="tagName_openDialog" class="easyui-combobox combobox-f combo-f textbox-f itemstatus" prompt="选择商品状态" style=" width: 170px; height: 30px; display: none;" ></label> <span class="textbox" style=" height: 28px;">  <input  id="nam_openDialog" type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" placeholder="输入编号、供应商名称快速查找" style="margin-left: 0px; margin-right: 0px; padding-top: 0px; padding-bottom: 0px; height: 28px; line-height: 28px; width: 200px;"></span><label><a href="javascript:;" class="btn btn-1" id="J_Search_openDialog"><i class="i-search"></i>查询</a></label><label><a href="javascript:;" class="btn clear" id="clear_openDialog" type="reset">清空</a></label></form>');
    }

    //------------------------------Tab--------------------------------------------
    if (tabStyle == 1) {
        lay.push('<div id="tt" class="easyui-tabs"  tabHeight="40" style="width:820px;height: 389px;margin:10px 20px;">      <div id="tobe" title="待选择（<span class=text-red>...</span>）"  >  <table id="dataGrid_openDialog" class="easyui-datagrid" ></table>  </div>       <div id="been" title="已选择（<span class=text-red>...</span>）" >      <table id="seled_openDialog" ></table>     </div>   </div>');
    } else {
        lay.push('<div id="tt"  style="width:820px;height: 389px;margin:10px 20px;">     <table id="dataGrid_openDialog" class="easyui-datagrid" ></table>  </div>');
    }

    //------------------------------两个按钮----------------------------------------
    lay.push('<div class="dialog-button messager-button">  <a href="javascript:void(0)" class="l-btn l-btn-small" group="" id="submit_openDialog">  <span class="l-btn-left"><span class="l-btn-text"><i class="i-ok"></i> 确定</span></span></a>          <a href="javascript:void(0)" class="l-btn l-btn-small"  id="exit_openDialog">                  <span class="l-btn-left"><span class="l-btn-text"><i class="i-close"></i> 取消</span></span>          </a> </div>');

    //-----------------------------合并字符串数组加弹框名-----------------------------------
    if (bigsty == 'wd' || bigsty == 'wd1') {
        $("#dialog_openDialog").dialog({
            title: '选择网点',
            width: 860,
            height: 600,
            content: lay.join('')
        })
    } else if (bigsty == 'xy' || bigsty == 'xy1') {
        $("#dialog_openDialog").dialog({
            title: '选择县域',
            width: 860,
            height: 600,
            content: lay.join('')
        });
    } else if (bigsty == 'gys' || bigsty == 'gys1') {

        $("#dialog_openDialog").dialog({
            title: '选择供应商',
            width: 860,
            height: 600,
            content: lay.join('')
        });
    } else if (bigsty == 'xysel') {
        $("#dialog_openDialog").dialog({
            title: '选择县域',
            width: 860,
            height: 600,
            content: lay.join('')
        });
    }

    var random = new Date().getTime();

    if (jsonUrl1.substring(jsonUrl1.length-3) == ".do") {
        jsonUrl1 = jsonUrl1 + '?random=' + random;
//        console.log(jsonUrl1.substring(jsonUrl1.length-3));
    } else {
        jsonUrl1 = jsonUrl1 + '&random=' + random;
    }


    initAddress(); //初始化地址

    search_openDialog(singlesel, '#dataGrid_openDialog', jsonUrl1, jsonStyle);
    if (jsonUrl2 == undefined) {} else {
        search_openDialog(singlesel, '#seled_openDialog', jsonUrl2, jsonStyle2);
    }
}

function search_openDialog(singlesel, id, jsonurl, jsonStyle) {
    $(id).datagrid({
        //  $("#dg").datagrid({
        loader: function(param, success, error) {
            var rows = 20;
            var beginIndex = 0;
            $.ajax({
                type: "post",
                async: false,
                url: jsonurl,
                dataType: "jsonp",
                success: function(data) {
                    success(data);
                    $('#seled').datagrid('selectAll');
                    $('.tabs-last .text-red').html($('#been .pagination .text-info').html());
                    $('.tabs-first .text-red').html($('#tobe .pagination .text-info').html());
                    $('#seled_openDialog').datagrid('selectAll');

                    //打开窗口时把已选push到对象和数组里。
                    //obj_openDialog=[];
                    //sel_openDialog=[];

                    var sel_openDialogArr = [];
                    if ($('#seled_openDialog').length > 0) {
                        var idsel = $('#seled_openDialog').datagrid('getChecked');
                        for (var i = 0; i < idsel.length; i++) {
                            obj_openDialog.push(idsel[i]);
                            sel_openDialogArr.push(idsel[i].id);
                        }
                    }
                    sel_openDialog = sel_openDialogArr.join(',');
                    btnset(); //初始化表单按钮
                },
                error: function(xhr) {
                    error(xhr.responseText);
                }
            });
        },
        //        url:'url',
        //        title:' ',
        singleSelect: singlesel,
        fit: true,
        fitColumns: true,
        columns: jsonStyle,
        pagination: true
        //pageNumber: 1,
        //pageSize: 10
        //pageList: [6, 3, 1]
    });

    var p = $(id).datagrid('getPager');
    $(p).pagination({
        pageSize: 10, // 每页显示的记录条数，默认为10
        pageList: [10, 20, 30], // 可以设置每页记录条数的列表
        afterPageText: ' 共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 <span class="text-info">{total}</span> 条记录',
        onSelectPage: function(pageNumber, pageSize) {
            $(this).pagination('loading');
            queryData(pageNumber, pageSize);
            $(this).pagination('loaded');
        }
    });

    function queryData(PageNo, PageSize) {
        //var status = $('#planStatus').combobox('getValue');
        //var useScope = $('#useScope').combobox('getValue');
        //var planType = $('#planType').combobox('getValue');
        //var time = $('#startTime').datebox('getValue');
        var dataparam = {
            //status : status,
            //useScope : useScope,
            //planType : planType,
            //time : time,
            //PageNo : PageNo,
            //PageSize : PageSize
            page: PageNo,
            rows: PageSize
        };
        $.ajax({
            url: jsonurl,
            type: 'POST',
            data: dataparam,
            dataType: "jsonp",
            success: function(data) {
                if (data) {
                    $(id).datagrid('loadData', data);
                    console.log('do sth');

                } else {
                    alert("获取数据出错!");
                }
            }
        });
    }
}

//按钮设置
function btnset() {

    //清除按钮
    $('#clear_openDialog').click(function() {
        $('.tsh-toolbar input').not(':button, :submit, :reset, :hidden');
        $('.tsh-toolbar input').val('');
        $('.tsh-toolbar input').removeAttr('checked');
        $('.tsh-toolbar input').removeAttr('selected');
        console.log('sth');
    });
    //退出按钮
    $('#exit_openDialog').click(function() {
        $('.panel-tool-close').click();
    });
    //点搜索按钮的查询地址
    var url;
    var searchUrl;
    var bs;
    if (bigsty_openDialog == 'wd' || bigsty_openDialog == 'wd1') {
        url = "http://testbis.tsh.cn/outside/getShopListByTag.do";
        bs = 'wd1';
    } else if (bigsty_openDialog == 'xy' || bigsty_openDialog == 'xy1') {
        url = "http://testbis.tsh.cn/outside/getAreaListByTag.do";
        bs = 'xy1';
    } else if (bigsty_openDialog == 'gys' || bigsty_openDialog == 'gys1') {
        url = "http://testbis.tsh.cn/outside/getSupplierListByTag.do";
        bs = 'gys1';
    }
//    url=url+'?callback=123';
    $('#dialog_openDialog').off().on('click', '#J_Search_openDialog', function() {
        if (formStyle_openDialog == 0) {
            searchUrl = url + "?rows=1&page=1&keyword=" + $("#nam_openDialog").val() + '&areaId=' + $("input[name='city']").val() + "&tagId=" + $('#tagName_openDialog').combobox("getValue");
        } else if (formStyle_openDialog == 1) {
            searchUrl = url + "?rows=1&page=1&keyword=" + $("#nam_openDialog").val() + '&areaId=' + $("input[name='county']").val();
        } else {
            searchUrl = url + "?rows=1&page=1&keyword=" + $('#nam_openDialog').val() + "&tagId=" + $('#tagName_openDialog').combobox("getValue");
        }

        console.log(bs + '@@' + singlesel_openDialog + '@@' + formStyle_openDialog + '@@' + searchUrl);
        //  openDialog(bigsty,singlesel,       formStyle,      tabStyle,jsonUrl1,jsonStyle)
        openDialog(bs,singlesel_openDialog,formStyle_openDialog,0,searchUrl,xyjsonp_openDialog);
    });

    //弹窗下面的确定按钮
    $('body').off().on('click', '#submit_openDialog', function() {
        obj_openDialog = [];
        sel_openDialog = '';

        var sel_openDialogArr = [];
        var namsel = $('#dataGrid_openDialog').datagrid('getChecked');
        for (var i = 0; i < namsel.length; i++) {
            obj_openDialog.push(namsel[i]);
        }
        if ($("#seled_openDialog")[0] != undefined) {
            var namsel2 = $('#seled_openDialog').datagrid('getChecked');
            for (var i = 0; i < namsel2.length; i++) {
                obj_openDialog.push(namsel2[i]);
            }
        }
        if (obj_openDialog.length > 0) {
            for (var i = 0; i < obj_openDialog.length; i++) {
                sel_openDialogArr.push(obj_openDialog[i].id);
            }
        }
        sel_openDialog = sel_openDialogArr.join(',');

        if (cabackcheck_openDialog == 'CallBack' || cabackcheck_openDialog == 'CallBack_openDialog') {
            CallBack_openDialog(bigsty_openDialog);
        }
        $('.panel-tool-close').click();
    });

    //点datagrid里和行
    $('body').on('click', '#dialog_openDialog .datagrid-row', function() {
        obj_openDialog = [];
        sel_openDialog = '';
        var sel_openDialogArr = [];

        var namsel = $('#dataGrid_openDialog').datagrid('getChecked');
        for (var i = 0; i < namsel.length; i++) {
            obj_openDialog.push(namsel[i]);
        }
        if ($("#seled_openDialog")[0] != undefined) {
            var namsel2 = $('#seled_openDialog').datagrid('getChecked');
            for (var i = 0; i < namsel2.length; i++) {
                obj_openDialog.push(namsel2[i]);
            }
        }

        if (obj_openDialog.length > 0) {
            for (var i = 0; i < obj_openDialog.length; i++) {
                sel_openDialogArr.push(obj_openDialog[i].id);
            }
        }
        sel_openDialog = sel_openDialogArr.join(',');
        console.log(sel_openDialog);
    });


    $.ajax({
        type: "POST",
        //    url:'http://172.16.1.97:8992/share/getUrl.do',
        url: 'http://testtag.tsh.cn/tag/listAllTag.do?appId=wm-bis&companyType=3',
        //    url: "http://172.16.1.97:8992/share/getAddress.do?cid="+ 0,
        cache: false,
        async: false,
        dataType: "jsonp",
        success: function(data) {
            //            console.log(data.data.id+"$$$$"+data.data.tagName);
            //            var data = $.merge([{
            //                id:  data.id,
            //                name: data.tagNo
            //            }], data);
            var data = data.data;
            $("#tagName_openDialog").combobox("loadData", data);
        }
    });
    // 下拉框选择控件，下拉框的内容是动态查询数据库信息
    $('#tagName_openDialog').combobox({
        cache: false,
        editable: false,
        // panelHeight: 'auto',//自动高度适合
        valueField: 'id',
        textField: 'tagName',
        onChange: function() {}
    });
}


//地址组件
function initAddress() {
    $.ajax({
        type: "POST",
        url: "http://172.16.1.97:8992/share/getAddress.do?cid=" + 0,
        cache: false,
        async: false,
        dataType: "jsonp",
        success: function(data) {
            var data = $.merge([{
                id: 0,
                //                name: "选择区/县"
                name: "选择省/市"
            }], data);
            $("#province").combobox("loadData", data);

        }
    });
    // 下拉框选择控件，下拉框的内容是动态查询数据库信息
    $('#province').combobox({
        cache: false,
        editable: false,
        // panelHeight: 'auto',//自动高度适合
        valueField: 'id',
        textField: 'name',
        onChange: function() {
            $("#city").combobox("setValue", '');
            $("#county").combobox("setValue", '');
            $("#city").combobox("loadData", {});
            $("#county").combobox("loadData", {});
            var province = $('#province').combobox('getValue');
            if (province != 0) {
                $.ajax({
                    type: "POST",
                    url: "http://172.16.1.97:8992/share/getAddress.do?cid=" + province,
                    cache: false,
                    dataType: "jsonp",
                    success: function(data) {
                        var data = $.merge([{
                            id: 0,
                            name: "选择区/县"
                        }], data);
                        $("#city").combobox("loadData", data);
                    }
                });
            }
        }
    });
    $('#city').combobox({
        editable: false, //不可编辑状态
        cache: false,
        //panelHeight: 'auto',//自动高度适合
        valueField: 'id',
        textField: 'name',
        onChange: function() {
            $("#county").combobox("setValue", '');
            $("#county").combobox("loadData", {});
            var city = $('#city').combobox('getValue');
            if (city != 0) {
                $.ajax({
                    type: "POST",
                    url: "http://172.16.1.97:8992/share/getAddress.do?cid=" + city,
                    cache: false,
                    dataType: "jsonp",
                    success: function(data) {
                        var data = $.merge([{
                            id: 0,
                            name: "选择乡/镇"
                        }], data);
                        $("#county").combobox("loadData", data);
                    }
                });
            }
        }
    });
    $('#county').combobox({
        editable: false, //不可编辑状态
        cache: false,
        //panelHeight: 'auto',//自动高度适合
        valueField: 'id',
        textField: 'name',
        onChange: function() {
            $("#village").combobox("setValue", '');
            $("#village").combobox("loadData", {});
            var county = $('#county').combobox('getValue');
            if (county != 0) {
                $.ajax({
                    type: "POST",
                    url: "http://172.16.1.97:8992/share/getAddress.do?cid=" + county,
                    cache: false,
                    dataType: "jsonp",
                    success: function(data) {
                        var data = $.merge([{
                            id: 0,
                            name: "选择村"
                        }], data);
                        $("#village").combobox("loadData", data);
                    }
                });
            }
        }
    });
    $('#village').combobox({
        editable: false, //不可编辑状态
        cache: false,
        //panelHeight: 'auto',//自动高度适合
        valueField: 'id',
        textField: 'name',
        onChange: function() {
            $("#group").combobox("setValue", '');
            $("#group").combobox("loadData", {});
            var village = $('#village').combobox('getValue');
            if (village != 0) {
                $.ajax({
                    type: "POST",
                    url: "http://172.16.1.97:8992/share/getAddress.do?cid=" + village,
                    cache: false,
                    dataType: "jsonp",
                    success: function(data) {
                        var data = $.merge([{
                            id: 0,
                            name: "选择组"
                        }], data);
                        $("#group").combobox("loadData", data);
                    }
                });
            }
        }
    });
    $('#group').combobox({
        editable: false, //不可编辑状态
        cache: false,
        // panelHeight: 'auto',//自动高度适合
        valueField: 'id',
        textField: 'name'
    });
}

//数组转字符串
function arrayToStr(obj) {
    var str = '';
    $.each(obj, function(name, value) {
        str += value;
        str += ',';
    });
    str = str.substring(0, obj.length - 1);
    return str;
}
//字符串转数组

function strToArray(str) {
    var obj = new Array();
    obj = str.split(",");
    return obj;
}
//是否为字符串

function isString(str) {
    if (str !== null || str !== undefined || str !== '') {
        return (typeof str == 'string') && str.constructor == String;
    }
}
//是否为数组

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}