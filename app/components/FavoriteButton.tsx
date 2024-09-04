"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// Custom components
import apiService from "../services/apiService";
import { getUserId } from "../lib/actions";
import useLoginModal from "../hooks/useLoginModal";

interface FavoriteButtonProps {
  id: string;
  is_favorite: boolean;
  markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  is_favorite,
  markFavorite,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const loginModal = useLoginModal();

  // Get user id from server
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      setIsClicked(true);

      setTimeout(() => setIsClicked(false), 300);

      if (!userId) {
        loginModal.open();
      }

      const response = await apiService.post(
        `/api/properties/${id}/toggle_favorite/`,
        {}
      );

      if (response.is_favorite) {
        toast.success("Added to favorite.");
      } else {
        toast.success("Removed from favorite.");
      }

      markFavorite(response.is_favorite);
    },
    [userId, id, markFavorite]
  );
  return (
    <div
      onClick={toggleFavorite}
      className={`absolute top-2 right-2 ${
        is_favorite ? "text-airbnb" : "text-white"
      } hover:text-airbnb transition-transform duration-300 ${
        isClicked ? "scale-150" : ""
      }`}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
};

export default FavoriteButton;
