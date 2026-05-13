import { useEffect, useRef } from "react";
import { dorms, Dorm } from "../data/dorms";

interface DormMapProps {
  onSelectDorm: (dorm: Dorm) => void;
}

export default function DormMap({ onSelectDorm }: DormMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, {
        center: [8.6510, 123.4190],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Zoom control bottom-right so it doesn't block pins
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Minimal attribution bottom-left, tiny
      L.control.attribution({ position: "bottomleft", prefix: false })
        .addAttribution('© <a href="https://www.openstreetmap.org/copyright" style="font-size:9px;color:#aaa">OSM</a>')
        .addTo(map);

      // Clean OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Helper: teardrop pin HTML
      const makePinHtml = (label: string, color: string, featured: boolean) => {
        const glow = featured
          ? `box-shadow:0 0 0 3px ${color}55, 0 2px 10px rgba(0,0,0,0.35);`
          : `box-shadow:0 2px 8px rgba(0,0,0,0.28);`;
        return `
          <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
            <div style="
              background:${color};
              color:white;
              font-size:11px;
              font-weight:800;
              padding:4px 9px;
              border-radius:20px;
              border:2.5px solid white;
              white-space:nowrap;
              letter-spacing:0.3px;
              ${glow}
            ">${label}</div>
            <div style="
              width:0;height:0;
              border-left:6px solid transparent;
              border-right:6px solid transparent;
              border-top:9px solid ${color};
              margin-top:-1px;
              filter:drop-shadow(0 2px 2px rgba(0,0,0,0.18));
            "></div>
          </div>`;
      };

      // JRMSU school pin
      const schoolHtml = `
        <div style="display:flex;flex-direction:column;align-items:center;cursor:default;">
          <div style="
            background:#1d4ed8;
            color:white;
            font-size:10px;
            font-weight:800;
            padding:4px 8px;
            border-radius:20px;
            border:2.5px solid white;
            white-space:nowrap;
            box-shadow:0 2px 10px rgba(0,0,0,0.35);
          ">🎓 JRMSU</div>
          <div style="
            width:0;height:0;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:9px solid #1d4ed8;
            margin-top:-1px;
          "></div>
        </div>`;

      const schoolIcon = L.divIcon({
        className: "",
        html: schoolHtml,
        iconSize: [80, 36],
        iconAnchor: [40, 36],
      });
      L.marker([8.6528, 123.4195], { icon: schoolIcon }).addTo(map);

      // Dorm pins
      dorms.forEach((dorm) => {
        const score = Number(dorm.score);
        const color =
          score >= 4.7 ? "#16a34a"
          : score >= 4.3 ? "#028090"
          : score >= 3.8 ? "#f59e0b"
          : "#ef4444";

        const label = dorm.featured ? `⭐ ${score}` : `${score}`;
        const estWidth = dorm.featured ? 58 : 38;

        const pin = L.divIcon({
          className: "",
          html: makePinHtml(label, color, !!dorm.featured),
          iconSize: [estWidth, 38],
          iconAnchor: [estWidth / 2, 38],
        });

        const marker = L.marker([dorm.lat, dorm.lng], { icon: pin }).addTo(map);

        const popupHtml = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-width:170px;padding:2px 0;">
            ${dorm.featured ? `<div style="background:#028090;color:white;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:6px;">⭐ FEATURED</div><br/>` : ""}
            <div style="font-weight:700;font-size:13px;color:#1a1a1a;margin-bottom:3px;line-height:1.2;">${dorm.name}</div>
            <div style="font-size:11px;color:#666;margin-bottom:5px;">📍 ${dorm.barangay} · ${dorm.distance} from JRMSU</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="background:${color};color:white;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">VSES ${dorm.score}</span>
              <span style="font-size:12px;font-weight:700;color:#028090;">${dorm.price}</span>
            </div>
            <button onclick="window.__selectDorm('${dorm.id}')"
              style="background:#028090;color:white;border:none;padding:7px 0;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;width:100%;letter-spacing:0.2px;">
              View Details →
            </button>
          </div>`;

        marker.bindPopup(popupHtml, {
          maxWidth: 210,
          closeButton: true,
          className: "dormiq-popup",
        });
      });

      // Global click handler for popup buttons
      (window as any).__selectDorm = (id: string) => {
        const found = dorms.find((d) => d.id === id);
        if (found) onSelectDorm(found);
      };
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[230px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
      {/* Leaflet CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* Custom popup styles */}
      <style>{`
        .dormiq-popup .leaflet-popup-content-wrapper {
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          padding: 0;
        }
        .dormiq-popup .leaflet-popup-content {
          margin: 14px 14px;
        }
        .dormiq-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: transparent !important;
          color: #bbb !important;
        }
        .leaflet-control-attribution a {
          color: #bbb !important;
        }
      `}</style>

      <div ref={mapRef} className="w-full h-full" />

      {/* Top overlay label */}
      <div className="absolute top-2.5 left-2.5 z-[999] pointer-events-none flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
        <span className="text-[10px] font-bold text-[#028090]">📍 Dorms near JRMSU</span>
      </div>

      {/* Legend bottom-left */}
      <div className="absolute bottom-2 left-2 z-[999] pointer-events-none flex gap-1.5">
        <span className="text-[9px] font-semibold bg-green-500 text-white px-1.5 py-0.5 rounded-full">4.7+</span>
        <span className="text-[9px] font-semibold bg-[#028090] text-white px-1.5 py-0.5 rounded-full">4.3+</span>
        <span className="text-[9px] font-semibold bg-amber-400 text-white px-1.5 py-0.5 rounded-full">3.8+</span>
      </div>
    </div>
  );
}
