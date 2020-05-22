import config from "../config/apiConfig";

export const BASE_URL = config.domain.imageService + "/v1";

export const uploadImageBasic = (file, resolve, reject) => {
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
        reject(`Couldn't upload file: ${file.name}.`)
    );
    xhr.addEventListener("load", () => {
        const response = xhr.response;
        if (!response || response.error) {
            return reject(
                response && response.error
                    ? response.error.message
                    : `Couldn't upload file: ${file.name}.`
            );
        }
        resolve({
            url: response.data.url,
        });
    });
};