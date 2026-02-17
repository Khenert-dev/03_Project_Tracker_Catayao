import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

function getCurrentUrl() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

export default function RouteTransition({ children }) {
    const [routeKey, setRouteKey] = useState(() => getCurrentUrl())

    useEffect(() => {
        const syncRouteKey = () => setRouteKey(getCurrentUrl())

        document.addEventListener('inertia:navigate', syncRouteKey)
        window.addEventListener('popstate', syncRouteKey)

        return () => {
            document.removeEventListener('inertia:navigate', syncRouteKey)
            window.removeEventListener('popstate', syncRouteKey)
        }
    }, [])

    return (
        <Box key={routeKey} className="route-enter">
            {children}
        </Box>
    )
}
