(function() {
	var o = {};

	var o_o = {
		init: function(opts,callback) {
			o = opts;
			o_o.loadData(callback);
		},
		loadData: function(callback) {
			$.ajax({
				type: o.type,
				url: o.url,
				dataType: o.dataType,
				success: function(data) {
					data.total = 1;
					data.rows = data.data;
					o.data = data;
					o_o.openDialog(callback);
				}
			});
		},
		openDialog:function(callback) {
			var _ftr = '';
			if (o.isFilter) {
				_ftr = '<div style="height: 40px;text-align: left;">标签名称：<input id="inFilter" type="text" class="easyui-textbox" /></div>';
			}
			var tpl = '<div style="height:400px">' + _ftr + '<table id="saleAreaList" style="height:400px"></table></style>';
			$.messager.confirm({
				title: o.title1,
				height: o.height,
				cls: "window-saleAreaList",
				msg: tpl,
				ok: '<i class="i-ok"></i> 确定',
				cancel: '<i class="i-close"></i> 取消',
				fn: function(r) {
					if (r) {
						callback($('#saleAreaList').datagrid("getChecked"));
					}
				}
			});
			$('#saleAreaList').datagrid({ //分页控件
				data: o.data,
				method: o.type,
				singleSelect: false, //是否单选
				fit: true,
				fitColumns: true,
				nowrap: false,
				columns: [
					[{
						field: o.id,
						checkbox: true
					}, {
						field: o.name,
						title: o.title2,
						align: 'center',
						width: 100
					}]
				],
				onLoadSuccess: function(data) {
					$.each(o.chked, function(j, k) {
						$.each(data.rows, function(i, v) {
							if (k == v.id) {
								$('#saleAreaList').datagrid("checkRow", i);
								return false;
							}
						});
					});
				}
			});
			
			o_o.filterTxt($("#inFilter"));
		},
		filterTxt: function(obj) {
			obj.textbox('textbox').keyup(function(e) {
				$(".datagrid-btable tr").hide().filter(":contains('" + this.value.trim() + "')").show();
			}).keydown(function(e) {
				$(".datagrid-btable tr").hide().filter(":contains('" + this.value.trim() + "')").show();
			});
		}
	};
    window.changeTags = o_o;
})();