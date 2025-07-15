import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { localeOption } from "primereact/api";
import { useFavorites } from "../shared/hooks/useFavorites";

const Home = () => {
  const [isNoDataFound, setIsNoDataFound] = useState(false);
  const navigate = useNavigate();
  const { layoutConfig } = useFavorites();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      keyword: "",
    },
  });

  const fetchEvents = async (params) => {
    try {
      const res = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
        params: {
          city: params.city,
          keyword: params.keyword,
          apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
          page: 0,
          size: 20,
        },
      });

      const newEvents = res.data._embedded?.events || [];
      if (newEvents.length === 0) {
        setIsNoDataFound(true);
      } else {
        setIsNoDataFound(false);
        navigate("/event_details", {
          state: {
            city: params.city,
            keyword: params.keyword,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const onSubmit = (data) => {
    fetchEvents(data);
  };

  return (
    <div className="min-h-screen p-4 surface-100 flex justify-content-center align-items-center">
      <div className="w-full md:w-6 lg:w-4">
        <Card
          title={localeOption("EVENT_SEARCH") || "Search Events"}
          className="shadow-5 border-round-xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            {/* City Field */}
            <div className="field mb-4">
              <label htmlFor="city" className="block font-semibold text-primary mb-2">
                {localeOption('CITY')}
              </label>
              <Controller
                name="city"
                control={control}
                rules={{ required: "Please enter City name" }}
                render={({ field }) => (
                  <>
                    <InputText
                      id="city"
                      placeholder="Enter city (e.g. Chicago)"
                      {...field}
                      className={errors.city ? "p-invalid" : ""}
                    />
                    {errors.city && (
                      <small className="p-error block">{errors.city.message}</small>
                    )}
                  </>
                )}
              />
            </div>

            {/* Keyword Field */}
            <div className="field mb-4">
              <label htmlFor="keyword" className="block font-semibold text-primary mb-2">
                {localeOption('KEYWORD')}
              </label>
              <Controller
                name="keyword"
                control={control}
                rules={{ required: "Keyword is required" }}
                render={({ field }) => (
                  <>
                    <InputText
                      id="keyword"
                      placeholder="Enter keyword"
                      {...field}
                      className={errors.keyword ? "p-invalid" : ""}
                    />
                    {errors.keyword && (
                      <small className="p-error block">{errors.keyword.message}</small>
                    )}
                  </>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              label={localeOption('SEARCH')}
              icon="pi pi-search"
              type="submit"
              severity="info"
              className="w-full mt-2"
              rounded
              raised
            />
          </form>
        </Card>

        {/* No Records Found Message */}
        {isNoDataFound && (
          <div className="mt-3 text-center text-sm text-red-500 font-medium">
            No records found for this search. Try a different keyword or city.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
