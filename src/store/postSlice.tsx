import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IPost, IPostSliceState, IPostFetchFulfilledAction } from "../types/post";

const initialState: IPostSliceState = {
    posts: [],
    status: "idle",
    message: null
}

export const fetchPosts = createAsyncThunk("post/fetchPosts", async (): Promise<IPost[]> => {
    return (await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10")).data as IPost[];
});

export const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        addPost(state: IPostSliceState, action: PayloadAction<IPost>) {
            state.posts.push(action.payload);
        },
        deletePost(state: IPostSliceState, action: PayloadAction<IPost>) {
            state.posts = state.posts.filter((post: IPost) => post.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state: IPostSliceState) => {
            state.status = "loading";
            state.message = "Идет загрузка постов...";
        })
        .addCase(fetchPosts.fulfilled, (state: IPostSliceState, action: IPostFetchFulfilledAction) => {
            state.status = "idle";
            state.message = null;
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state: IPostSliceState) => {
            state.status = "error";
            state.message = "Произошла ошибка при загрузке постов!";
        });
    }
})