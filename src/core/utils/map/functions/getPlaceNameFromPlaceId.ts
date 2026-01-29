export const getPlaceNameFromPlaceId = (
  placeId: string
): Promise<{ name: string }> => {
  return new Promise((resolve, reject) => {
    // Membuat service tanpa perlu inisialisasi map
    // const service = new google.maps.places.PlacesService(
    //   document.createElement("div")
    // );

    // service.getDetails({ placeId }, (place, status) => {
    //   if (status === google.maps.places.PlacesServiceStatus.OK && place?.name) {
    //     resolve({
    //       name: place?.name,
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
      .fetchFields({ fields: ["displayName"] })
      .then((result) => {
        resolve({ name: result.place.displayName ?? "" });
      })
      .catch((error) => {
        reject(new Error(`Failed to get location: ${error.message}`));
      });
  });
};
