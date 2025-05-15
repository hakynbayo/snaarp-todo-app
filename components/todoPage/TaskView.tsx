import { Task } from '@/types/task';

export function TaskView({ task }: { task: Task }) {
    return (
        <div className="flex-1 space-y-2 p-3">

            {/* Date */}
            <div className="flex items-center gap-3 text-xs">
                <span>
                    <span className="font-normal">Created:</span>
                    <span className="font-light">
                        {new Date(task.createdAt).toLocaleDateString('en-GB')}
                    </span>
                </span>
            </div>

            {/* Title with completion status */}
            <div className="flex items-center gap-2">
                <h3 className={`font-medium transition-all duration-300 ${task.completed
                    ? 'line-through text-gray-400 opacity-80'
                    : 'text-gray-800'
                    }`}>
                    {task.title}
                </h3>
                <span
                    className={`text-xs px-2 py-1 rounded-full ${task.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800 animate-pulse'
                        }`}
                >
                    {task.completed ? 'Completed' : 'Active'}
                </span>
            </div>



            {/* Description (if exists) */}
            {task.description && (
                <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                    {task.description}
                </p>
            )}
        </div>
    );
}
