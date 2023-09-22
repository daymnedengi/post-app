export interface IPost {
    id: number,
    userId: number,
    title: string,
    body: string
}

export interface IPostSliceState {
    posts: IPost[],
    status: "idle" | "loading" | "error",
    message: string | null
}

export interface IPostFetchFulfilledAction {
    type: string,
    payload: IPost[],
    meta: any
}

export interface IPostListProps {
    posts: IPost[]
}