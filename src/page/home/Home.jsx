import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router';
import Navbar from '../../component/Navbar';
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import TravelStoryCard from '../../component/TravelStoryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from './AddEditTravelStory';
import ViewTravelStory from './ViewTravelStory';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
import FilterInfoTitle from './FilterInfoTitle';

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [dateRange, setdateRange] = useState({ form: null, to: null });
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [openViewModel, setopenViewModal] = useState({ isShown: false, data: null });

  const navigate = useNavigate();

  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data });
  };

  const deleteTravelstory = async (data) => {
    const storyId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-story/${storyId}`);
      if (response.data && !response.data.error) {
        toast.error("Story Deleted Successfully");
        setopenViewModal(prevState => ({ ...prevState, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { query },
      });

      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const handleViewStory = (data) => {
    setopenViewModal({ isShown: true, data });
  };

  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(`/update-is-favours/${storyId}`, {
        isFavourite: !storyData.isFavourite,
      });

      if (response.data && response.data.story) {
        toast.success("Favourite status updated successfully!");
        getAllTravelStories();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const handleclearSearch = () => {
    setSearchQuery(null);
    setFilterType("");
    getAllTravelStories();
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const filterStoriesByDate = async (day) => {
    const startDate = day.from ? moment(day.from).valueOf() : null;
    const endDate = day.to ? moment(day.to).valueOf() : null;

    try {
      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-stories/filter", {
          params: { startDate, endDate },
        });

        if (response.data && response.data.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const handleDayClick = (day) => {
    setdateRange(day);
    filterStoriesByDate(day);
  };

  const resetFilter = () => {
    setdateRange({ from: null, to: null });
    setFilterType("");
    getAllTravelStories();
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchNote={onSearchStory} handleclearSearch={handleclearSearch} />
      <div className="container mx-auto py-10">
        <FilterInfoTitle filterType={filterType} filterDates={dateRange} onClear={resetFilter} />
        <div className="flex flex-col sm:flex-row gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onEdit={() => handleEdit(item)}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <img
                  src="https://via.placeholder.com/150"
                  alt="No stories"
                  className="w-32 h-32 mb-4"
                />
                
                <h2 className="text-xl font-semibold text-gray-700">No Travel Stories Available</h2>
                <p className="text-gray-500 mt-2">It looks like there are no travel stories to show. Add your first story or check back later!</p>
              </div>
            
            )}
          </div>

          <div className="w-full sm:w-[340px] lg:w-[340px]">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box max-w-full sm:max-w-lg md:max-w-md lg:max-w-lg"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      <Modal
        isOpen={openViewModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box max-w-full sm:max-w-lg md:max-w-md lg:max-w-lg"
      >
        <ViewTravelStory
          storyInfo={openViewModel.data || null}
          onClose={() => {
            setopenViewModal((prev) => ({ ...prev, isShown: false }));
          }}
          onEditclick={() => {
            setopenViewModal((prev) => ({ ...prev, isShown: false }));
            handleEdit(openViewModel.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelstory(openViewModel.data || null);
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10 sm:right-4 sm:bottom-4"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  );
}

export default Home;
