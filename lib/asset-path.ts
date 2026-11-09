/**
 * Utility to generate correct asset paths for both local development and GitHub Pages deployment.
 * Uses NEXT_PUBLIC_BASE_PATH environment variable which is set at build time.
 * Next.js inlines process.env.NEXT_PUBLIC_* variables at build time for client-side code.
 */

export function getAssetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  // Next.js inlines NEXT_PUBLIC_* env vars at build time
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  return `${basePath}${normalizedPath}`
}

/**
 * Get texture path for planet textures
 */
export function getTexturePath(textureName: string): string {
  return getAssetPath(`/textures/${textureName}`)
}
