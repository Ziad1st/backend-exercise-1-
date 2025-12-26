const Post = require("../models/Post");

const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    res.status(400).json({ message: "title and content are required" });
  const post = await Post.create({
    title,
    content,
    author: req.user.id,
  });

  res.status(201).json({ message: "Post created successfully", post });
};

const getAllPosts = async (req, res) => {
  try {
    const Posts = await Post.find()
      .populate("author", "username _id")
      .sort({ createdAt: -1 });
    res.status(200).json(Posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany();
    res.status(200).json({ message: "all posts removed successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updatePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const { newTitle, newContent } = req.body;

  if (!newTitle && !newContent)
    return res
      .status(400)
      .json({ message: "you should make update in title or content of post" });

  let post = await Post.findById(postId);
  if (!post) return res.status(400).json({ message: "post not found" });
  const postAuthor = post.author._id.toString();
  if (postAuthor !== userId && !req.user.role.includes("Admin"))
    return res
      .status(403)
      .json({ message: "you don't have access to do this action" });

  if (newTitle) post.title = newTitle;
  if (newContent) post.content = newContent;

  await post.save();
  res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    const postAuthorId = post.author._id.toString();
    if (userId !== postAuthorId && !req.user.role.includes("Admin"))
      return res
        .status(403)
        .json({ message: "you don't have access to do this action" });

    await post.deleteOne();
    res.status(200).json({
      message: `deleted (${post.title.slice(0, 25)}..) Post successfully`,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  deleteAllPosts,
};
