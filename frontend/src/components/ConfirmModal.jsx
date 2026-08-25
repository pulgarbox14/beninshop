import { IconAlert } from './Icons';

/** Fenetre de confirmation avant une suppression */
const ConfirmModal = ({ title, message, confirmLabel = 'Supprimer', onConfirm, onCancel }) => (
  <div className="modal-backdrop" role="dialog" aria-modal="true">
    <div className="modal">
      <span className="modal-icon">
        <IconAlert />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Annuler
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
