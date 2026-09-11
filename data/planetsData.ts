export interface PlanetInfo {
  name: string
  type: string
  diameter: string
  dayLength: string
  orbitPeriod: string
  moons: number
  fact: string
}

export const PLANETS_DATA: Record<string, PlanetInfo> = {
  Mercury: {
    name: 'Mercury',
    type: 'Terrestrial',
    diameter: '4,879 km',
    dayLength: '59 Earth days',
    orbitPeriod: '88 Earth days',
    moons: 0,
    fact: 'Smallest planet in the solar system and closest to the Sun. Despite being closest, it is not the hottest planet.',
  },
  Venus: {
    name: 'Venus',
    type: 'Terrestrial',
    diameter: '12,104 km',
    dayLength: '243 Earth days',
    orbitPeriod: '225 Earth days',
    moons: 0,
    fact: 'Spins in the opposite direction to most planets. Its thick atmosphere traps heat in a runaway greenhouse effect.',
  },
  Earth: {
    name: 'Earth',
    type: 'Terrestrial',
    diameter: '12,742 km',
    dayLength: '24 hours',
    orbitPeriod: '365.25 days',
    moons: 1,
    fact: 'The only world in our solar system known to harbour life and liquid surface oceans.',
  },
  Mars: {
    name: 'Mars',
    type: 'Terrestrial',
    diameter: '6,779 km',
    dayLength: '24.6 hours',
    orbitPeriod: '687 Earth days',
    moons: 2,
    fact: 'Known as the Red Planet due to iron oxide (rust) on its surface. Home to the tallest mountain in the solar system.',
  },
  Jupiter: {
    name: 'Gas Giant',
    type: 'Gas Giant',
    diameter: '139,820 km',
    dayLength: '9.9 hours',
    orbitPeriod: '12 Earth years',
    moons: 95,
    fact: 'More than twice as massive as all other planets combined. Its iconic Great Red Spot is a storm bigger than Earth.',
  },
  Saturn: {
    name: 'Gas Giant',
    type: 'Gas Giant',
    diameter: '116,460 km',
    dayLength: '10.7 hours',
    orbitPeriod: '29 Earth years',
    moons: 146,
    fact: 'Adorned with thousands of beautiful ringlets made of ice and rock chunks.',
  },
  Uranus: {
    name: 'Ice Giant',
    type: 'Ice Giant',
    diameter: '50,724 km',
    dayLength: '17.2 hours',
    orbitPeriod: '84 Earth years',
    moons: 28,
    fact: 'Rotates almost completely on its side at a 98-degree tilt, likely due to an ancient massive collision.',
  },
  Neptune: {
    name: 'Ice Giant',
    type: 'Ice Giant',
    diameter: '49,244 km',
    dayLength: '16.1 hours',
    orbitPeriod: '165 Earth years',
    moons: 16,
    fact: 'Dark, cold, and whipped by supersonic winds—the most distant major planet in our solar system.',
  },
}