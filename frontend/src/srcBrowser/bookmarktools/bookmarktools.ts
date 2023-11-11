
type BookMarkData = {
    ayah: number,
    surahid : number,
    name: string,
    slug: string,
}


const bookmarkStorageKey = "bookmark"

export class BookmarkTools {
    static current = new BookmarkTools();

    loadedData: { [key: string]: BookMarkData } = {}

    private load() {
        try {

            let localstorage = window.localStorage
            let bookmarkstr = localstorage.getItem(bookmarkStorageKey);
            let listbookmark = JSON.parse(bookmarkstr!);
            if (listbookmark != null)
                this.loadedData = listbookmark;
        } catch (error) {

        }
    }

    constructor() {
        this.load();
    }

    private saveJson() {
        try {

            let strjson = JSON.stringify(this.loadedData);
            let localstorage = window.localStorage
            localstorage.setItem(bookmarkStorageKey, strjson);
        } catch (error) {

        }
    }

    saveBookmark(bd: BookMarkData) {
        let key = this.createKey({
            ayah: bd.ayah,
            slug: bd.slug
        })

        this.loadedData[key] = bd;

        this.saveJson();
    }

    removeBookmark(bd: BookMarkData) {
        let key = this.createKey({
            ayah: bd.ayah,
            slug: bd.slug
        })

        delete this.loadedData[key]

        this.saveJson();
    }

    private createKey(a: {
        ayah: number,
        slug: string,
    }) {
        return a.slug + "-" + a.ayah;
    }

    getBookMark(a: {
        ayah: number,
        slug: string,
    }) {
        return this.loadedData[this.createKey(a)]
    }



}