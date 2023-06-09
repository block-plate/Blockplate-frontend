import {api} from "./common";
import {ApiResponse} from "@/types/api";
import {Course, CourseDetail} from "@/types/course/course";

export const courseApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getCourses: build.query<ApiResponse<Course[]>, void>({
            query: () => ({
                url: `/courses/`,
                method: 'GET',
            }),
        }),
        getCoursesByInstructor: build.query<ApiResponse<Course[]>, {instructor_id: string}>({
            query: ({instructor_id}) => ({
                url: `/courses/instructor/${instructor_id}`,
                method: 'GET',
            }),
        }),
        getCoursesByUser: build.query<ApiResponse<Course[]>, {user_id: string}>({
            query: ({user_id}) => ({
                url: `/courses/apply/${user_id}`,
                method: 'GET',
            }),
        }),
        getCourse: build.query<ApiResponse<CourseDetail>, {course_id: string}>({
            query: ({course_id}) => ({
                url: `/courses/${course_id}`,
                method: 'GET',
            }),
        }),
        createCourse: build.mutation<ApiResponse<Course>, {
            title: string,
            description: string,
            amount: number,
            data: string,
            instructor_id: string,
            image: string,
        }>({
            query: (body) => ({
                url: `/courses/`,
                method: 'POST',
                body: body
            }),
        }),

    }),
})

export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    useCreateCourseMutation,
    useGetCoursesByInstructorQuery,
    useGetCoursesByUserQuery
} = courseApi;