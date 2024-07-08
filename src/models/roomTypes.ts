export enum Roles {
  Student,
  Mentor,
}

export enum SocketEvents {
  CONNECTION = "connection",
  NEW_USER = "new user",
  JOIN_ROOM = "join room",
  LEFT_ROOM = "left room",
  REDIRECT = "redirect",
  DISCONNECT = "disconnect",
  MODIFY_CODE = "modify code",
}
