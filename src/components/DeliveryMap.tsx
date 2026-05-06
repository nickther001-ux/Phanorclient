import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLang } from '../context/LangContext';

const ZONES = [
  {
    id: 1,
    center: [45.501, -73.567] as [number, number],
    label_fr: 'Centre-Ville, Vieux-Montréal, Griffintown',
    label_en: 'Downtown, Old Montréal, Griffintown',
    radius: 3200,
  },
  {
    id: 2,
    center: [45.524, -73.583] as [number, number],
    label_fr: 'Plateau, Mile-End, Outremont',
    label_en: 'Plateau, Mile-End, Outremont',
    radius: 2800,
  },
  {
    id: 3,
    center: [45.474, -73.624] as [number, number],
    label_fr: "Ouest de l'Île, NDG, Westmount",
    label_en: 'West Island, NDG, Westmount',
    radius: 3800,
  },
  {
    id: 4,
    center: [45.607, -73.555] as [number, number],
    label_fr: 'Est de Montréal, Anjou',
    label_en: 'East Montréal, Anjou',
    radius: 3200,
  },
  {
    id: 5,
    center: [45.562, -73.706] as [number, number],
    label_fr: 'Laval & Rive-Sud',
    label_en: 'Laval & South Shore',
    radius: 4200,
  },
];

const GOLD = '#C5A059';
const GOLD_FILL = 'rgba(197,160,89,0.18)';

export default function DeliveryMap() {
  const { lang } = useLang();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '420px',
      border: '1px solid rgba(197,160,89,0.3)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Override leaflet popup style to match brand */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: #1A1A1A;
          border: 1px solid rgba(197,160,89,0.4);
          border-radius: 0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.6);
          color: #F5F5F5;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }
        .leaflet-popup-tip {
          background: #1A1A1A;
        }
        .leaflet-popup-close-button {
          color: #C5A059 !important;
          font-size: 1.1rem !important;
        }
        .leaflet-control-zoom a {
          background: #1A1A1A !important;
          color: #C5A059 !important;
          border-color: rgba(197,160,89,0.3) !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(197,160,89,0.15) !important;
        }
        .leaflet-control-attribution {
          background: rgba(26,26,26,0.85) !important;
          color: rgba(245,245,245,0.35) !important;
          font-size: 0.6rem !important;
        }
        .leaflet-control-attribution a {
          color: rgba(197,160,89,0.6) !important;
        }
        .zone-label {
          background: #1A1A1A;
          border: 1px solid rgba(197,160,89,0.5);
          color: #C5A059;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          padding: 2px 7px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
      `}</style>

      <MapContainer
        center={[45.51, -73.60]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', minHeight: '420px', background: '#1A1A1A' }}
        zoomControl={true}
      >
        {/* CartoDB Dark Matter — no external API key needed */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {ZONES.map((zone) => (
          <CircleMarker
            key={zone.id}
            center={zone.center}
            radius={18}
            pathOptions={{
              color: GOLD,
              fillColor: GOLD_FILL,
              fillOpacity: 1,
              weight: 1.5,
              opacity: 0.9,
            }}
          >
            <Popup>
              <div style={{ padding: '0.35rem 0.2rem' }}>
                <div style={{ color: '#C5A059', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
                  ZONE {zone.id}
                </div>
                <div style={{ color: 'rgba(245,245,245,0.85)', lineHeight: 1.5 }}>
                  {lang === 'fr' ? zone.label_fr : zone.label_en}
                </div>
                <div style={{ marginTop: '0.35rem', color: '#C5A059', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                  QUOTIDIEN
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
