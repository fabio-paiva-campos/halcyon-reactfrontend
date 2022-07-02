import { useAppContext } from '../hooks/context'
import Login from './login'
import Palcos from './palcos'

function Layout() {
    const [logged, setLogged] = useAppContext()

    return (
        <>
            {logged ? (
                <Palcos/>
            ) : (
                <Login/>
            )}
        </>
    )
}

export default Layout