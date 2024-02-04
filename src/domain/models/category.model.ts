export enum Category {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH, //todo est-ce que ça doit être un chiffre ou une string
    DONE
}

export const REVIEW_FREQUENCIES: { [key in Category]?: number } = {
    [Category.FIRST]: 1,
    [Category.SECOND]: 2,
    [Category.THIRD]: 4,
    [Category.FOURTH]: 8,
    [Category.FIFTH]: 16,
    [Category.SIXTH]: 32,
    [Category.SEVENTH]: 64
};