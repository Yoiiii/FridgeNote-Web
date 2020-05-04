let utils = {
	//压缩base64图片(base64,宽度,质量比例(1~0.1))
	compress(base64String, w, quality) {
		var getMimeType = function (urlData) {
			var arr = urlData.split(",");
			var mime = arr[0].match(/:(.*?);/)[1];
			// return mime.replace("image/", "");
			return mime;
		};
		var newImage = new Image();
		var imgWidth, imgHeight;
		var promise = new Promise(resolve => (newImage.onload = resolve));
		newImage.src = base64String;
		return promise.then(() => {
			imgWidth = newImage.width;
			imgHeight = newImage.height;
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			if (Math.max(imgWidth, imgHeight) > w) {
				if (imgWidth > imgHeight) {
					canvas.width = w;
					canvas.height = (w * imgHeight) / imgWidth;
				} else {
					canvas.height = w;
					canvas.width = (w * imgWidth) / imgHeight;
				}
			} else {
				canvas.width = imgWidth;
				canvas.height = imgHeight;
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
			var base64 = canvas.toDataURL(getMimeType(base64String), quality);
			return base64;
		});
	},
	
	//时间格式化(时间,格式化格式: "yyyy-MM-dd")
	formatTime(date1, fmt) {
		let date = new Date(date1);
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				(date.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		}
		var o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate(),
			"h+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds()
		};
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				var str = o[k] + "";
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
				);
			}
		}
		return fmt;
	},
}
export default utils
