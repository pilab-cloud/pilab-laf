import * as React from 'react';
import { C as ConsoleStatus, a as ConsoleFrameProps } from './vsphere-objects-CWkhU0R6.js';
import './chart-motion-BTO5GOqJ.js';

type TerminalState = "connecting" | "open" | "closed" | "error";
/** Byte/text pipe used instead of a WebSocket (tests, demos, custom protocols). */
interface TerminalTransport {
    /** Subscribe to output from the remote side; returns an unsubscribe function. */
    onData(cb: (data: string | Uint8Array) => void): () => void;
    /** Send keystrokes to the remote side. */
    write(data: string): void;
    /** Optional lifecycle hook; call `cb("closed")` / `cb("error")` when the remote goes away. */
    onState?(cb: (state: TerminalState) => void): () => void;
    close?(): void;
}
interface TerminalProps {
    /** WebSocket URL (ignored when `transport` is given). */
    url?: string;
    transport?: TerminalTransport;
    onClose?: (event?: {
        code?: number;
        reason?: string;
    }) => void;
    onStateChange?: (state: TerminalState) => void;
    fontSize?: number;
    className?: string;
    /** Height of the terminal viewport; defaults to 20rem. */
    height?: string;
}
declare function Terminal({ url, transport, onClose, onStateChange, fontSize, className, height }: TerminalProps): React.JSX.Element;

/** The subset of the noVNC `RFB` instance this wrapper drives. */
interface RfbInstance {
    viewOnly: boolean;
    scaleViewport: boolean;
    clipViewport: boolean;
    addEventListener(type: string, cb: (e: CustomEvent) => void): void;
    removeEventListener?(type: string, cb: (e: CustomEvent) => void): void;
    disconnect(): void;
    sendCtrlAltDel(): void;
    sendKey?(keysym: number, code: string | null, down?: boolean): void;
    sendCredentials?(c: {
        username?: string;
        password?: string;
    }): void;
    clipboardPasteFrom?(text: string): void;
    toBlob?(cb: (b: Blob | null) => void, type?: string): void;
}
type RfbConstructor = new (target: HTMLElement, urlOrChannel: string | WebSocket, options?: Record<string, unknown>) => RfbInstance;
type RfbLoader = () => Promise<{
    default: RfbConstructor;
}>;
interface VncConsoleProps {
    url?: string;
    password?: string;
    username?: string;
    viewOnly?: boolean;
    scaleViewport?: boolean;
    clipViewport?: boolean;
    onStatusChange?: (status: ConsoleStatus) => void;
    /** Replace the lazy `@novnc/novnc` import (custom builds, tests, demos). */
    loadRfb?: RfbLoader;
    /** Forwarded to the surrounding ConsoleFrame (e.g. `keyCombos`, `labels`). */
    frameProps?: Pick<ConsoleFrameProps, "keyCombos" | "labels">;
    className?: string;
}
declare function VncConsole({ url, password, username, viewOnly: viewOnlyProp, scaleViewport, clipViewport, onStatusChange, loadRfb, frameProps, className }: VncConsoleProps): React.JSX.Element;

export { type RfbConstructor, type RfbInstance, type RfbLoader, Terminal, type TerminalProps, type TerminalState, type TerminalTransport, VncConsole, type VncConsoleProps };
