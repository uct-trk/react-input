import React, { useState } from "react";

function HomeLayout() {
  const [route, setRoute] = useState({
    route: "",
    stations: [],
  });

  const handleRoute = (e) => {
    setRoute((route) => ({
      ...route,
      route: e.target.value,
    }));
  };

  const addStation = () => {
    setRoute((route) => ({
      ...route,
      stations: [
        ...route.stations,
        {
          name: "",
          lat: "",
          lon: "",
          errors: {},
        },
      ],
    }));
  };

  const handleStation = (val, name, key) => {
    setRoute((route) => ({
      ...route,
      stations: route.stations.map((station, i) => {
        if (key === i) {
          station[name] = val;
          let current = route.stations.find(
            (r, index) => r[name] === val && key !== index
          );
          if (current) {
            station.errors[
              name
            ] = `${name} değeri başka bir alanda ${val} değeriyle zaten tanımlanmış`;
          } else {
            delete station.errors[name];
          }
        }
        return station;
      }),
    }));
  };

  const enabled =
    route.route &&
    route.stations.every((station) => {
      return Object.entries(station).every(([key, value]) =>
        key === "errors" ? Object.values(value).length === 0 : value
      );
    });

  return (
    <>
      <input
        value={route.route}
        onChange={handleRoute}
        type="text"
        placeholder="Güzergah"
      />
      <button onClick={addStation}>Yeni Durek Ekle</button>
      <hr />
      {route?.stations.map((station, key) => (
        <div key={key}>
          <input
            type="text"
            onChange={(e) => handleStation(e.target.value, "name", key)}
            placeholder="Durak Adı"
          />
          <input
            type="text"
            onChange={(e) => handleStation(e.target.value, "lat", key)}
            placeholder="Enlem"
          />
          <input
            type="text"
            onChange={(e) => handleStation(e.target.value, "lon", key)}
            placeholder="Boylam"
          />
        </div>
      ))}

      <hr />
      <button disabled={!enabled}>Kaydet</button>
      <br />
      <pre>{JSON.stringify(route, null, 2)}</pre>
    </>
  );
}

export default HomeLayout;
