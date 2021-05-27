import { PIXABAY_API_KEY, BASE_URL } from "./apiKeys";

export default class PixabayApiService {
    constructor() {
        this.pageNumber = 1;
        this.perPage = 12;
        this.searchPhoto = "";
        console.log(
            "PixabayApiService ~ constructor ~ page: ",
            this.pageNumber
        );
    }

    async fetchImages() {
        //    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ'
        const queryImageType = "image_type=photo";
        const queryOrientation = "orientation=horizontal";
        const querySearch = `q=${this.searchPhoto}`;
        const queryPage = `page=${this.pageNumber}`;
        const queryPerPage = `per_page=${this.perPage}`;
        const queryKey = `key=${PIXABAY_API_KEY}`;
        const url = `${BASE_URL}/?${queryImageType}&${queryOrientation}&${querySearch}&${queryPage}&${queryPerPage}&${queryKey}`;

        const querysetPixabay = await fetch(url);

        if (querysetPixabay.status === 200) {
            return await querysetPixabay.json();
        }

        return querysetPixabay;
    }

    get page() {
        return this.pageNumber;
    }

    set page(newPage) {
        this.pageNumber = newPage;
    }

    set photo(newPhotoName) {
        this.searchPhoto = newPhotoName;
    }

    set pageCount(newCount) {
        this.perPage = newCount;
    }
}
