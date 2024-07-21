import { Link } from "react-router-dom"

export function Home() {
    return(
        <>
            <main className="d-flex justify-content-center align-items-center" style={{height : "100vh"}}>
                <Link to='/login' className="btn btn-warning me-2">User Login</Link>
                <Link to='/register' className="btn btn-primary">New User Register</Link>
            </main>
        </>
    )
}