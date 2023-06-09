export interface Review{
    review_id: string,
    course_id: string,
    "user_id": string,
    title: string,
    contents: string,
    status: string,
    created_at: Date,
    updated_at: Date
}