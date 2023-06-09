export interface ApiResponse<T> {
    is_success: boolean;
    message: string;
    code: number
    result: T
}