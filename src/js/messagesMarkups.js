import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error, info } from "@pnotify/core";

export function showErrorMessage(title, text) {
    error({
        title: title,
        text: text,
    });
}

export function showInfoMessage(title, text) {
    info({
        title: title,
        text: text,
    });
}
