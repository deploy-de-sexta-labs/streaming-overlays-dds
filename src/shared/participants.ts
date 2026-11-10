import type { TweakConfig } from "@/shared/types";

export interface CameraParticipant {
  name: string;
  role: string;
  handle: string;
}

export function getCameraParticipants(config: TweakConfig): CameraParticipant[] {
  const host = {
    name: config.guest2Name,
    role: config.guest2Role,
    handle: config.guest2Handle,
  };
  const cohost = {
    name: config.cohostName,
    role: config.cohostRole,
    handle: config.cohostHandle,
  };
  const guest = {
    name: config.guest1Name,
    role: config.guest1Role,
    handle: config.guest1Handle,
  };

  switch (config.participantLayout) {
    case "host-cohost":
      return [host, cohost];
    case "host-guest":
      return [host, guest];
    case "host-cohost-guest":
      return [host, cohost, guest];
  }
}
