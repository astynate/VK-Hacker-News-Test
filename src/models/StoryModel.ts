export interface StoryModel {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    title: string;
    time: number;
    type: string;
    url: string;
}