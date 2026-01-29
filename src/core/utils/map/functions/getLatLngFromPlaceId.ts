export const getLatLngFromPlaceId = (
  placeId: string
): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    // Membuat service tanpa perlu inisialisasi map
    // const service = new google.maps.places.PlacesService(
    //   document.createElement("div")
    // );

    // service.getDetails({ placeId }, (place, status) => {
    //   if (
    //     status === google.maps.places.PlacesServiceStatus.OK &&
    //     place?.geometry?.location
    //   ) {
    //     resolve({
    //       lat: place.geometry.location.lat(),
    //       lng: place.geometry.location.lng(),
    //     });
    //   } else {
    //     reject(new Error(`Failed to get location: ${status}`));
    //   }
    // });
    const place = new google.maps.places.Place({
      id: placeId,
      requestedLanguage: "de", // optional
      requestedRegion: "DE", // optional
    });

    place
      .fetchFields({ fields: ["location"] })
      .then((result) => {
        resolve({
          lat: result.place.location?.lat() ?? 0,
          lng: result.place.location?.lng() ?? 0,
        });
      })
      .catch((error) => {
        reject(new Error(`Failed to get location: ${error.message}`));
      });
  });
};
