'use client';

import { List, Circle, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskFilter as FilterType } from '@/types/task';

interface TaskFilterProps {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
}

export function TaskFilter({ filter, setFilter }: TaskFilterProps) {
    return (
        <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px] h-8 gap-2">
                <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">
                    <div className="flex items-center gap-2">
                        <List className="h-4 w-4 text-muted-foreground" />
                        <span>All Tasks</span>
                    </div>
                </SelectItem>
                <SelectItem value="active">
                    <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4 text-red-500" />
                        <span>Active</span>
                    </div>
                </SelectItem>
                <SelectItem value="completed">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
