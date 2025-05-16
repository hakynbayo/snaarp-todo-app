import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

interface ConfirmDeleteProps {
    onConfirm: () => void;
    trigger: React.ReactNode;
}

export function ConfirmDelete({ onConfirm, trigger }: ConfirmDeleteProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="w-84">
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this task? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={(e) => {
                            onConfirm();
                            e.stopPropagation();
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
