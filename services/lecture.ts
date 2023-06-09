import {api} from "./common";
import {ApiResponse} from "@/types/api";
import {Course} from "@/types/course/course";
import {Lecture} from "@/types/lecture/lecture";

export const lectureApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getLectures: build.query<ApiResponse<Lecture[]>, {course_id: string}>({
            query: ({course_id}) => ({
                url: `/lectures?course=${course_id}`,
                method: 'GET',
            }),
        }),
        createLecture: build.mutation<void, {
            course_id: string,
            title: string,
            url: string,
            group: string,
            order: number,
            data: string,
        }>({
            query: (body) => ({
                url: `/lectures`,
                method: 'POST',
                body: body,
            }),
        }),
        getLecture: build.query<ApiResponse<Lecture>, {lecture_id: string}>({
            query: ({lecture_id}) => ({
                url: `/lectures/${lecture_id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetLecturesQuery,
    useCreateLectureMutation,
    useGetLectureQuery
} = lectureApi;