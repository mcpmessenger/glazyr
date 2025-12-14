import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Glazyr Extension Privacy Policy",
  description: "Privacy policy for the Glazyr Chrome Extension and Control Plane.",
}

export default function PrivacyPolicyPage() {
  const effectiveDate = "December 13, 2025"

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">Last updated:</span> {effectiveDate}
            </p>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Overview</h2>
              <p>
                Glazyr Chrome Extension (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the extension&rdquo;) is a vision-first AI assistant for web browsing. This privacy policy explains how we handle data when you use the extension.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Data Collection and Usage</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Local Storage</h3>
                  <p className="mb-2">
                    The extension stores the following data <span className="text-foreground font-medium">locally on your device</span> using Chrome&rsquo;s <code className="px-1 py-0.5 rounded bg-background/30">chrome.storage.local</code> API:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="text-foreground font-medium">Runtime configuration</span>: MCP runtime URL and API keys (if configured)</li>
                    <li><span className="text-foreground font-medium">Device ID</span>: A randomly generated unique identifier for your installation</li>
                    <li><span className="text-foreground font-medium">Page context buffer</span>: Recent page URLs, titles, and text excerpts (last 5 pages, stored locally)</li>
                    <li><span className="text-foreground font-medium">Last capture</span>: Screenshot data and OCR/vision analysis results (stored locally)</li>
                    <li><span className="text-foreground font-medium">Widget state</span>: Widget position and size preferences</li>
                    <li><span className="text-foreground font-medium">Safety policy</span>: Agent mode settings, kill switch state, allowed domains (from control plane)</li>
                  </ul>
                  <p className="mt-2">
                    <span className="text-foreground font-medium">This data never leaves your device</span> unless you explicitly interact with external runtimes.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Data Sent to External Services</h3>
                  <p className="mb-2">When you use natural language queries or explicitly invoke the MCP runtime:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <span className="text-foreground font-medium">LangChain MCP Runtime</span> (if configured):
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li><span className="text-foreground font-medium">What we send</span>: Page context (URL, title, text excerpt), OCR/vision-derived text, your query</li>
                        <li><span className="text-foreground font-medium">What we don&rsquo;t send</span>: Raw screenshots, full page content, personal data</li>
                        <li><span className="text-foreground font-medium">Purpose</span>: AI agent orchestration and query processing</li>
                        <li><span className="text-foreground font-medium">Data retention</span>: Governed by the MCP runtime&rsquo;s privacy policy</li>
                      </ul>
                    </li>
                    <li>
                      <span className="text-foreground font-medium">Vision Runtime (AWS)</span> (for OCR/vision analysis):
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li><span className="text-foreground font-medium">What we send</span>: Screenshot images (only when you explicitly capture)</li>
                        <li><span className="text-foreground font-medium">Purpose</span>: OCR text extraction and image analysis</li>
                        <li><span className="text-foreground font-medium">Data retention</span>: Governed by the Vision runtime&rsquo;s privacy policy</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Page Context Capture</h3>
                  <p>
                    The extension captures page context (URL, title, visible text) from pages you visit to provide AI assistance. This data is:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Stored <span className="text-foreground font-medium">locally</span> in a buffer (last 5 pages)</li>
                    <li>Only sent to external runtimes when you explicitly ask a question</li>
                    <li>Never sent automatically or in the background</li>
                    <li>Cleared when you reload the extension or clear browser data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Screenshots</h3>
                  <p className="mb-1">Screenshots are only captured when you:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Click &ldquo;Framed shot&rdquo; and select a region</li>
                    <li>Click &ldquo;Full page&rdquo; for a full-page capture</li>
                    <li>Drag and drop an image onto the page</li>
                  </ul>
                  <p className="mb-1">Screenshots are:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Processed locally or sent to the Vision runtime for OCR/analysis</li>
                    <li>Stored locally in <code className="px-1 py-0.5 rounded bg-background/30">chrome.storage.local</code></li>
                    <li>Not sent to any service unless you explicitly capture them</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Permissions</h2>
              <p className="mb-1">The extension requests the following permissions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className="px-1 py-0.5 rounded bg-background/30">&lt;all_urls&gt;</code>: To inject content scripts and capture page context on pages you visit</li>
                <li><code className="px-1 py-0.5 rounded bg-background/30">activeTab</code>, <code className="px-1 py-0.5 rounded bg-background/30">scripting</code>: To interact with the current page when you invoke actions</li>
                <li><code className="px-1 py-0.5 rounded bg-background/30">storage</code>: To persist settings and state locally</li>
                <li><code className="px-1 py-0.5 rounded bg-background/30">tabs</code>, <code className="px-1 py-0.5 rounded bg-background/30">webNavigation</code>: To read basic tab/navigation context</li>
                <li><code className="px-1 py-0.5 rounded bg-background/30">offscreen</code>: For audio transcription features (if used)</li>
              </ul>
              <p className="mt-2">
                These permissions are used <span className="text-foreground font-medium">only</span> for the extension&rsquo;s functionality and are not used to track you across websites.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Third-Party Services</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">LangChain Agents MCP Server</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="text-foreground font-medium">Service</span>: LangChain agents MCP runtime (default: <code className="px-1 py-0.5 rounded bg-background/30">https://langchain-agent-mcp-server-554655392699.us-central1.run.app</code>)</li>
                    <li><span className="text-foreground font-medium">Data shared</span>: Page context, queries, derived text</li>
                    <li><span className="text-foreground font-medium">Purpose</span>: AI agent orchestration</li>
                    <li><span className="text-foreground font-medium">Privacy</span>: Governed by the MCP runtime provider&rsquo;s privacy policy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Vision Runtime (AWS)</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="text-foreground font-medium">Service</span>: AWS Lambda-based vision/OCR service</li>
                    <li><span className="text-foreground font-medium">Data shared</span>: Screenshot images (only when explicitly captured)</li>
                    <li><span className="text-foreground font-medium">Purpose</span>: OCR text extraction and image analysis</li>
                    <li><span className="text-foreground font-medium">Privacy</span>: Governed by the Vision runtime provider&rsquo;s privacy policy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Data Security</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All data is stored locally using Chrome&rsquo;s secure storage APIs</li>
                <li>API keys and sensitive configuration are stored in <code className="px-1 py-0.5 rounded bg-background/30">chrome.storage.local</code> (encrypted by Chrome)</li>
                <li>Communication with external runtimes uses HTTPS</li>
                <li>No data is transmitted without your explicit action (asking a question or capturing a screenshot)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Your Rights</h2>
              <p className="mb-1">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="text-foreground font-medium">Inspect stored data</span>: Use Chrome DevTools → Application → Storage → Local Storage to view extension data</li>
                <li><span className="text-foreground font-medium">Clear data</span>: Uninstall the extension or clear browser data to remove all stored information</li>
                <li><span className="text-foreground font-medium">Configure runtimes</span>: Set your own MCP runtime URL or disable external services</li>
                <li><span className="text-foreground font-medium">Control captures</span>: Only capture screenshots when you explicitly choose to</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Children&rsquo;s Privacy</h2>
              <p>
                This extension is not intended for users under the age of 13. We do not knowingly collect data from children.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. The &ldquo;Last updated&rdquo; date at the top indicates when changes were made.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <p>
                For privacy-related questions, contact us at: <span className="text-foreground font-medium">greetings@automationalien.com</span>
              </p>
              <p>
                You can also reach out via GitHub issues or your preferred channel.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Compliance</h2>
              <p>This extension complies with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chrome Web Store Developer Program Policies</li>
                <li>General data protection principles (local-first, explicit consent, minimal data collection)</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/privacy-security">Privacy & security (control plane)</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/install-extension">Install extension</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
