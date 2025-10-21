// // Here Is The Code
// export const Sidebar = () => {
//     return <div>
                
//         <button className="items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//             Open sidebar
//         </button>

//         <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0">
//             <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//                 <ul className="space-y-2 font-medium">
//                     <li>
//                         <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                         <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
//                             <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
//                             <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
//                         </svg>
//                         <span className="ms-3">Dashboard</span>
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </div>

//         <div className="p-4 md:ml-64">
//             <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//                 hi there
//             </div>
//         </div>

//     </div>
// }


import { useCallback, useEffect, useMemo, useState } from 'react'

const DashboardIcon = ({ className = 'w-5 h-5 text-gray-500' }) => (
    <svg className={className + ' transition duration-75 dark:text-gray-400'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
    </svg>
)

export const Sidebar = () => {
    const [open, setOpen] = useState(false)

    // memoize toggle handlers
    const toggle = useCallback(() => setOpen(v => !v), [])
    const close = useCallback(() => setOpen(false), [])

    // Close on ESC for accessibility
    useEffect(() => {
        function onKey(e){ if(e.key === 'Escape') close() }
        if(open) window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, close])

    // Memoize the nav items to avoid recreating on each render
    const nav = useMemo(() => (
        <ul className="space-y-2 font-medium">
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <DashboardIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ml-3">Dashboard</span>
                </a>
            </li>
        </ul>
    ), [])

    return (
        <div>
            {/* mobile toggle */}
            <button aria-expanded={open} aria-controls="sidebar" onClick={toggle} className="items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                {open ? 'Close sidebar' : 'Open sidebar'}
            </button>

            {/* overlay for mobile when open */}
            {open && <div onClick={close} className="fixed inset-0 z-30 bg-black/40 md:hidden" aria-hidden="true" />}

            {/* sidebar */}
            <aside id="sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    {nav}
                </div>
            </aside>

            {/* main content with offset for sidebar on md+ */}
            <div className="p-4 md:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    hi there
                </div>
            </div>
        </div>
    )
}