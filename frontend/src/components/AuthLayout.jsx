export default function AuthLayout({ children }){
    return (
        <div className="min-h-screen flex">
            {/* Panel Izquierdo*/}

            <div className="hidden lg:flex lg:w-1/2 bg-indigo-700 text-white flex-col justify-center items-center p-10">

                <h1 className="text-4xl font-bold mb-4">DevOps IDP Platform</h1>

                <p className="text-lg opacity-90 text-center">
                    Crea repositorios, pipelines y gestiona tu plataforma DevOps
                    desde un solo lugar.
                </p>

            </div>
            
            {/* Right panel */}
            <div className="flex w-full lg:w-1/2 justify-center items-center bg-gray-100">
                 {children}
            </div>

        </div>
    )
}