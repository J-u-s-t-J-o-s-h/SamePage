import { ROLES, type RoleId } from '../roles';
import { TechnicalDetails } from '../components/TechnicalDetails';

/**
 * Screen 2 — the five ways this computer can use SamePage.
 *
 * Every option is selectable so the reviewer can feel the choice, but each is
 * marked as a preview: choosing one does not start any real work.
 */
export function ChooseRoleScreen({
  selectedRole,
  onSelectRole,
}: {
  selectedRole: RoleId | undefined;
  onSelectRole: (role: RoleId) => void;
}) {
  return (
    <div className="screen">
      <p className="lead">What should this computer do?</p>
      <p>Pick the one that matches. You can change your mind later.</p>

      <div className="roles" role="radiogroup" aria-label="How this computer will use SamePage">
        {ROLES.map((role) => {
          const selected = selectedRole === role.id;
          return (
            <label key={role.id} className={`role ${selected ? 'role--on' : ''}`}>
              <input
                type="radio"
                name="role"
                value={role.id}
                checked={selected}
                onChange={() => onSelectRole(role.id)}
              />
              <span className="role__body">
                <span className="role__label">{role.label}</span>
                <span className="role__desc">{role.description}</span>
                <span className="badge badge--later">Preview only — not built yet</span>
              </span>
            </label>
          );
        })}
      </div>

      <div className="callout">
        <p>
          Choosing an option here does not start anything. In this preview, Continue simply moves to
          the next screen.
        </p>
      </div>

      <TechnicalDetails>
        Selection is held in memory only. Role ids: {ROLES.map((role) => role.id).join(', ')}. The
        real paths (dev bootstrap, home server, repair, restore) arrive in later increments.
      </TechnicalDetails>
    </div>
  );
}
