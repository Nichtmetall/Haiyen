export const LOCATIONS = {
  striesen: {
    name: "Striesen", street: "Borsbergstraße 21", city: "01309 Dresden",
    phone: "0351 323 22 434", phoneHref: "+4935132322434",
    hours: [{ days: "Mo – Fr", time: "09:00 – 19:00 Uhr" }, { days: "Sa", time: "09:00 – 16:00 Uhr" }],
    bookingUrl: "https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1b&darkTheme=true",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Borsbergstra%C3%9Fe+21%2C+01309+Dresden",
    mapEmbed: "https://www.google.com/maps?q=Borsbergstra%C3%9Fe+21,+01309+Dresden&output=embed",
  },
  neustadt: {
    name: "Neustadt", street: "Bautzner Straße 46", city: "01099 Dresden",
    phone: "0351 792 66 54", phoneHref: "+493517926654",
    hours: [{ days: "Mo", time: "09:00 – 17:00 Uhr" }, { days: "Di – Fr", time: "09:00 – 19:00 Uhr" }, { days: "Sa", time: "09:00 – 14:00 Uhr" }],
    bookingUrl: "https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1a&darkTheme=true",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bautzner+Stra%C3%9Fe+46%2C+01099+Dresden",
    mapEmbed: "https://www.google.com/maps?q=Bautzner+Stra%C3%9Fe+46,+01099+Dresden&output=embed",
  },
};
export type LocationKey = keyof typeof LOCATIONS;
