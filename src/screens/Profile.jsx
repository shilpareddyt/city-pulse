import React from "react";
import { useFavorites } from "../shared/hooks/useFavorites";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { localeOption } from "primereact/api";

const Profile = () => {
  const { favorites } = useFavorites();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const initial = user.email ? user.email[0].toUpperCase() : "?";

  return (
    <div className="min-h-screen p-4 surface-100">
      <div className="grid md:flex md:gap-4 justify-content-center">
        {/* User Profile */}
        <div className="w-full md:w-5">
          <Card
            title={localeOption("USER_PROFILE") || "User Profile"}
            className="shadow-4 border-round-xl h-full"
            style={{ minHeight: "400px", backgroundColor: "#fefefe" }}
          >
            <div className="flex flex-column align-items-center gap-3 mb-3">
              <Avatar
                label={initial}
                size="xlarge"
                style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                shape="circle"
              />
              <h3 className="text-2xl font-medium text-primary">{user.email}</h3>
            </div>
            <Divider />
            <div className="flex  text-sm text-color-secondary">
              <span className="font-semibold">{localeOption("EMAIL") || "Email"}:</span>
              <span>{user.email}</span>
            </div>
          </Card>
        </div>

        {/* Favorite Events with Scroll */}
        <div className="w-full md:w-5">
          <Card
            title={localeOption("FAVORITE_EVENTS") || "Favorite Events"}
            className="shadow-4 border-round-xl h-full"
            style={{ minHeight: "400px", backgroundColor: "#fefefe" }}
          >
            <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
              {favorites.length > 0 ? (
                <ul className="list-none p-0 m-0">
                  {favorites.map((fav) => (
                    <li
                      key={fav.id}
                      className="mb-2 p-3 border-1 surface-border border-round hover:surface-hover transition-duration-200"
                    >
                      <i className="pi pi-heart-fill text-pink-500 mr-2" />
                      <span className="text-lg font-medium">{fav.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center mt-4">
                  {localeOption("NO_FAVORITES") || "No favorite events yet."}
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
