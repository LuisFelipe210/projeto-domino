import { WebSocket } from 'ws';

export interface AuthenticatedWebSocket extends WebSocket {
  user: {
    userId: string;
    username: string;
    iat: number;
    exp: number;
  };
}

export interface Domino {
  value1: number;
  value2: number;
}

export interface PlacedDomino {
    piece: Domino;
    x: number;
    y: number;
    rotation: 0 | 90 | 180 | 270;
    isSpinner?: boolean;
}

export interface BoardEnd {
    id: string;
    value: number;
    x: number;
    y: number;
    attachDirection: 0 | 90 | 180 | 270;
}

export interface Player {
  id: string;
  username: string;
  disconnectedSince?: number;
}

export interface GameState {
  board: PlacedDomino[];
  activeEnds: BoardEnd[];
  hands: Record<string, Domino[]>;
  turn: string;
  players: Player[];
  consecutivePasses: number;
  disconnectTimers: Record<string, NodeJS.Timeout>;
  occupiedCells: Record<string, boolean>;
}

type EventPayload = {
    type: string;
    [key: string]: any;
};

export type GameEvent = {
    target: 'player' | 'broadcast';
    payload: EventPayload;
};

export interface GameLogicResult {
  newState?: GameState;
  events?: GameEvent[];
  error?: string;
  terminal?: { winner: Player | null, reason: string };
}

export interface DecodedToken {
  userId: string;
  username: string;
  iat: number;
  exp: number;
}

// --- Tipos para Mensagens do WebSocket ---

interface BaseMessage {
  type: string;
}

export interface PlayPieceMessage extends BaseMessage {
  type: 'PLAY_PIECE';
  piece: Domino;
  endId?: string;
}

export interface PassTurnMessage extends BaseMessage {
  type: 'PASS_TURN';
}

export interface LeaveGameMessage extends BaseMessage {
  type: 'LEAVE_GAME';
}

// Um tipo de união que representa qualquer mensagem de jogo válida que o servidor pode receber.
export type GameMessage = PlayPieceMessage | PassTurnMessage | LeaveGameMessage;