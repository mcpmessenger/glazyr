export const GLAZYR_API_KEY_HEADER = "x-glazyr-api-key" as const

export const GLAZYR_API_ROUTES = {
  controlPlaneConfig: "/api/control-plane/config",
  tasks: "/api/tasks",
  runtimeMcpManifest: "/api/runtime/mcp/manifest",
  runtimeMcpInvoke: "/api/runtime/mcp/invoke",
  runtimeTasks: "/api/runtime/tasks",
  extensionStatus: "/api/extension/status",
  killSwitch: "/api/killswitch",
  authMe: "/api/auth/me",
  authLogin: "/api/auth/login",
  authGuest: "/api/auth/guest",
  authLogout: "/api/auth/logout",
} as const
