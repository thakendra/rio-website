"use client"

import { GlobeFlights } from "@/components/ui/cobe-globe-flights"

// Origin: Kathmandu, Nepal
const KTM: [number, number] = [27.70, 85.32]

// Start with Asia (Nepal) facing the viewer, then let it rotate.
// Facing longitude `lng` on the front hemisphere: phi = 3π/2 - lng(rad)
const ASIA_PHI = (3 * Math.PI) / 2 - (KTM[1] * Math.PI) / 180

// Destination: label, ISO country code (for the flag), airport coords, declutter nudge
const destinations: {
  id: string
  label: string
  code: string
  location: [number, number]
  labelOffset?: [number, number]
}[] = [
  // Gulf states sit almost on top of each other — fan them into a column.
  { id: "ksa", label: "Saudi Arabia (Riyadh)", code: "sa", location: [24.71, 46.68], labelOffset: [24, -24] },
  { id: "mys", label: "Malaysia (Kuala Lumpur)", code: "my", location: [3.14, 101.69] },
  { id: "uae", label: "UAE (Dubai)", code: "ae", location: [25.20, 55.27], labelOffset: [24, 26] },
  { id: "qat", label: "Qatar (Doha)", code: "qa", location: [25.29, 51.53], labelOffset: [24, 1] },
  { id: "omn", label: "Oman (Muscat)", code: "om", location: [23.59, 58.41], labelOffset: [50, 1] },
  // Europe is a tight cluster too — fan the flags out so they stay readable.
  { id: "eur", label: "Europe (Frankfurt)", code: "eu", location: [50.11, 8.68], labelOffset: [-48, -30] },
  { id: "hrv", label: "Croatia (Zagreb)", code: "hr", location: [45.81, 15.98], labelOffset: [-48, -4] },
  { id: "rou", label: "Romania (Bucharest)", code: "ro", location: [44.43, 26.10], labelOffset: [-26, -46] },
  { id: "pol", label: "Poland (Warsaw)", code: "pl", location: [52.23, 21.01], labelOffset: [26, -42] },
  { id: "grc", label: "Greece (Athens)", code: "gr", location: [37.98, 23.73], labelOffset: [-8, -26] },
]

function Flag({ code, title }: { code: string; title: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      srcSet={`https://flagcdn.com/48x36/${code}.png 2x`}
      width={24}
      height={18}
      alt={title}
      title={title}
      style={{ display: "block", borderRadius: 3, boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }}
    />
  )
}

const arcs = destinations.map((d) => ({
  id: `ktm-${d.id}`,
  from: KTM,
  to: d.location,
  label: <Flag code={d.code} title={d.label} />,
  labelOffset: d.labelOffset,
}))

const markers = [
  { id: "apt-ktm", location: KTM },
  ...destinations.map((d) => ({ id: `apt-${d.id}`, location: d.location })),
]

/** Rio Overseas hero globe — Nepal-origin flight routes with country flags. */
export function HeroGlobe({ className = "" }: { className?: string }) {
  return (
    <GlobeFlights arcs={arcs} markers={markers} initialPhi={ASIA_PHI} className={className} />
  )
}
