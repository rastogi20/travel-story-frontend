import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "./DateSelector";
import ImageSelector from "./ImageSelector";
import Taginput from "./Taginput";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify";

const AddEditTravelStory = ({
  type = "add",
  storyInfo = {},
  onClose,
  getAllTravelStories,
}) => {
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
  const [error, setError] = useState("");

  const handleAddOrUpdateClick = async () => {
    if (!title || !story) {
      setError("Title and Story are required.");
      return;
    }

    setError("");

    try {
      let imageUrl = storyImg;
      if (typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const requestData = {
        title,
        story,
        imageUrl,
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      };

      if (type === "edit") {
        const response = await axiosInstance.put(`/edit-story/${storyInfo._id}`, requestData);
        if (response.data?.story) {
          toast.success("Story Updated Successfully");
          getAllTravelStories();
          onClose();
        }
      } else {
        const response = await axiosInstance.post("/add-travel-story", requestData);
        if (response.data?.story) {
          toast.success("Story Added Successfully");
          getAllTravelStories();
          onClose();
        }
      }
    } catch (err) {
      console.error(`Error ${type === "edit" ? "updating" : "adding"} story:`, err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axiosInstance.delete("/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      });

      setStoryImg(null);
      toast.success("Image Deleted Successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Travel Story" : "Update Travel Story"}
        </h5>
        <button onClick={onClose} className="text-slate-500">
          <MdClose className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <label className="input-label">Title</label>
        <input
          type="text"
          placeholder="A Day at the Great Wall"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl text-slate-950 outline-none"
        />

        <DateSelector date={visitedDate} setDate={setVisitedDate} />

        <ImageSelector image={storyImg} setImage={setStoryImg} handleDelete={handleDeleteImage} />

        <label className="input-label mt-4">Story</label>
        <textarea
          placeholder="Your Story"
          rows={10}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        />

        <label className="input-label mt-4">Visited Location</label>
        <Taginput tags={visitedLocation} setTags={setVisitedLocation} />
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      <div className="flex items-center justify-end gap-4 mt-6">
        <button onClick={onClose} className="btn-small btn-delete">
          Cancel
        </button>
        <button onClick={handleAddOrUpdateClick} className="btn-small">
          {type === "edit" ? (
            <>
              <MdUpdate className="text-lg" /> Update Story
            </>
          ) : (
            <>
              <MdAdd className="text-lg" /> Add Story
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
