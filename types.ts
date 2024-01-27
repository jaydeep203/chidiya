import { Comment, Post, User } from "@prisma/client";


export interface getPostFeedProps{
    id:string;
    body:string;
    createdAt:Date;
    updatedAt:Date;
    userId:string;
    likedIds: string[];
    user: User;
    comments: Comment[];
}

export interface getCommentFeedProps{
    id:string;
    body:string;
    createdAt:Date;
    updatedAt:Date;
    userId:string;
    postId:string;
    user:User;
}