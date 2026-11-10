import { Stage } from "@/features/stage/Stage";
import { Overlay } from "@/features/overlay/Overlay";
import { ScreenShare } from "./ScreenShare";
import { MiniCamera } from "@/shared/components/MiniCamera";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { useSpotifyNowPlaying } from "@/hooks/useSpotifyNowPlaying";
import { SpotifyNowPlayingCard } from "@/shared/components/SpotifyNowPlayingCard";
import { getCameraParticipants } from "@/shared/participants";
import PartnersPanel from "@/shared/partners/PartnersPanel";

export function ScreenShareScene() {
  const t = useOverlayConfig();
  const { nowPlaying, configured, isLoading } = useSpotifyNowPlaying();
  const camAreaLeft = 30;
  const camAreaTop = 130;
  const camAreaRight = t.showChat ? 480 : 30;
  const camWidth = 1920 - camAreaLeft - camAreaRight;
  const camAreaH = 1080 - camAreaTop - 196;
  const participants = getCameraParticipants(t);

  return (
    <Stage>
      <Overlay showPartnersPanel={false}>
        <ScreenShare config={t} x={camAreaLeft} y={camAreaTop} w={camWidth - 300} h={camAreaH} />
        <div style={{ position: "absolute", display: "flex", flexDirection: "column", gap: 24, left: camAreaLeft + camWidth - 280, top: camAreaTop }}>
          {participants.map((participant, index) => (
            <MiniCamera
              key={index}
              name={participant.name}
              role={participant.role}
              side={index === 0 ? "left" : "right"}
              primary={t.primary}
              accent={t.accent}
              showPlaceholder={t.showCameraPlaceholders}
            />
          ))}
        </div>

        {t.showPartnersPanel && (
          <PartnersPanel
            config={t}
            width={280}
            height={200}
            logoWidth={220}
            logoHeight={100}
            rightOffset={camAreaRight}
            bottomOffset={50}
          />
        )}

        {t.showChat && t.showSpotifyNowPlaying && (
          <div
            style={{
              position: "absolute",
              right: 30,
              top: 804,
              width: 420,
              zIndex: 2,
            }}
          >
            <SpotifyNowPlayingCard
              nowPlaying={nowPlaying}
              configured={configured}
              isLoading={isLoading}
              primary={t.primary}
              accent={t.accent}
              bgPanel={t.bgPanel}
            />
          </div>
        )}
      </Overlay>
    </Stage>
  );
}
