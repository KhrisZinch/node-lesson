const attachCommentsToPosts = (postsComments, allPosts) => {
  const posts = allPosts;

  postsComments.forEach((comment) => {
    const foundPostIndex = posts.findIndex(
      (item) => item.id === parseInt(comment.postId)
    );

    if (foundPostIndex >= 0) {
      if (!posts[foundPostIndex].comments) {
        posts[foundPostIndex].comments = [];
      }

      posts[foundPostIndex].comments.push(comment);
    }
  });

  return posts;
};

module.exports = {
  attachCommentsToPosts,
}
