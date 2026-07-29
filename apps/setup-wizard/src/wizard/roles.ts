/**
 * How this computer will be used. These are the five choices from the
 * approved wizard design, written in household language.
 */
export type RoleId = 'home-server' | 'client' | 'development' | 'repair' | 'restore';

export interface Role {
  id: RoleId;
  label: string;
  description: string;
  /** Shown when the path is not built yet, so expectations stay honest. */
  availability: 'preview' | 'later';
}

export const ROLES: readonly Role[] = [
  {
    id: 'home-server',
    label: 'Keep SamePage on this computer for the whole household',
    description:
      'This computer stays on and holds your household’s information. Phones, tablets and other ' +
      'computers connect to it.',
    availability: 'later',
  },
  {
    id: 'client',
    label: 'Connect this computer to SamePage at home',
    description:
      'SamePage already lives on another computer at home. This one just connects to it. Nothing ' +
      'is installed.',
    availability: 'later',
  },
  {
    id: 'development',
    label: 'Set up this computer for building SamePage',
    description: 'For working on SamePage itself.',
    availability: 'later',
  },
  {
    id: 'repair',
    label: 'Fix or update SamePage on this computer',
    description: 'Check that everything still works, or move to a newer version.',
    availability: 'later',
  },
  {
    id: 'restore',
    label: 'Bring SamePage back from a safety copy',
    description: 'Put your household’s information back after a problem or on a new computer.',
    availability: 'later',
  },
];

export function findRole(id: RoleId): Role | undefined {
  return ROLES.find((role) => role.id === id);
}
