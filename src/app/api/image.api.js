import config from "../config/apiConfig";

export const BASE_URL = config.domain.imageService + "/v1";

export const uploadImageBasic = (file) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const endpoint = BASE_URL + "/upload";
        xhr.open(
            "POST",
            endpoint,
            true
        );
        xhr.responseType = "json";
        const data = new FormData();

        data.append("file", file, file.name);
        xhr.send(data);
        xhr.addEventListener("error", () =>
            reject(`Lỗi khi tải ảnh: ${file.name}.`)
        );
        xhr.addEventListener("load", () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(
                    response && response.error
                        ? response.error.message
                        : `Lỗi khi tải ảnh: ${file.name}.`
                );
            }
            resolve({
                url: response.data.url,
            });
        });
    });
};