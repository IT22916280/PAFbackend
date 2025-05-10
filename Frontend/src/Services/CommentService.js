import axios from "axios";
import { BASE_URL } from "../constants";
import NotificationService from "./NotificationService";

class CommentService {
// Creates a new comment and sends a notification to the post owner
  async createComment(commentData, username, userId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/comments`,
        commentData,
        config
      );
      if (response.status === 200) {
        try {
          const body = {
            userId: userId,
            message: "You have a new comment",
            description: "The post commented by " + username,
          };

          await NotificationService.createNotification(body);
        } catch (error) {}
      }
      return response.data;
    } catch (error) {
      throw new Error("Failed to create comment");
    }
  }

  // Retrieves all comments for a given post ID
  async getCommentsByPostId(postId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/comments/post/${postId}`,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get comments by post ID");
    }
  }

// Updates an existing comment by its ID
  async updateComment(commentId, commentData) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/comments/${commentId}`,
        commentData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update comment");
    }
  }

// Deletes a comment by its ID
  async deleteComment(commentId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.delete(`${BASE_URL}/comments/${commentId}`, config);
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
}

export default new CommentService();
