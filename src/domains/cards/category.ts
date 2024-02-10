export enum Category {
    FIRST = "FIRST",
    SECOND = "SECOND",
    THIRD = "THIRD",
    FOURTH =  "FOURTH",
    FIFTH =  "FIFTH",
    SIXTH = "SIXTH",
    SEVENTH = "SEVENTH",
    DONE = "DONE"
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