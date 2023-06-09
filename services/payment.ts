import {api} from "./common";
import {ApiResponse} from "@/types/api";
import {Course, CourseDetail} from "@/types/course/course";
import {Payment} from "@/types/payment";

export const paymentApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        createPayment: build.mutation<void, {
            course_id: string,
            user_id: string,
            tx_id: string,
        }>({
            query: ({course_id, user_id, tx_id}) => ({
                url: `/payment/${course_id}/`,
                method: 'POST',
                body: {
                    user_id,
                    tx_id,
                }
            }),
        }),
        getPaymentsByUser: build.query<ApiResponse<Payment[]>, {user_id: string}>({
            query: ({user_id}) => ({
                url: `/payment/${user_id}/`,
                method: 'GET',
            }),
        })
    }),

})

export const {
    useCreatePaymentMutation,
    useGetPaymentsByUserQuery
} = paymentApi;