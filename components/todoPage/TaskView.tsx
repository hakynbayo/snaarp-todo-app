import { Task } from '@/types/task';

export function TaskView({ task }: { task: Task }) {
    return (
        <div className="flex-1 space-y-2 p-3 relative">

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
                <h3 className={`font-medium transition-all duration-300 text-xs sm:text-sm ${task.completed
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
                <div className="group relative">
                    {/* Main truncated view */}
                    <p className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded w-40 sm:w-48 truncate peer cursor-default">
                        {task.description}
                    </p>

                    {/* Full description tooltip */}
                    <div className="absolute top-full right-1 hidden group-hover:block peer-active:block md:group-hover:block z-10 min-w-[150px] max-w-full p-2 mt-1 text-xs text-gray-600 bg-white border border-gray-200 rounded shadow-lg break-words whitespace-pre-wrap overflow-hidden">
                        <h3 className="font-bold text-xs mb-1">Description</h3>
                        <div className="max-h-[200px] overflow-y-auto">
                            {task.description}
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
}
