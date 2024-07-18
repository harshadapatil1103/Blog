import mongoose from 'mongoose';

const postSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
            unique:true,
        },
        image:{
            type:String,
            default:'https://www.google.com/imgres?q=blog%20post%20image%20&imgurl=https%3A%2F%2Fwww.hostinger.com%2Ftutorials%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F09%2Fhow-to-write-a-blog-post.png&imgrefurl=https%3A%2F%2Fwww.hostinger.in%2Ftutorials%2Fhow-to-write-a-blog-post&docid=GvPTI8RBxMLIUM&tbnid=9hNETiG_vLIuUM&vet=12ahUKEwjYu5irua-HAxWVTWcHHZILDOkQM3oECBoQAA..i&w=2127&h=934&hcb=2&ved=2ahUKEwjYu5irua-HAxWVTWcHHZILDOkQM3oECBoQAA',
        },
        category:{
            type:String,
            default:'unCategorized',
        },
        slug:{
            type:String,
            required:true,
            unique:true,
            }

    },{timestamps:true}
);

const Post = mongoose.model('Post', postSchema);

export default Post;