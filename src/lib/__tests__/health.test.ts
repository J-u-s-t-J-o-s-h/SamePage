import { describe, expect, it } from "vitest";
import { buildHealthCheck } from "@/lib/health";
import { FakeTextModelProvider } from "@/lib/ai/provider";

describe("buildHealthCheck", () => {
  it("returns an ok SamePage health payload", () => {
    const result = buildHealthCheck({
      version: "0.1.0",
      now: new Date("2026-07-27T12:00:00.000Z"),
    });

    expect(result).toEqual({
      status: "ok",
      service: "samepage",
      version: "0.1.0",
      timestamp: "2026-07-27T12:00:00.000Z",
      checks: { app: "ok" },
      notes: [
        "SamePage application shell is running.",
        "Household data services are not enabled in Phase 0.",
      ],
    });
  });
});

describe("FakeTextModelProvider", () => {
  it("returns a structured deterministic result", async () => {
    const provider = new FakeTextModelProvider();
    const result = await provider.complete({
      prompt: "hello",
      operationVersion: "phase0-test",
    });

    expect(result.provider).toBe("fake");
    expect(result.status).toBe("succeeded");
    expect(result.data).toBe("echo:hello");
    expect(result.operationVersion).toBe("phase0-test");
  });
});
