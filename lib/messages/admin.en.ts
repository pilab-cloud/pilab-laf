import type { BrandingEditorLabels, ColorFieldLabels, NetworkLabels, NotificationCenterLabels, TransferListLabels } from "../components/admin";

export const adminEn: {
  network: NetworkLabels;
  allowList: string;
  transfer: TransferListLabels;
  color: ColorFieldLabels;
  branding: BrandingEditorLabels;
  notifications: NotificationCenterLabels;
} = {
  network: {
    invalidIp: "Enter a valid IPv4 or IPv6 address",
    invalidCidr: "Enter a valid CIDR block, e.g. 10.0.0.0/8",
    invalidEntry: "Enter a valid IP address or CIDR block",
    duplicate: "Already in the list",
    add: "Add",
    remove: (e) => `Remove ${e}`,
    empty: "No entries",
  },
  allowList: "Allowed addresses",
  transfer: {
    available: "Available",
    selected: "Selected",
    search: (l) => `Search ${l.toLowerCase()}`,
    count: (c, t) => (c ? `${c} of ${t} selected` : `${t} items`),
    moveRight: "Add selected",
    moveLeft: "Remove selected",
    moveAllRight: "Add all",
    moveAllLeft: "Remove all",
    empty: "No items",
  },
  color: {
    label: "Brand colour",
    colorPicker: "Pick colour",
    invalidHex: "Enter a hex colour (3 or 6 digits)",
    onCard: "Against card background",
    onPrimary: "Button text on colour",
    pass: "AA pass",
    fail: "AA fail",
    rejected: "Colour does not meet the contrast requirements",
    contrast: "Contrast",
    preview: "Preview",
    sampleButton: "Button",
    sampleBadge: "Badge",
  },
  branding: {
    productName: "Product name",
    logo: "Logo",
    dropLogo: "Drop a logo here or click to browse",
    preview: "Login page preview",
    signIn: "Sign in",
    username: "Username",
    password: "Password",
    removeLogo: "Remove logo",
  },
  notifications: {
    bell: "Notifications",
    title: "Notifications",
    unreadCount: (n) => (n === 0 ? "No unread notifications" : `${n} unread notification${n === 1 ? "" : "s"}`),
    markRead: (t) => `Mark "${t}" as read`,
    markAllRead: "Mark all as read",
    viewAll: "View all",
    empty: "You're all caught up",
  },
};
