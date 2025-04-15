
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Reply, MoreHorizontal } from "lucide-react";
import { mockChefs } from "@/lib/mockData";

// Generate mock comments
const mockComments = [
  {
    id: "1",
    authorId: mockChefs[0].id,
    author: mockChefs[0].name,
    avatar: mockChefs[0].avatar,
    content: "This recipe is amazing! I added some extra garlic and it turned out perfect. My family loved it!",
    timestamp: "2 days ago",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        authorId: mockChefs[1].id,
        author: mockChefs[1].name,
        avatar: mockChefs[1].avatar,
        content: "Thanks for the tip about the extra garlic! I'll try that next time.",
        timestamp: "1 day ago",
        likes: 3,
        isLiked: false,
      }
    ]
  },
  {
    id: "2",
    authorId: mockChefs[2]?.id || "unknown",
    author: mockChefs[2]?.name || "Anonymous Chef",
    avatar: mockChefs[2]?.avatar || "/placeholder.svg",
    content: "I substituted the cream with coconut milk and it worked really well for a dairy-free version!",
    timestamp: "3 days ago",
    likes: 8,
    isLiked: true,
    replies: []
  }
];

interface Comment {
  id: string;
  authorId: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface RecipeCommentsProps {
  recipeId: string;
}

const RecipeComments = ({ recipeId }: RecipeCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  
  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      }));
    }
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      authorId: "current-user",
      author: "Current User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };
  
  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      authorId: "current-user",
      author: "Current User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));
    
    setReplyToId(null);
    setReplyContent("");
  };
  
  return (
    <div className="recipe-comments">
      <h3 className="font-bold text-xl mb-6">Comments ({comments.length})</h3>
      
      {/* Add Comment Section */}
      <div className="flex gap-4 mb-8">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="Your Avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea 
            placeholder="Share your thoughts or ask a question..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2 min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-gray-500 text-sm ml-2">{comment.timestamp}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-700">{comment.content}</p>
                </div>
                
                <div className="flex gap-4 mt-2 ml-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(comment.id)}
                    className={`text-sm px-2 ${comment.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${comment.isLiked ? 'fill-red-500' : ''}`} /> {comment.likes}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm px-2 text-gray-500"
                    onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" /> Reply
                  </Button>
                </div>
                
                {/* Reply Input */}
                {replyToId === comment.id && (
                  <div className="flex gap-3 mt-4 ml-6">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="Your Avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Write a reply..." 
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="mb-2 min-h-[80px] text-sm"
                      />
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setReplyToId(null)}
                        >Cancel</Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleAddReply(comment.id)}
                        >Reply</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 mt-4 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={reply.avatar} alt={reply.author} />
                          <AvatarFallback>{reply.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="mb-1">
                                <span className="font-medium text-sm">{reply.author}</span>
                                <span className="text-gray-500 text-xs ml-2">{reply.timestamp}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <p className="text-gray-700 text-sm">{reply.content}</p>
                          </div>
                          
                          <div className="flex gap-4 mt-1 ml-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className={`text-xs px-1 ${reply.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                            >
                              <Heart className={`h-3 w-3 mr-1 ${reply.isLiked ? 'fill-red-500' : ''}`} /> {reply.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeComments;
