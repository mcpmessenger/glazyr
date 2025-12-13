# Glazyr Front-End (FE) Team: Google Vision Integration Strategy

**Project Manager:** Manus AI
**Date:** December 13, 2025
**Goal:** Replace or augment the existing vision processing logic (currently using an internal MCP) with the **Google Cloud Vision API** to create a functional, vision-first AI assistant.

---

## 1. Google Cloud Setup and Authentication

The integration must be handled server-side within the Next.js application to secure the API key and manage processing logic.

| Step | Action | Details |
| :--- | :--- | :--- |
| **1.1** | **Project Setup** | Create a new Google Cloud Project or use the existing one for Glazyr. Enable the **Cloud Vision API** and **Cloud Natural Language API** (for post-OCR analysis). |
| **1.2** | **Service Account** | Create a dedicated Service Account for the Glazyr backend. Download the JSON key file. |
| **1.3** | **Environment Variables** | Securely store the service account credentials. The recommended approach for Next.js is to use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable, pointing to the path of the JSON key file on the server, or to store the key content directly as a string. |
| **1.4** | **Install SDK** | Install the official Google Cloud Vision client library for Node.js. |

```bash
# In the glazyr directory
npm install @google-cloud/vision
```

## 2. Refactoring the Vision Logic (`/lib/vision`)

The existing structure in `glazyr/lib/vision` is ideal for abstraction. We will create a new service layer to encapsulate Google Vision calls.

### 2.1. Create `google-vision-service.ts`

Create a new file at `glazyr/lib/vision/google-vision-service.ts` to house all API interactions.

**Key Functions to Implement:**

| Function | Google Vision Feature | Purpose |
| :--- | :--- | :--- |
| `analyzeImage(imageBuffer: Buffer, features: VisionFeature[])` | General `annotateImage` | The core function to handle all vision requests (OCR, labels, etc.) based on the requested features. |
| `performOcr(imageBuffer: Buffer)` | `TEXT_DETECTION` | Extracts all text from the image, which is crucial for the "whats on this page" query. |
| `detectLabels(imageBuffer: Buffer)` | `LABEL_DETECTION` | Identifies general objects, places, and activities in the image. |
| `detectWebEntities(imageBuffer: Buffer)` | `WEB_DETECTION` | Finds visually similar images and related web entities, useful for context. |

### 2.2. Update `vision-orchestrator.ts`

The `glazyr/lib/vision/vision-orchestrator.ts` file should be updated to use the new `google-vision-service.ts` instead of the old MCP-based modules (`ocr-mcp.ts`, `vlm-mcp.ts`, etc.).

**Implementation Detail:**

1.  The orchestrator receives the image data (likely a base64 string from the extension).
2.  It converts the base64 string back into a `Buffer`.
3.  It determines the required vision features based on the user's query (e.g., "Give me a summary" requires OCR and potentially VLM/labeling).
4.  It calls the new `google-vision-service.ts` with the image buffer and the feature list.
5.  It processes the raw Google Vision response into a standardized format for the rest of the Glazyr application (e.g., a combined text and label summary).

## 3. API Route and Data Flow

The primary API route for task execution is likely `glazyr/app/api/tasks/route.ts`.

1.  **Input:** The route receives a request from the extension, which includes the user's query and the image data (screenshot) as a base64 string.
2.  **Processing:** The route should call the `vision-orchestrator` (which now uses Google Vision) to get the analysis results.
3.  **Response Generation:** The analysis results (text, labels, etc.) are then passed to the LLM (which is currently not specified but implied by the "AI assistant" nature) to generate the final, natural language response for the user.

**Action Item for FE Team:**

*   **Review and Refactor:** Thoroughly review the existing `glazyr/lib/vision` and `glazyr/app/api/tasks/route.ts` to ensure a seamless transition from the old MCP logic to the new Google Vision service.
*   **Error Handling:** Implement robust error handling for Google Vision API calls, including rate limit and authentication errors.
*   **Cost Optimization:** Implement logic to only request the necessary vision features (e.g., don't run `LABEL_DETECTION` if the query is purely about text).

This integration will provide the robust, real-time vision capabilities required for the Glazyr application.
