export interface CommentModel {
    by: string;
    id: number;
    kids: number[];
    parent: string;
    text: string;
    time: number;
    type: string;
}