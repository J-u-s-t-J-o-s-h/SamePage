import { describe, expect, it } from 'vitest';
import {
  getCompatibilityChecks,
  statusLabel,
  summarizeCompatibility,
  type CheckStatus,
} from './compatibility';
import { SCENARIOS } from './scenarios';

const ALL_SCENARIOS = SCENARIOS.map((scenario) => scenario.id);

describe('simulated compatibility checks', () => {
  it('returns a result for every scenario', () => {
    for (const scenario of ALL_SCENARIOS) {
      expect(getCompatibilityChecks(scenario).length).toBeGreaterThan(0);
      expect(summarizeCompatibility(scenario).headline).not.toHaveLength(0);
    }
  });

  it('reports everything ready in the success scenario', () => {
    const checks = getCompatibilityChecks('success');
    expect(checks.every((check) => check.status === 'ready')).toBe(true);
    expect(summarizeCompatibility('success').canContinue).toBe(true);
  });

  it('changes visibly for every non-success scenario', () => {
    // The screen must not look identical between scenarios, otherwise the
    // reviewer cannot tell the simulation switcher is working.
    const success = JSON.stringify(getCompatibilityChecks('success'));
    for (const scenario of ALL_SCENARIOS.filter((id) => id !== 'success')) {
      expect(JSON.stringify(getCompatibilityChecks(scenario))).not.toEqual(success);
    }
  });

  it('flags storage in the warning scenario without blocking', () => {
    const storage = getCompatibilityChecks('warning').find((check) => check.id === 'storage');
    expect(storage?.status).toBe('attention');
    expect(summarizeCompatibility('warning').canContinue).toBe(true);
  });

  it('keeps going when offline, because SamePage runs on the home network', () => {
    const internet = getCompatibilityChecks('offline').find((check) => check.id === 'internet');
    expect(internet?.status).toBe('attention');
    expect(summarizeCompatibility('offline').canContinue).toBe(true);
  });

  it('blocks continuing when a required program is missing', () => {
    const programs = getCompatibilityChecks('missing-dependency').find(
      (check) => check.id === 'programs',
    );
    expect(programs?.status).toBe('not-ready');

    const summary = summarizeCompatibility('missing-dependency');
    expect(summary.canContinue).toBe(false);
    expect(summary.blockedReason).toBeDefined();
  });

  it('offers another connection when the port is taken', () => {
    const connection = getCompatibilityChecks('port-conflict').find(
      (check) => check.id === 'connection',
    );
    expect(connection?.status).toBe('attention');
    expect(summarizeCompatibility('port-conflict').canContinue).toBe(true);
  });

  it('reassures the household when an earlier setup did not finish', () => {
    expect(summarizeCompatibility('failed-install').body).toContain('safe');
  });

  it('gives every check a plain-language message and a hidden technical detail', () => {
    for (const scenario of ALL_SCENARIOS) {
      for (const check of getCompatibilityChecks(scenario)) {
        expect(check.message.length).toBeGreaterThan(0);
        expect(check.detail.length).toBeGreaterThan(0);
      }
    }
  });

  it('never depends on colour alone: every status has a symbol and a word', () => {
    const statuses: CheckStatus[] = ['ready', 'attention', 'not-ready'];
    for (const status of statuses) {
      const { symbol, word } = statusLabel(status);
      expect(symbol.length).toBeGreaterThan(0);
      expect(word.length).toBeGreaterThan(0);
    }
  });
});
