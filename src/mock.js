export const renderedShows = [
  {
    id: 3,
    name: "Show 3",
    image: { medium: "https://example.com/show3.jpg" },
    rating: { average: 8 },
    language: "english",
    summary: "show summary",
    genres: ["genre3", "genre4"],
    premiered: "02/08/2023",
  },
  {
    id: 2,
    name: "Show 2",
    image: { medium: "https://example.com/show2.jpg" },
    rating: { average: 7 },
    language: "english",
    summary: "show summary",
    genres: ["genre3", "genre4"],
    premiered: "02/08/2025",
  },
  {
    id: 1,
    name: "Show 1",
    image: { medium: "https://example.com/show1.jpg" },
    rating: { average: 5 },
    language: "english",
    summary: "show summary",
    genres: ["genre1", "genre2"],
    premiered: "02/08/2024",
  },
];

export const shows = [
  {
    id: 1,
    name: "Show 1",
    image: {
      medium: "https://example.com/show1.jpg",
    },
    rating: { average: 5 },
    language: "english",
    summary: "show summary",
    genres: ["genre1", "genre2"],
    premiered: "02/08/2024",
  },
  {
    id: 2,
    name: "Show 2",
    image: {
      medium: "https://example.com/show2.jpg",
    },
    rating: { average: 7 },
    language: "english",
    summary: "show summary",
    genres: ["genre3", "genre4"],
    premiered: "02/08/2025",
  },
  {
    id: 3,
    name: "Show 3",
    image: {
      medium: "https://example.com/show3.jpg",
    },
    rating: { average: 8 },
    language: "english",
    summary: "show summary",
    genres: ["genre3", "genre4"],
    premiered: "02/08/2023",
  },
];

export const show = {
  id: 1,
  name: "Show 1",
  imageUrl:
    "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
  rating: 5,
  language: "english",
  summary: "show summary",
  genres: ["genre1", "genre2"],
  premiered: "02/08/2024",
};

export const filteredAndGroupedShows = {
  Drama: [
    {
      id: 1,
      name: "Show 1",
      image: { medium: "https://example.com/show1.jpg" },
      rating: { average: 8.5 },
      // other show properties
    },
    {
      id: 2,
      name: "Show 2",
      image: { medium: "https://example.com/show2.jpg" },
      rating: { average: 7.2 },
    },
  ],
  Comedy: [
    {
      id: 3,
      name: "Show 3",
      image: { medium: "https://example.com/show3.jpg" },
      rating: { average: 9.1 },
    },
  ],
};
