// ui_table.js ブラウザUI用 JavaScript (index.htmlより呼ばれる)

$(function() {
	// 追加ボタン（index.htmlのid=add）押下時 実行
	$("#add").click(function(e) {
		e.preventDefault(); // エラー
		var param = {};
		param.item1 = $("#item1").val() || ""; // 入力された文字の取得

		// POSTでのajaxコールで、サーバーのapp.jsのapp.post呼び出し
		$.ajax({
			type : 'POST',
			data : JSON.stringify(param),
			contentType : 'application/json',
			url : '/',
			success : function(data) {
				console.log('add success: ' + JSON.stringify(data));
				showTable(data);
			},
			error : function(data) {
				console.log('error ' + JSON.stringify(data));
			}
		});

		// 入力項目名を空白に
		$("#item1").val('');
	}); // #add

	// サーバから取得したデータを、htmlテーブルに追加
	var showTable = function(data) {
		$("#tableItems").append("<tr></tr>").find("tr:last").append(
				"<td>" + data.date + "</td>").append(
				"<td>" + data.item1 + "</td>")
	};
});