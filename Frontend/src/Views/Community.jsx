import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/community.css";
import CenterSection from "../Components/Community/CenterSection";
import UserProfileModal from "../Components/Modals/UserProfileModal";
import CreateStoryModal from "../Components/Modals/CreateStoryModal";
import WorkoutStory from "../Components/Modals/UpdateStory";
import StoryService from "../Services/StoryService";
import state from "../Utils/Store";
import { useSnapshot } from "valtio";
import CreatePostModal from "../Components/Modals/CreatePostModal";
import UserService from "../Services/UserService";
import UploadPostModal from "../Components/Modals/UploadPostModal";
import CreateLearningProgressModal from "../Components/Modals/CreateLearningProgressModal";
import LearningProgressService from "../Services/LearningProgressService";
import EditLearningProgressModal from "../Components/Modals/EditLearningProgressModal";
import UpdateSkillShareModal from "../Components/Modals/UpdateSkillShareModal";
import CreateSkillShareModal from "../Components/Modals/CreateSkillShareModal";
import SkillShareService from "../Services/SkillShareService";
import FriendProfileModal from "../Components/Modals/FriendProfileModal";
import { message } from "antd";

const Community = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

  const getWorkoutStories = async () => {
    try {
      const response = await StoryService.getAllWorkoutStories();
      state.storyCards = response;
    } catch (error) {
      console.log("Failed to fetch workout stories", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await UserService.getProfiles();
      state.users = response;
    } catch (error) {
      console.log("Failed to fetch users", error);
    }
  };

  const getLearningProgresss = async () => {
    try {
      const response = await LearningProgressService.getAllLearningProgresss();
      state.LearningProgresss = response;
    } catch (error) {
      console.log("Failed to fetch Learning Progresss ", error);
    }
  };

  const getSkillShares = async () => {
    try {
      const response = await SkillShareService.getAllSkillShares();
      state.SkillShares = response;
    } catch (error) {
      console.log("Failed to fetch Skill Shares", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      UserService.getProfile()
        .then((response) => {
          state.currentUser = response;
          message.success("Welcome");
        })
        .catch(() => {
          message.error("Failed to fetch user profile");
        });
    }
    getAllUsers().then(() => {
      getWorkoutStories();
      getLearningProgresss();
      getSkillShares();
    });
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      {/* <header className="">
        
      </header> */}

      <div className="main">
        <CenterSection />
      </div>

      <UserProfileModal />
      <CreateStoryModal />
      <CreateLearningProgressModal />
      <CreateSkillShareModal />
      {snap.selectedWorkoutStory && <WorkoutStory />}
      <CreatePostModal />
      {snap.selectedPost && <UploadPostModal />}
      {snap.selectedLearningProgress && <EditLearningProgressModal />}
      {snap.seletedSkillShareToUpdate && <UpdateSkillShareModal />}
      {snap.selectedUserProfile && <FriendProfileModal />}
    </div>
  );
};

export default Community;
