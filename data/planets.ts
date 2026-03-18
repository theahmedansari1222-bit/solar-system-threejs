export type PlanetInfo = {
  diameter: string
  distance: string
  temperature: string
  moons: number
  dayLength: string
  yearLength: string
  funFact: string
}

export type PlanetData = {
  name: string
  texture: string
  radius: number
  orbitRadius: number
  orbitSpeed: number
  rotationSpeed: number
  color: string
  info: PlanetInfo
}

export const SUN_DATA = {
  texture: "/textures/2k_sun.jpg",
  radius: 2.5,
}

export const MOON_DATA: PlanetData = {
  name: "Moon",
  texture: "/textures/2k_moon.jpg",
  radius: 0.15,
  orbitRadius: 1.2,
  orbitSpeed: 2.5,
  rotationSpeed: 0.5,
  color: "#aaaaaa",
  info: {
    diameter: "3,474 km",
    distance: "384,400 km from Earth",
    temperature: "-173°C to 127°C",
    moons: 0,
    dayLength: "27.3 days",
    yearLength: "27.3 days (orbits Earth)",
    funFact:
      "The Moon always shows the same face to Earth — we never see its far side from the surface.",
  },
}

export const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    texture: "/textures/2k_mercury.jpg",
    radius: 0.25,
    orbitRadius: 4,
    orbitSpeed: 4.15,
    rotationSpeed: 0.01,
    color: "#b5b5b5",
    info: {
      diameter: "4,879 km",
      distance: "57.9 million km",
      temperature: "-180°C to 430°C",
      moons: 0,
      dayLength: "58.6 days",
      yearLength: "88 days",
      funFact:
        "Mercury is the smallest planet in the solar system and the closest to the Sun.",
    },
  },
  {
    name: "Venus",
    texture: "/textures/2k_venus_surface.jpg",
    radius: 0.45,
    orbitRadius: 5.5,
    orbitSpeed: 1.62,
    rotationSpeed: 0.005,
    color: "#e8cda0",
    info: {
      diameter: "12,104 km",
      distance: "108.2 million km",
      temperature: "462°C (average)",
      moons: 0,
      dayLength: "243 days",
      yearLength: "225 days",
      funFact:
        "Venus rotates in the opposite direction to most planets, and a single day on Venus is longer than its year.",
    },
  },
  {
    name: "Earth",
    texture: "/textures/2k_earth_daymap.jpg",
    radius: 0.5,
    orbitRadius: 7,
    orbitSpeed: 1.0,
    rotationSpeed: 1.0,
    color: "#4488ff",
    info: {
      diameter: "12,742 km",
      distance: "149.6 million km",
      temperature: "15°C (average)",
      moons: 1,
      dayLength: "24 hours",
      yearLength: "365.25 days",
      funFact:
        "Earth is the only planet known to have liquid water on its surface.",
    },
  },
  {
    name: "Mars",
    texture: "/textures/2k_mars.jpg",
    radius: 0.35,
    orbitRadius: 8.5,
    orbitSpeed: 0.53,
    rotationSpeed: 0.97,
    color: "#c1440e",
    info: {
      diameter: "6,779 km",
      distance: "227.9 million km",
      temperature: "-65°C (average)",
      moons: 2,
      dayLength: "24.6 hours",
      yearLength: "687 days",
      funFact:
        "Mars is home to Olympus Mons, the tallest volcano in the solar system — three times the height of Mount Everest.",
    },
  },
  {
    name: "Jupiter",
    texture: "/textures/2k_jupiter.jpg",
    radius: 1.2,
    orbitRadius: 11,
    orbitSpeed: 0.084,
    rotationSpeed: 2.4,
    color: "#c88b3a",
    info: {
      diameter: "139,820 km",
      distance: "778.5 million km",
      temperature: "-110°C (average)",
      moons: 95,
      dayLength: "9.9 hours",
      yearLength: "11.86 years",
      funFact:
        "Jupiter's Great Red Spot is a storm larger than Earth that has been raging for over 350 years.",
    },
  },
  {
    name: "Saturn",
    texture: "/textures/2k_saturn.jpg",
    radius: 1.0,
    orbitRadius: 14,
    orbitSpeed: 0.034,
    rotationSpeed: 2.2,
    color: "#e8d191",
    info: {
      diameter: "116,460 km",
      distance: "1,434 million km",
      temperature: "-140°C (average)",
      moons: 146,
      dayLength: "10.7 hours",
      yearLength: "29.46 years",
      funFact:
        "Saturn is less dense than water — if you could find a bathtub big enough, it would float.",
    },
  },
  {
    name: "Uranus",
    texture: "/textures/2k_uranus.jpg",
    radius: 0.7,
    orbitRadius: 17,
    orbitSpeed: 0.012,
    rotationSpeed: 1.4,
    color: "#73d5e8",
    info: {
      diameter: "50,724 km",
      distance: "2,871 million km",
      temperature: "-195°C (average)",
      moons: 28,
      dayLength: "17.2 hours",
      yearLength: "84 years",
      funFact:
        "Uranus is tilted nearly 90 degrees on its side, so it essentially rolls around the Sun like a ball.",
    },
  },
  {
    name: "Neptune",
    texture: "/textures/2k_neptune.jpg",
    radius: 0.65,
    orbitRadius: 20,
    orbitSpeed: 0.006,
    rotationSpeed: 1.5,
    color: "#3f54ba",
    info: {
      diameter: "49,528 km",
      distance: "4,495 million km",
      temperature: "-200°C (average)",
      moons: 16,
      dayLength: "16.1 hours",
      yearLength: "164.8 years",
      funFact:
        "Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 km/h.",
    },
  },
]
