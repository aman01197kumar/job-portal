import axios from "axios";
import { useEffect, useState } from "react";

const useFetchFeatureSelection = (token, END_POINT) => {
  const [featureSelection, setFeatureSelection] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          `${BASE_URL}/${END_POINT}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFeatureSelection(response.data.feature_selection);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [token, END_POINT]);

  return featureSelection;
};

export default useFetchFeatureSelection;    