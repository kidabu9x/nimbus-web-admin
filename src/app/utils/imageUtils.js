export const handleFileUploadRequest = (event) => {
    var fileLoader = event.data.fileLoader,
        formData = new FormData(),
        xhr = fileLoader.xhr;
    if (fileLoader.total < 2048000) {
        xhr.open("POST", fileLoader.uploadUrl, true);
        formData.append("file", fileLoader.file, fileLoader.fileName);
        fileLoader.xhr.send(formData);
        // Prevented the default behavior.
        event.stop();
    } else {
        alert("Kích thước ảnh quá lớn, ảnh sẽ được lưu vào bộ nhớ tạm"); // Prevented the default behavior.
        event.stop();
    }
};

export const handleFileUploadResponse = (evt) => {
    evt.stop();
    // Get XHR and response.
    var data = evt.data,
        xhr = data.fileLoader.xhr,
        response = xhr.responseText.split("|");
    if (response[1]) {
        // An error occurred during upload.
        data.message = response[1];
        evt.cancel();
    } else {
        return (data.url = JSON.parse(response[0]).data.url);
    }
};