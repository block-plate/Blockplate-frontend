import {Lecture} from "@/types/lecture/lecture";
import {Review} from "@/types/review/review";

export interface Course {
    course_id: string,
    title: string,
    amount: number,
    description: string,
    data: string,
    instructor_id: string,
    status: string,
    created_at: Date,
    updated_at: Date,
    image: string,
    instructor: {
        "name": string
    }
}

export interface CourseDetail {
    course_id: string,
    title: string,
    amount: number,
    description: string,
    data: string,
    instructor_id: string,
    status: string,
    created_at: Date,
    updated_at: Date,
    image: string,
    tags: string,
    instructor: {
        name: string,
        user_id: string,
        account: string,
    },
    lectures: Lecture[],
    reviews: Review[],

}