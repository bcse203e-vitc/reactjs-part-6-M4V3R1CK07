import React, { useState } from "react";

// Mock discussion data
const discussionData = {
  "web-dev": [
    {
      id: 1,
      author: "WebDeveloper123",
      title: "How to optimize React performance?",
      content:
        "I'm building a large application and noticing some performance issues. What are some best practices for optimizing React?",
      upvotes: 8,
      comments: [
        {
          id: 1,
          author: "ReactExpert",
          content:
            "Make sure to use React.memo for functional components that render often but don't need to re-render when parent re-renders.",
          upvotes: 3,
        },
        {
          id: 2,
          author: "CodeOptimizer",
          content:
            "Also consider using useCallback for functions and useMemo for expensive calculations.",
          upvotes: 2,
        },
      ],
      date: "2 days ago",
    },
    {
      id: 2,
      author: "CSSNinja",
      title: "Flexbox vs Grid - When to use which?",
      content:
        "I'm confused about when to use Flexbox and when to use CSS Grid. Any clear guidelines?",
      upvotes: 12,
      comments: [
        {
          id: 3,
          author: "LayoutMaster",
          content:
            "Flexbox is one-dimensional (row OR column). Grid is two-dimensional (rows AND columns). Use flexbox for simple layouts and grid for complex ones.",
          upvotes: 7,
        },
      ],
      date: "5 days ago",
    },
  ],
  "data-science": [
    {
      id: 3,
      author: "DataWizard",
      title: "Best Python library for time series analysis?",
      content:
        "I need to analyze time series data. Should I use pandas, statsmodels, or something else?",
      upvotes: 5,
      comments: [
        {
          id: 4,
          author: "AnalyticsGuru",
          content:
            "Pandas is great for basics. For more advanced analysis, try statsmodels or Prophet by Facebook.",
          upvotes: 2,
        },
      ],
      date: "1 day ago",
    },
  ],
  cybersecurity: [
    {
      id: 4,
      author: "SecurityExpert",
      title: "Best practices for securing a web application?",
      content:
        "What are the essential security practices every web developer should implement?",
      upvotes: 15,
      comments: [
        {
          id: 5,
          author: "HackerDefender",
          content:
            "Always validate input, use HTTPS, implement proper authentication, keep dependencies updated, and use CSP headers.",
          upvotes: 8,
        },
        {
          id: 6,
          author: "WebGuardian",
          content:
            "Don't forget about implementing rate limiting to prevent brute force attacks!",
          upvotes: 4,
        },
      ],
      date: "3 days ago",
    },
  ],
};

function Community({ skill }) {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showPostForm, setShowPostForm] = useState(false);

  if (!skill) {
    return <div className="community">Please select a skill first</div>;
  }

  const discussions = discussionData[skill.id] || [];

  const handleCreatePost = (e) => {
    e.preventDefault();
    alert(
      "In a complete implementation, this would save your post to a database."
    );
    setNewPost({ title: "", content: "" });
    setShowPostForm(false);
  };

  const handleUpvote = (discussionId) => {
    alert(
      `Upvoted discussion #${discussionId}. This would be saved in a real implementation.`
    );
  };

  return (
    <div className="community">
      <div className="community-header">
        <h2>Community Discussion: {skill.title}</h2>
        <button
          className="create-post-button"
          onClick={() => setShowPostForm(true)}
        >
          Create New Post
        </button>
      </div>

      {showPostForm && (
        <div className="post-form-container">
          <h3>Create New Post</h3>
          <form onSubmit={handleCreatePost} className="post-form">
            <div className="form-group">
              <label htmlFor="post-title">Title</label>
              <input
                type="text"
                id="post-title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="post-content">Content</label>
              <textarea
                id="post-content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                required
                rows={5}
              ></textarea>
            </div>
            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="discussions-list">
        {discussions.length === 0 ? (
          <div className="no-discussions">
            <p>
              No discussions yet for this skill. Be the first to start a
              conversation!
            </p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="discussion-card">
              <div className="discussion-votes">
                <button
                  className="upvote-button"
                  onClick={() => handleUpvote(discussion.id)}
                >
                  ▲
                </button>
                <span className="vote-count">{discussion.upvotes}</span>
              </div>

              <div className="discussion-content">
                <h3 className="discussion-title">{discussion.title}</h3>
                <p className="discussion-author">
                  Posted by {discussion.author} • {discussion.date}
                </p>
                <p className="discussion-text">{discussion.content}</p>

                <div className="discussion-comments">
                  <h4>{discussion.comments.length} Comments</h4>
                  {discussion.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <p className="comment-author">{comment.author}</p>
                      <p className="comment-content">{comment.content}</p>
                      <div className="comment-footer">
                        <span className="comment-upvotes">
                          ▲ {comment.upvotes} upvotes
                        </span>
                        <button className="reply-button">Reply</button>
                      </div>
                    </div>
                  ))}
                  <div className="add-comment">
                    <textarea
                      placeholder="Add a comment..."
                      className="comment-input"
                    ></textarea>
                    <button className="post-comment-button">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Community;
