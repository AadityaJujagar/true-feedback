import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useComment } from "../hooks/useComment";
import { useEffect, useState } from "react";
import { CommentBox } from "../components/comments/CommentBox";
import { CommentList } from "../components/comments/CommentList";
import { useSocket } from "../hooks/useSocket";
import { apiConnector } from "../api/apiConnector";
import { profileEndpoints } from "../api/endpoints";
import toast from "react-hot-toast";

export const Profile = () => {
  const socket = useSocket();
  const { userId } = useParams();
  const { user, setUser } = useAuth();
  const { comments, fetchComments, loading } = useComment();

  const isOwnProfile = !userId || userId === user?._id;

  const [profileUserId, setProfileUserId] = useState(null);
  const [profileOwner, setProfileOwner] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const idToFetch = isOwnProfile ? user._id : userId;
    setProfileUserId(idToFetch);
    fetchComments(idToFetch);
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (isOwnProfile) {
      setProfileOwner(user);
      setNewName(user.name);
      return;
    }

    if (!userId) return;

    const fetchProfileOwner = async () => {
      try {
        setLoadingProfile(true);
        const res = await apiConnector(
          "GET",
          profileEndpoints.GET_USER_PROFILE_API(userId),
        );
        if (res.data.success) {
          setProfileOwner(res.data.user);
        }
      } catch (err) {
        toast.error("Failed to load profile: ", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileOwner();
  }, [userId, isOwnProfile, user]);

  useEffect(() => {
    if (!profileUserId || !socket) return;
    socket.emit("profile:join", profileUserId);
    return () => socket.emit("profile:leave", profileUserId);
  }, [profileUserId, socket]);

  const handleShareProfile = async () => {
    const shareUrl = `${window.location.origin}/profile/${user._id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Profile link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleProfileUpdate = async () => {
    if (!newName && !newImage) {
      toast.error("Nothing to update");
      return;
    }

    const formData = new FormData();
    if (newName) formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    try {
      setUpdating(true);

      const res = await apiConnector(
        "PUT",
        profileEndpoints.UPDATE_PROFILE_API,
        formData,
        { "Content-Type": "multipart/form-data" },
      );

      if (res.data.success) {
        setUser(res.data.user);
        setProfileOwner(res.data.user);
        toast.success("Profile updated!");
        setIsEditing(false);
        setNewImage(null);
      }
    } catch (err) {
      toast.error("Profile update failed: ", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="border border-border/50 rounded-2xl p-6 bg-card text-center space-y-4">
              <img
                src={profileOwner?.image}
                alt="profile"
                className="h-32 w-32 rounded-full object-cover mx-auto border-4 border-background shadow-lg"
              />

              {isEditing ? (
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-center text-xl font-bold border-b border-border bg-transparent focus:outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold">
                  {loadingProfile ? "Loading..." : profileOwner?.name}
                </h2>
              )}

              {isOwnProfile && (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>

            {isOwnProfile && (
              <div className="flex flex-col gap-2">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full py-2 rounded-full bg-primary text-primary-foreground"
                    >
                      Edit Name or Profile Picture
                    </button>

                    <button
                      onClick={handleShareProfile}
                      className="w-full py-2 rounded-full border border-border"
                    >
                      Share Profile
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.target.files[0])}
                    />

                    <button
                      onClick={handleProfileUpdate}
                      disabled={updating}
                      className="w-full py-2 rounded-full bg-primary text-primary-foreground"
                    >
                      {updating ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full py-2 rounded-full border"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}

            {!isOwnProfile && <CommentBox profileOwnerId={profileUserId} />}
          </div>
        </aside>

        <section className="md:col-span-2">
          <div className="border border-border/50 rounded-2xl bg-card h-[75vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-bold">Feedback</h3>
              <span className="text-sm text-muted-foreground">
                {comments.length} comments
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {loading ? (
                <p className="text-center text-muted-foreground">
                  Loading feedback...
                </p>
              ) : comments.length === 0 ? (
                <p className="text-center text-muted-foreground italic">
                  No feedback yet.
                </p>
              ) : (
                <CommentList
                  comments={comments}
                  loading={loading}
                  isOwnProfile={isOwnProfile}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
