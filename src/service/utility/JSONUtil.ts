export default class JSONUtil {
    static get(uri: string, onSuccess?: Function, onFailure?: Function): any {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri, true);

        xhr.onload = () => {
            if (xhr.status == 200) {
                return onSuccess != null ? onSuccess(xhr) : {};
            }
            else {
                return onFailure != null ? onFailure() : {};
            }
        }

        xhr.send();
    }
}
