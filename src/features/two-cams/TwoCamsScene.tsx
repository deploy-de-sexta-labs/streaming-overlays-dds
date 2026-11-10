import { Stage } from "@/features/stage/Stage";
import { Overlay } from "@/features/overlay/Overlay";
import { CameraFrame } from "@/shared/components/CameraFrame";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { useSpotifyNowPlaying } from "@/hooks/useSpotifyNowPlaying";
import { SpotifyNowPlayingCard } from "@/shared/components/SpotifyNowPlayingCard";
import { getCameraParticipants } from "@/shared/participants";
import PartnersPanel from "@/shared/partners/PartnersPanel";

export function TwoCamsScene() {
  const t = useOverlayConfig();
  const { nowPlaying, configured, isLoading } = useSpotifyNowPlaying();
  const camAreaLeft = 30;
  const camAreaTop = 80;
  const camAreaRight = t.showChat ? 480 : 30;
  const camWidth = 1920 - camAreaLeft - camAreaRight;
  const participants = getCameraParticipants(t);
  const gap = 24;
  const hasThreeParticipants = participants.length === 3;
  const camW = (camWidth - gap * (participants.length - 1)) / participants.length;
  const camH = camW * 9 / 16;
  const topCameraWidth = Math.min(600, (camWidth - gap) / 2);
  const guestCameraWidth = t.showPartnersPanel
    ? t.showChat ? 620 : 760
    : 900;
  const guestCameraHeight = guestCameraWidth * 9 / 16;
  const guestCameraX = camAreaLeft + (camWidth - guestCameraWidth) / 2;
  const partnersWidth = t.showChat ? 320 : 450;

  return (
    <Stage>
      <Overlay showPartnersPanel={false}>
        {participants.map((participant, index) => {
          const isGuest = hasThreeParticipants && index === 2;
          const width = hasThreeParticipants
            ? isGuest ? guestCameraWidth : topCameraWidth
            : camW;
          const height = hasThreeParticipants
            ? isGuest ? guestCameraHeight : topCameraWidth * 9 / 16
            : camH;
          const x = hasThreeParticipants
            ? isGuest
              ? guestCameraX
              : camAreaLeft + (camWidth - (topCameraWidth * 2 + gap)) / 2 + index * (topCameraWidth + gap)
            : camAreaLeft + index * (camW + gap);
          const y = hasThreeParticipants
            ? isGuest ? (t.showChat ? 570 : 520) : camAreaTop
            : camAreaTop;

          return (
            <CameraFrame
              key={index}
              x={x}
              y={y}
              w={width}
              h={height}
              name={participant.name}
              role={participant.role}
              handle={participant.handle}
              side={index === 1 ? "right" : "left"}
              primary={t.primary}
              accent={t.accent}
              showPlaceholder={t.showCameraPlaceholders}
            />
          );
        })}

        {t.showPartnersPanel && (
          <PartnersPanel
            config={t}
            width={hasThreeParticipants ? partnersWidth : 560}
            height={hasThreeParticipants ? 250 : 230}
            logoWidth={hasThreeParticipants ? partnersWidth * 0.65 : 300}
            logoHeight={hasThreeParticipants ? 130 : 100}
            topOffset={hasThreeParticipants ? (t.showChat ? 600 : 620) : 710}
            rightOffset={hasThreeParticipants && t.showChat ? 510 : 30}
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
