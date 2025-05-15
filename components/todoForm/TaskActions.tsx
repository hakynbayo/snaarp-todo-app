import { Button } from '@/components/ui/button';
import { Trash2, Pencil, Save, X } from 'lucide-react';
import { ConfirmDelete } from './ConfirmDelete';

export function TaskActions({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex space-x-2 ml-4">
      {isEditing ? (
        <>
          <Button variant="ghost" size="sm" onClick={onSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>

          <ConfirmDelete
            onConfirm={onDelete}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </>
      )}
    </div>
  );
}
