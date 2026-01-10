import { Outlet, useLocation } from 'react-router-dom';

export const AuthLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('admin');
  const image = isAdmin ? '/admin-auth.png' : '/header-img.png';

  return (
    <div className="h-full bg-white text-slate-100 font-sans text-[0.9rem]">
      <header className="w-full border-b border-slate-800">
        <nav className="w-full px-8 py-3 flex items-center justify-between bg-black">
          <div className="text-white tracking-widest font-extrabold text-lg">
            NOMAD
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-6 md:py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          <figure className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
            <img
              src={image}
              alt="Dark-themed ride-hailing app screens with teal accents"
              className="h-full w-full object-cover"
            />
          </figure>

          <section className="rounded-b-lg md:rounded-r-lg md:rounded-bl-none border border-slate-800 border-t-0 md:border-t md:border-l-0 bg-white backdrop-blur p-5 md:p-6 lg:p-8 flex">
            <div className="w-full max-w-sm mx-auto">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 rounded-full grid place-content-center font-bold">
                  <img src="/nomad-logo.png" alt="Nomad logo" />
                </div>
              </div>
              <Outlet />
            </div>
          </section>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-3 py-5 text-[0.7rem] text-slate-500">
        <div className="mx-auto max-w-[25%] text-center">
          © <span aria-hidden="true">2025</span> NOMAD. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
