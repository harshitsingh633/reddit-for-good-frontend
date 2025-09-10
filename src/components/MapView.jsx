// src/components/MapView.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function MapView() {
  const [posts, setPosts] = useState([]);

  const groceryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  const rideIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  const housingIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  const defaultIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  function getIcon(post) {
    const text = (post.title + " " + post.text).toLowerCase();

    if (text.includes("grocery") || text.includes("food")) return groceryIcon;
    if (text.includes("ride") || text.includes("car") || text.includes("bus"))
      return rideIcon;
    if (
      text.includes("rent") ||
      text.includes("room") ||
      text.includes("house")
    )
      return housingIcon;

    return defaultIcon;
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "220px",
          background: "#f8f9fa",
          padding: "15px",
          borderRight: "1px solid #ddd",
          fontSize: "14px",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Legend</h3>
        <div style={{ display: "flex", alignItems: "center", margin: "6px 0" }}>
          <img src={groceryIcon.options.iconUrl} width="22" alt="grocery" />
          <span style={{ marginLeft: "8px" }}>Groceries / Food</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "6px 0" }}>
          <img src={rideIcon.options.iconUrl} width="22" alt="ride" />
          <span style={{ marginLeft: "8px" }}>Rides / Transport</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "6px 0" }}>
          <img src={housingIcon.options.iconUrl} width="22" alt="housing" />
          <span style={{ marginLeft: "8px" }}>Housing / Rent</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "6px 0" }}>
          <img src={defaultIcon.options.iconUrl} width="22" alt="other" />
          <span style={{ marginLeft: "8px" }}>Other Requests</span>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <MapContainer
          center={[28.6139, 77.209]} // Delhi
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {posts.map((post, idx) => (
            <Marker
              key={idx}
              position={[post.lat, post.lng]}
              icon={getIcon(post)}
            >
              <Popup>
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.text ? post.text.slice(0, 100) : ""}...</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  View on Reddit
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
