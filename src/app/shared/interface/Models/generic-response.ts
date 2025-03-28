export interface GenericResponse<T> {
    messageCode: number;
    data: T;
    success: boolean
    message: string
}
