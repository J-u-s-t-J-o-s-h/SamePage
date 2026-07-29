import { describe, expect, it } from 'vitest';
import {
  BUILT_STEPS,
  FIRST_STEP_ID,
  STEPS,
  findStep,
  nextBuiltStep,
  previousBuiltStep,
  stepNumber,
} from './steps';

describe('wizard step model', () => {
  it('lists all 24 screens of the approved flow', () => {
    expect(STEPS).toHaveLength(24);
  });

  it('uses unique screen ids', () => {
    const ids = new Set(STEPS.map((step) => step.id));
    expect(ids.size).toBe(STEPS.length);
  });

  it('builds exactly the three screens in this increment', () => {
    expect(BUILT_STEPS.map((step) => step.id)).toEqual(['welcome', 'choose-role', 'compatibility']);
  });

  it('starts on the welcome screen', () => {
    expect(findStep(FIRST_STEP_ID)?.title).toBe('Welcome');
    expect(stepNumber(FIRST_STEP_ID)).toBe(1);
  });

  it('walks forward only through screens that exist', () => {
    expect(nextBuiltStep('welcome')?.id).toBe('choose-role');
    expect(nextBuiltStep('choose-role')?.id).toBe('compatibility');
    // Nothing after the last built screen: Continue must not lead to a blank page.
    expect(nextBuiltStep('compatibility')).toBeUndefined();
  });

  it('walks backward only through screens that exist', () => {
    expect(previousBuiltStep('compatibility')?.id).toBe('choose-role');
    expect(previousBuiltStep('choose-role')?.id).toBe('welcome');
    expect(previousBuiltStep('welcome')).toBeUndefined();
  });

  it('reports honest step positions within the full flow', () => {
    expect(stepNumber('compatibility')).toBe(3);
    expect(stepNumber('unknown-screen')).toBe(0);
  });

  it('keeps maintenance screens out of the main setup path', () => {
    const maintenance = STEPS.filter((step) => step.group === 'maintenance').map((step) => step.id);
    expect(maintenance).toEqual(['status', 'repair', 'update', 'restore', 'uninstall']);
  });
});
