import { useAppContext } from '../hooks/context'
import Login from './login'
import Palcos from './palcos'
import PalcosUser from './palcosUser'

function Layout() {
    const [logged, setLogged] = useAppContext()
    const [adminAccess, setAdminAccess] = useAppContext()

    return (
        <>
            {logged ? (
                <>
                    {adminAccess ? (
                        <Palcos/>
                    ) : (
                        <PalcosUser/>
                    )}
                </>
            ) : (
                <Login/>
            )}
        </>
    )
}

export default Layout