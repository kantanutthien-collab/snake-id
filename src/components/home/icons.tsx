interface IconProps {
  size?: number;
  color?: string;
}

export function SnakeIcon({ size = 28, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4 C 9 4, 4 7.5, 4 11.5 C 4 14, 6 15.5, 8.5 15.4 C 11 15.2, 13 14.8, 16 14.8 C 19 14.8, 21 15.2, 23.5 15.4 C 26 15.5, 28 14, 28 11.5 C 28 7.5, 23 4, 16 4 Z" />
      <path d="M12.4 15 L 12.8 19.5 L 13.6 15 Z" fill={color} />
      <path d="M19.6 15 L 19.2 19.5 L 18.4 15 Z" fill={color} />
      <path d="M7.5 7.5 L 12 9.5" />
      <path d="M24.5 7.5 L 20 9.5" />
      <ellipse cx="11" cy="11" rx="1.5" ry="1.15" />
      <ellipse cx="21" cy="11" rx="1.5" ry="1.15" />
      <path d="M16 15 L 16 22.5" />
      <path d="M16 22.5 L 14.3 25.8" />
      <path d="M16 22.5 L 17.7 25.8" />
    </svg>
  );
}

export function PinIcon({ size = 12, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
    >
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function GearIcon({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function PhoneIcon({ size = 14, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.3 1l-2.2 2.2z" />
    </svg>
  );
}

export function CameraIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
    >
      <path d="M3 8h3l2-2.5h8L18 8h3v11H3z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

export function HomeIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
    >
      <path d="M3 10l9-7 9 7v11h-6v-7H9v7H3z" />
    </svg>
  );
}

export function BookIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
    >
      <path d="M4 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4zM20 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z" />
    </svg>
  );
}

export function MapIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
    >
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14" />
    </svg>
  );
}

export function SnapIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" fill={color} />
    </svg>
  );
}

export function UploadIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v13" />
      <path d="M6 9l6-6 6 6" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function CloseIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SpinnerIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "sid-spin 0.9s linear infinite" }}
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function CameraSimpleIcon({
  size = 16,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h3l2-2.5h8L18 8h3v11H3z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

export function ChatIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z" />
    </svg>
  );
}

export function ListIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export function ChevronDownIcon({
  size = 12,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function UserIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
    </svg>
  );
}
