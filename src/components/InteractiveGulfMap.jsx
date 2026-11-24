import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Minus,
  Navigation,
  Layers,
  Crosshair,
  ExternalLink,
} from 'lucide-react';

export default function InteractiveGulfMap({
  activeItem,
  allItems,
  onSelectPin,
  labels,
}) {
  const [zoom, setZoom] = useState(2.2);
  const [mapMode, setMapMode] = useState('architectural');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef(null);

  useEffect(() => {
    setDragOffset({ x: 0, y: 0 });
  }, [activeItem.id]);

  const handleCenterOnActive = () => {
    setZoom(2.2);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () =>
    setZoom((z) => Math.min(3.8, +(z + 0.5).toFixed(1)));
  const handleZoomOut = () =>
    setZoom((z) => Math.max(1.1, +(z - 0.5).toFixed(1)));

  const handlePointerDown = (e) => {
    dragStartRef.current = {
      startX: e.clientX - dragOffset.x,
      startY: e.clientY - dragOffset.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragStartRef.current) return;
    setDragOffset({
      x: e.clientX - dragStartRef.current.startX,
      y: e.clientY - dragStartRef.current.startY,
    });
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
  };

  const translateX = (50 - activeItem.coords.x) * zoom;
  const translateY = (50 - activeItem.coords.y) * zoom;

  const regionPeers = allItems.filter(
    (item) => item.regionGroup === activeItem.regionGroup
  );

  const isSat = mapMode === 'satellite';

  return (
    <div
      className={`relative h-full min-h-[290px] rounded-none border border-[#C5A059]/55 flex flex-col justify-between overflow-hidden select-none ${
        isSat ? 'bg-[#0C141A]' : 'bg-[#13191E]'
      }`}
    >
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#1A110B]/95 border-b border-[#C5A059]/35 text-[11px]">
        <div className="flex items-center gap-1.5 text-[#E6C78B] font-semibold">
          <Navigation className="w-3 h-3 text-[#C5A059]" />
          <span>{activeItem.marketLabel}</span>
          <span className="text-[#F7F3EA]/45 hidden sm:inline">·</span>
          <span className="text-[10px] font-mono text-[#D6B77E] hidden sm:inline">
            {activeItem.gps}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              setMapMode((m) =>
                m === 'architectural' ? 'satellite' : 'architectural'
              )
            }
            className="inline-flex items-center gap-1 rounded-none bg-[#241810] hover:bg-[#C5A059] text-[#E6C78B] hover:text-[#1A110B] border border-[#C5A059]/45 px-2 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer"
          >
            <Layers className="w-3 h-3" />
            <span>{isSat ? labels.mapStyleStreet : labels.mapStyleSat}</span>
          </button>

          <a
            href={activeItem.mapQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-none bg-[#C5A059] hover:bg-[#E6C78B] text-[#1A110B] px-2 py-0.5 text-[10px] font-bold transition-colors"
          >
            <span>{labels.openMapLabel}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div
          style={{
            transform: `translate3d(calc(${translateX}% + ${dragOffset.x}px), calc(${translateY}% + ${dragOffset.y}px), 0) scale(${zoom})`,
            transformOrigin: '50% 50%',
          }}
          className="relative w-full h-full transition-transform duration-300 ease-out"
        >
          <svg
            viewBox="0 0 400 260"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            className="w-full h-full"
          >
            <rect
              width="400"
              height="260"
              fill={isSat ? '#0B1D2A' : '#13222B'}
            />

            <g
              stroke="#C5A059"
              strokeOpacity="0.08"
              strokeWidth="0.5"
              fill="none"
            >
              <path d="M 30 90 Q 75 150 115 235" />
              <path d="M 225 45 Q 275 85 335 110" />
            </g>

            <path
              d="M 45 20 L 165 18 L 215 48 L 248 82 L 260 105 L 278 106 L 315 112 L 348 128 L 332 175 L 265 215 L 155 245 L 118 228 L 78 158 L 42 92 Z"
              fill={isSat ? '#26211A' : '#241B14'}
              stroke="#C5A059"
              strokeOpacity="0.45"
              strokeWidth="0.9"
            />

            <path
              d="M 110 75 Q 185 65 235 115 Q 265 155 210 195 Q 145 185 110 75 Z"
              fill={isSat ? '#31291F' : '#2D2118'}
              opacity="0.7"
            />

            <g
              stroke={isSat ? '#E6C78B' : '#C5A059'}
              strokeOpacity="0.32"
              strokeWidth="0.7"
              strokeDasharray="2 1.5"
              fill="none"
            >
              <path d="M 184 128 Q 140 145 94 164" />
              <path d="M 184 128 L 252 115 L 302 123" />
              <circle cx="182" cy="129" r="7" />
              <circle cx="182" cy="129" r="3.5" />
            </g>

            <g
              fill="#D6B77E"
              fillOpacity="0.55"
              fontSize="5.5"
              fontFamily="sans-serif"
              letterSpacing="0.8"
            >
              <text x="48" y="165" transform="rotate(58 48 165)">
                RED SEA
              </text>
              <text x="255" y="72" transform="rotate(28 255 72)">
                ARABIAN GULF
              </text>
            </g>
          </svg>

          {allItems.map((spot) => {
            const isCurrent = spot.id === activeItem.id;
            const isSameCity =
              spot.regionGroup === activeItem.regionGroup && !isCurrent;

            return (
              <button
                key={spot.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPin(spot.id);
                }}
                style={{
                  left: `${spot.coords.x}%`,
                  top: `${spot.coords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                title={`${spot.ref} — ${spot.marketLabel}`}
                className="absolute z-10 group cursor-pointer focus:outline-none"
              >
                <div
                  style={{ transform: `scale(${1 / zoom})` }}
                  className="relative flex flex-col items-center transition-all duration-300 ease-out"
                >
                  <span
                    className={`relative flex items-center justify-center rounded-none border transition-all ${
                      isCurrent
                        ? 'w-7 h-7 bg-[#C5A059] text-[#1A110B] border-[#F7F3EA] shadow-lg'
                        : isSameCity
                        ? 'w-6 h-6 bg-[#2C1E14] text-[#E6C78B] border-[#C5A059] shadow-md'
                        : 'w-5 h-5 bg-[#1A110B]/90 text-[#D6B77E] border-[#C5A059]/60 hover:border-[#E6C78B]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </span>

                  <span
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className={`mt-1 px-1.5 py-0.5 text-[9px] font-bold tracking-wider whitespace-nowrap border ${
                      isCurrent
                        ? 'bg-[#C5A059] text-[#1A110B] border-[#1A110B]'
                        : isSameCity
                        ? 'bg-[#1A110B] text-[#E6C78B] border-[#C5A059]/80'
                        : 'bg-[#1A110B]/85 text-[#F7F3EA]/80 border-[#C5A059]/35'
                    }`}
                  >
                    {spot.ref}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-2.5 end-2.5 z-20 flex flex-col gap-1">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label={labels.zoomInLabel}
            className="w-7 h-7 rounded-none bg-[#1A110B]/95 hover:bg-[#C5A059] text-[#E6C78B] hover:text-[#1A110B] border border-[#C5A059]/55 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label={labels.zoomOutLabel}
            className="w-7 h-7 rounded-none bg-[#1A110B]/95 hover:bg-[#C5A059] text-[#E6C78B] hover:text-[#1A110B] border border-[#C5A059]/55 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCenterOnActive}
            aria-label={labels.resetMapLabel}
            className="w-7 h-7 rounded-none bg-[#1A110B]/95 hover:bg-[#C5A059] text-[#E6C78B] hover:text-[#1A110B] border border-[#C5A059]/55 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
        </div>

        {regionPeers.length > 1 && (
          <div className="absolute top-2.5 start-2.5 z-20 flex items-center gap-1 bg-[#1A110B]/95 border border-[#C5A059]/65 p-1">
            {regionPeers.map((peer) => {
              const active = peer.id === activeItem.id;
              return (
                <button
                  key={peer.id}
                  type="button"
                  onClick={() => onSelectPin(peer.id)}
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className={`px-2 py-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#C5A059] text-[#1A110B]'
                      : 'text-[#E6C78B] hover:bg-[#241810]'
                  }`}
                >
                  {peer.ref}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative z-20 px-3 py-2 bg-[#1A110B]/95 border-t border-[#C5A059]/35 text-[11px] text-[#F7F3EA]/90 leading-snug">
        {activeItem.proximity}
      </div>
    </div>
  );
}