import { showErrorMessage, showInfoMessage } from "./messagesMarkups";
import { appendItemCountryMarkup } from "./markups";
import { refs } from "./refs";
import photosListTpl from "../templates/photos.hbs";

export async function photoFetch(inagePromise, info_msg, error_msg) {
    const photoData = await inagePromise.fetchImages();
    pushPhotosDataToMarkup(photoData, info_msg, error_msg);
}

function pushPhotosDataToMarkup(images, info_msg, error_msg) {
    console.log("images: ", images);

    try {
        if (images.hits.length > 0) {
            appendItemCountryMarkup(
                refs.container,
                photosListTpl,
                images.hits.map((image) => image)
            );
        } else {
            const title = "Oops!";
            const text = info_msg;
            showInfoMessage(title, text);
            appendItemCountryMarkup(refs.container, photosListTpl, "");
            // inputButton.value = "";
        }
    } catch (error) {
        const title = "Oops!";
        const text = error_msg;
        showErrorMessage(title, text);
        appendItemCountryMarkup(refs.container, photosListTpl, "");
        // inputButton.value = "";
    }
}
