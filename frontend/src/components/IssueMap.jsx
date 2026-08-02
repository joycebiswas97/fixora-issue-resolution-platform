import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// ── Fix the broken default marker icon that Vite/webpack causes ─────────────
// Leaflet's default icon references assets via relative paths that break
// when bundled. We manually point them at the CDN copies instead.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ── Custom coloured marker factory ─────────────────────────────────────────
const makeIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const ICONS = {
  Pending: makeIcon('red'),
  'In Progress': makeIcon('orange'),
};

// Status pill colours for popup
const STATUS_STYLES = {
  Pending: 'background:#fef3c7;color:#b45309;',
  'In Progress': 'background:#dbeafe;color:#1d4ed8;',
};

// ── Helper: auto-pan map to new centre when it changes ─────────────────────
function MapRecentre({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

// ── Main component ──────────────────────────────────────────────────────────
/**
 * IssueMap — renders a Leaflet map showing active (Pending / In Progress) complaints.
 *
 * @prop {Array}  complaints  - Array of complaint objects from the API.
 * @prop {number} [height]    - Map container height in px (default 460).
 */
export default function IssueMap({ complaints = [], height = 460 }) {
  const DEFAULT_CENTER = [20.5937, 78.9629]; // India centre fallback
  const DEFAULT_ZOOM = 5;

  // Filter to only active issues that have valid coordinates
  const activeComplaints = useMemo(
    () =>
      complaints.filter((c) => {
        if (c.status === 'Resolved') return false;
        const coords = c.location?.coordinates;
        // GeoJSON stores [lng, lat] — both must be valid finite numbers
        return (
          Array.isArray(coords) &&
          coords.length === 2 &&
          isFinite(coords[0]) &&
          isFinite(coords[1])
        );
      }),
    [complaints]
  );

  // Auto-centre on the average lat/lng of active complaints
  const { center, zoom } = useMemo(() => {
    if (activeComplaints.length === 0) return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };

    const avgLat =
      activeComplaints.reduce((s, c) => s + c.location.coordinates[1], 0) /
      activeComplaints.length;
    const avgLng =
      activeComplaints.reduce((s, c) => s + c.location.coordinates[0], 0) /
      activeComplaints.length;

    return {
      center: [avgLat, avgLng],
      zoom: activeComplaints.length === 1 ? 13 : 10,
    };
  }, [activeComplaints]);

  const pendingCount = activeComplaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = activeComplaints.filter((c) => c.status === 'In Progress').length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Active Issues Map</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {activeComplaints.length} active complaint{activeComplaints.length !== 1 ? 's' : ''} — resolved issues are hidden
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            Pending ({pendingCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" />
            In Progress ({inProgressCount})
          </span>
        </div>
      </div>

      {/* Map */}
      <div style={{ height: `${height}px` }} className="relative z-0">
        {activeComplaints.length === 0 && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 gap-2 text-gray-400">
            <span className="text-4xl">🗺️</span>
            <p className="text-sm font-medium">No active issues to display on the map.</p>
            <p className="text-xs">All complaints are resolved — great work!</p>
          </div>
        )}

        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* Auto-recentre when data changes */}
          <MapRecentre center={center} zoom={zoom} />

          {/* OpenStreetMap tile layer — free, no API key needed */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Markers for each active complaint */}
          {activeComplaints.map((complaint) => {
            const [lng, lat] = complaint.location.coordinates; // GeoJSON → reverse for Leaflet
            const icon = ICONS[complaint.status] || ICONS['Pending'];
            const statusStyle = STATUS_STYLES[complaint.status] || '';

            return (
              <Marker key={complaint._id} position={[lat, lng]} icon={icon}>
                <Popup maxWidth={260}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                    {/* ID */}
                    <p style={{ color: '#9ca3af', marginBottom: '6px', fontSize: '11px' }}>
                      ID: <strong style={{ color: '#374151' }}>{complaint._id.slice(-10).toUpperCase()}</strong>
                    </p>

                    {/* Title */}
                    <p style={{ fontWeight: '700', color: '#111827', marginBottom: '6px', fontSize: '14px', lineHeight: '1.3' }}>
                      {complaint.title}
                    </p>

                    {/* Status + Category row */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', fontWeight: '600', fontSize: '11px', ...Object.fromEntries(statusStyle.split(';').filter(Boolean).map(s => s.split(':').map(v => v.trim()))) }}>
                        {complaint.status}
                      </span>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', background: '#f3f4f6', color: '#374151', fontWeight: '600', fontSize: '11px' }}>
                        {complaint.category}
                      </span>
                    </div>

                    {/* Description snippet */}
                    {complaint.description && (
                      <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: '1.5', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
                        {complaint.description.length > 120
                          ? complaint.description.slice(0, 120) + '…'
                          : complaint.description}
                      </p>
                    )}

                    {/* Address */}
                    {complaint.address && (
                      <p style={{ color: '#9ca3af', fontSize: '11px', marginTop: '6px' }}>
                        📍 {complaint.address}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
